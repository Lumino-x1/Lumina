import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import request from 'supertest'
import { createTestApp } from '../helpers/app'
import {
  createTestUserWithSession,
  signUpWithEmail,
  verifyOtp,
  getCapturedEmails,
  installResendFetchMock,
  clearCapturedEmails,
} from '../helpers/auth'
import { generateRandomUser } from '../helpers/factories'
import {
  parseViewFromLocation,
  isProtectedRoute,
  isPublicRoute,
  determineRouteAccess,
} from '../../../apps/dashboard/src/lib/routeGuards'

describe('Auth | Centralized Authentication & Authorization Guard', () => {
  const app = createTestApp()

  beforeAll(() => {
    installResendFetchMock()
    clearCapturedEmails()
    expect(app).toBeDefined()
  })

  beforeEach(() => {
    clearCapturedEmails()
  })

  // TEST 1: Open #feed without a session -> Dashboard UI is blocked, redirected to login
  it('TEST 1: Block unauthenticated access to #feed and redirect to login', () => {
    const view = parseViewFromLocation('#feed', '/feed')
    expect(view).toBe('dashboard')
    expect(isProtectedRoute(view)).toBe(true)

    const access = determineRouteAccess({
      view,
      isLoading: false,
      isAuthenticated: false,
      isEmailVerified: false,
    })

    expect(access.status).toBe('redirect')
    expect(access.redirectTo).toBe('login')
  })

  // TEST 2: Open #feed with an authenticated but unverified account -> Blocked, redirected to verify-email
  it('TEST 2: Block authenticated but unverified users from #feed and redirect to verify-email', () => {
    const view = parseViewFromLocation('#feed', '/feed')

    const access = determineRouteAccess({
      view,
      isLoading: false,
      isAuthenticated: true,
      isEmailVerified: false,
    })

    expect(access.status).toBe('redirect')
    expect(access.redirectTo).toBe('verify-email')
  })

  // TEST 3: Open #feed with a verified authenticated account -> Allowed access
  it('TEST 3: Allow authenticated and email-verified users to access #feed', () => {
    const view = parseViewFromLocation('#feed', '/feed')

    const access = determineRouteAccess({
      view,
      isLoading: false,
      isAuthenticated: true,
      isEmailVerified: true,
    })

    expect(access.status).toBe('allowed')
    expect(access.redirectTo).toBeUndefined()
  })

  // TEST 4: Refresh browser on #feed without authentication -> Remains inaccessible throughout
  it('TEST 4: Browser refresh on #feed without session starts in loading state and fails closed to login', () => {
    const view = parseViewFromLocation('#feed', '/feed')

    // Initial state on reload: session check in flight
    const loadingAccess = determineRouteAccess({
      view,
      isLoading: true,
      isAuthenticated: false,
      isEmailVerified: false,
    })
    expect(loadingAccess.status).toBe('loading')

    // Resolves with no session: redirected to login, dashboard never allowed
    const resolvedAccess = determineRouteAccess({
      view,
      isLoading: false,
      isAuthenticated: false,
      isEmailVerified: false,
    })
    expect(resolvedAccess.status).toBe('redirect')
    expect(resolvedAccess.redirectTo).toBe('login')
  })

  // TEST 5: Paste #feed directly into address bar -> Executes identical authorization checks
  it('TEST 5: Directly pasting protected URLs (#feed, #/feed, #profile, #editor) enforces guards', () => {
    const testCases = [
      { hash: '#feed', expectedView: 'dashboard' },
      { hash: '#/feed', expectedView: 'dashboard' },
      { hash: '#dashboard', expectedView: 'dashboard' },
      { hash: '#profile', expectedView: 'profile' },
      { hash: '#/profile', expectedView: 'profile' },
      { hash: '#editor', expectedView: 'editor' },
      { hash: '#write', expectedView: 'editor' },
    ]

    for (const { hash, expectedView } of testCases) {
      const view = parseViewFromLocation(hash)
      expect(view).toBe(expectedView)
      expect(isProtectedRoute(view)).toBe(true)

      // Unauthenticated access must redirect to login
      const unauthAccess = determineRouteAccess({
        view,
        isLoading: false,
        isAuthenticated: false,
        isEmailVerified: false,
      })
      expect(unauthAccess.status).toBe('redirect')
      expect(unauthAccess.redirectTo).toBe('login')

      // Unverified access must redirect to verify-email
      const unverifiedAccess = determineRouteAccess({
        view,
        isLoading: false,
        isAuthenticated: true,
        isEmailVerified: false,
      })
      expect(unverifiedAccess.status).toBe('redirect')
      expect(unverifiedAccess.redirectTo).toBe('verify-email')
    }
  })

  // TEST 6: Attempt to call a protected API directly without a session -> HTTP 401
  it('TEST 6: Protected backend APIs reject unauthenticated requests with HTTP 401 UNAUTHORIZED', async () => {
    const feedRes = await request(app)
      .get('/api/feed')
      .set('Origin', process.env.CORS_ORIGIN || 'http://localhost:5173')

    expect(feedRes.status).toBe(401)
    expect(feedRes.body.code).toBe('UNAUTHORIZED')

    const profileRes = await request(app)
      .get('/api/profile/me')
      .set('Origin', process.env.CORS_ORIGIN || 'http://localhost:5173')

    expect(profileRes.status).toBe(401)
    expect(profileRes.body.code).toBe('UNAUTHORIZED')

    const postsRes = await request(app)
      .get('/api/posts/saved')
      .set('Origin', process.env.CORS_ORIGIN || 'http://localhost:5173')

    expect(postsRes.status).toBe(401)
    expect(postsRes.body.code).toBe('UNAUTHORIZED')
  })

  // TEST 7: Call a protected API with an authenticated but unverified session -> HTTP 403 EMAIL_NOT_VERIFIED
  it('TEST 7: Protected backend APIs reject unverified accounts with HTTP 403 EMAIL_NOT_VERIFIED', async () => {
    const { user } = await createTestUserWithSession({
      email: `unverified.guard.${Date.now()}@college.edu`,
      emailVerified: false,
    })

    const feedRes = await request(app)
      .get('/api/feed')
      .set('Origin', process.env.CORS_ORIGIN || 'http://localhost:5173')
      .set('x-test-user-id', user.id)

    expect(feedRes.status).toBe(403)
    expect(feedRes.body.code).toBe('EMAIL_NOT_VERIFIED')

    const profileRes = await request(app)
      .get('/api/profile/me')
      .set('Origin', process.env.CORS_ORIGIN || 'http://localhost:5173')
      .set('x-test-user-id', user.id)

    expect(profileRes.status).toBe(403)
    expect(profileRes.body.code).toBe('EMAIL_NOT_VERIFIED')
  })

  // TEST 8: Verify email successfully and access #feed -> Session refreshed, access allowed
  it('TEST 8: Successful email OTP verification updates authoritative status and allows access', async () => {
    const rawUser = generateRandomUser({
      name: 'Ananya Deshmukh',
      email: `ananya.${Date.now()}@college.edu`,
    })

    // Sign up
    await signUpWithEmail(app, rawUser)
    const emails = getCapturedEmails()
    const lastEmail = emails[emails.length - 1]
    const emailBody = typeof lastEmail?.body === 'string' ? JSON.parse(lastEmail.body) : lastEmail?.body
    const otp = emailBody.text.match(/\b\d{6}\b/)[0]

    // Verify OTP
    const verifyRes = await verifyOtp(app, {
      email: rawUser.email,
      otp,
    })
    expect(verifyRes.status).toBe(200)
    expect(verifyRes.body.user.emailVerified).toBe(true)

    // Now route guard confirms full access to #feed
    const access = determineRouteAccess({
      view: 'dashboard',
      isLoading: false,
      isAuthenticated: true,
      isEmailVerified: verifyRes.body.user.emailVerified,
    })
    expect(access.status).toBe('allowed')
    expect(access.redirectTo).toBeUndefined()
  })

  // TEST 9: Log out while dashboard is open -> Protected UI becomes inaccessible
  it('TEST 9: Logout immediately blocks protected route access and resets to login', () => {
    // Before logout: allowed
    const activeAccess = determineRouteAccess({
      view: 'dashboard',
      isLoading: false,
      isAuthenticated: true,
      isEmailVerified: true,
    })
    expect(activeAccess.status).toBe('allowed')

    // After logout: session cleared
    const postLogoutAccess = determineRouteAccess({
      view: 'dashboard',
      isLoading: false,
      isAuthenticated: false,
      isEmailVerified: false,
    })
    expect(postLogoutAccess.status).toBe('redirect')
    expect(postLogoutAccess.redirectTo).toBe('login')
  })

  // TEST 10: Simulate session loading delay -> Protected content never rendered during loading
  it('TEST 10: During session loading delay, protected routes return loading state and never allow child UI', () => {
    const protectedViews: ('dashboard' | 'profile' | 'editor')[] = ['dashboard', 'profile', 'editor']

    for (const view of protectedViews) {
      const access = determineRouteAccess({
        view,
        isLoading: true,
        isAuthenticated: false,
        isEmailVerified: false,
      })

      expect(access.status).toBe('loading')
      expect(access.status).not.toBe('allowed')
    }
  })

  // TEST 11: Navigate to public pages while logged out -> Allowed access
  it('TEST 11: Public pages (landing, login, signup, verify-email) remain accessible when logged out', () => {
    const publicTestCases = [
      { hash: '', expectedView: 'landing' },
      { hash: '#home', expectedView: 'landing' },
      { hash: '#login', expectedView: 'login' },
      { hash: '#signup', expectedView: 'signup' },
      { hash: '#verify-email', expectedView: 'verify-email' },
    ]

    for (const { hash, expectedView } of publicTestCases) {
      const view = parseViewFromLocation(hash)
      expect(view).toBe(expectedView)
      expect(isPublicRoute(view)).toBe(true)

      const access = determineRouteAccess({
        view,
        isLoading: false,
        isAuthenticated: false,
        isEmailVerified: false,
      })

      expect(access.status).toBe('allowed')
    }
  })

  // TEST 12: Authenticated verified users can access all protected APIs
  it('TEST 12: Verified users can successfully access all protected backend APIs', async () => {
    const { createCollege } = await import('../helpers/factories')
    const college = await createCollege({ name: 'Lumina Tech Institute' })

    const { user } = await createTestUserWithSession({
      collegeId: college.id,
      email: `verified.guard.${Date.now()}@college.edu`,
      emailVerified: true,
    })

    const profileRes = await request(app)
      .get('/api/profile/me')
      .set('Origin', process.env.CORS_ORIGIN || 'http://localhost:5173')
      .set('x-test-user-id', user.id)

    expect(profileRes.status).toBe(200)

    const feedRes = await request(app)
      .get('/api/feed')
      .set('Origin', process.env.CORS_ORIGIN || 'http://localhost:5173')
      .set('x-test-user-id', user.id)

    expect(feedRes.status).toBe(200)
  })
})
