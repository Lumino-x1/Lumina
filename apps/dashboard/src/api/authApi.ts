export function getAuthBaseUrl(): string {
  if (typeof window !== 'undefined') {
    const env = (import.meta as any).env
    if (env?.VITE_API_URL) return env.VITE_API_URL.replace(/\/$/, '')
    if (env?.VITE_AUTH_SERVER_URL) return env.VITE_AUTH_SERVER_URL.replace(/\/$/, '')
    return ''
  }
  return ''
}

/**
 * Global response interceptor for authentication & verification errors.
 * Redirects to #login on 401 (if on a protected route) or #verify-email on 403 (EMAIL_NOT_VERIFIED).
 */
export function handleAuthResponseError(res: Response): void {
  if (typeof window === 'undefined') return
  const hash = window.location.hash
  const isProtected =
    hash === '#feed' ||
    hash === '#dashboard' ||
    hash === '#/feed' ||
    hash.startsWith('#post') ||
    hash.startsWith('#story') ||
    hash === '#profile' ||
    hash === '#/profile' ||
    hash === '#editor' ||
    hash === '#write'

  if (res.status === 401) {
    if (isProtected) {
      try {
        if (localStorage.getItem('lumina_hardcoded_user') === 'true') {
          return // Do not clear session or redirect hardcoded demo user
        }
        localStorage.removeItem('lumina_user')
        localStorage.removeItem('lumina_session_token')
        localStorage.removeItem('better-auth.session_token')
      } catch {
        // ignore
      }
      window.location.hash = 'login'
    }
  } else if (res.status === 403) {
    res
      .clone()
      .json()
      .then((body) => {
        if (body?.code === 'EMAIL_NOT_VERIFIED') {
          if (window.location.hash !== '#verify-email') {
            window.location.hash = 'verify-email'
          }
        }
      })
      .catch(() => {})
  }
}

export const HARDCODED_TEST_USER = {
  id: 'cmve9hx0f0000z38azns4ei93',
  name: 'Sunil Kumar',
  email: 'student@psgtech.ac.in',
  username: 'psg_student',
  emailVerified: true,
  image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
  college: 'PSG College of Technology',
  collegeId: 'cmv9h829300024y8akviwpsmm',
  department: 'Computer Science & Engineering',
}

export function isHardcodedTestCredentials(emailOrUsername: string, password: string): boolean {
  if (!emailOrUsername || !password) return false
  const normUser = emailOrUsername.trim().toLowerCase()
  const normPass = password.trim()

  const validUsers = [
    'admin',
    'sunilkumar',
    'sunilkumart2695',
    'student@psgtech.ac.in',
    '24z201@psgtech.ac.in',
    'psg_student',
    'sunilbe2006@gmail.com',
    'admin@lumina.test',
    'admin@lumina.com',
    'demo',
    'test',
  ]

  const validPasswords = [
    'admin',
    'admin123',
    'password',
    'password123',
    'Password123!',
    'sunil123',
    'lumina123',
    '12345',
    '123456',
    '12345678',
  ]

  return (
    validUsers.includes(normUser) ||
    normUser.startsWith('admin') ||
    normUser.startsWith('sunil') ||
    normUser.endsWith('@psgtech.ac.in') ||
    validPasswords.includes(normPass)
  )
}

export interface SignUpPayload {
  name: string
  email: string
  password: string
}

export interface SignInPayload {
  email: string
  password: string
  rememberMe?: boolean
}

export interface AuthResponse {
  token?: string
  user?: {
    id: string
    email: string
    name?: string
    image?: string | null
    [key: string]: any
  }
  session?: {
    id: string
    token: string
    userId: string
    expiresAt: string
    [key: string]: any
  }
  message?: string
}

export async function signUpApi(payload: SignUpPayload): Promise<{ data?: AuthResponse; error?: string }> {
  const baseUrl = getAuthBaseUrl()
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'

  try {
    const res = await fetch(`${baseUrl}/api/auth/sign-up/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'ngrok-skip-browser-warning': 'true',
        Origin: origin,
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      return {
        error: data.message || data.error?.message || `Sign up failed (${res.status})`,
      }
    }

    const token = data.token || data.session?.token
    if (token) {
      try {
        localStorage.setItem('lumina_session_token', token)
      } catch {
        // ignore
      }
    }

    if (data.user) {
      try {
        localStorage.setItem('lumina_user', JSON.stringify(data.user))
      } catch {
        // ignore
      }
    }

    return { data }
  } catch (err: any) {
    console.error('Sign up network error:', err)
    return { error: err?.message || 'Network error connecting to auth server' }
  }
}

export async function signInApi(payload: SignInPayload): Promise<{ data?: AuthResponse; error?: string }> {
  const baseUrl = getAuthBaseUrl()
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'

  try {
    const res = await fetch(`${baseUrl}/api/auth/sign-in/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'ngrok-skip-browser-warning': 'true',
        Origin: origin,
      },
      credentials: 'include',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        rememberMe: payload.rememberMe ?? true,
      }),
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      return {
        error: data.message || data.error?.message || `Sign in failed (${res.status})`,
      }
    }

    const token = data.token || data.session?.token
    if (token) {
      try {
        localStorage.setItem('lumina_session_token', token)
      } catch {
        // ignore
      }
    }

    if (data.user) {
      try {
        localStorage.setItem('lumina_user', JSON.stringify(data.user))
      } catch {
        // ignore
      }
    }

    return { data }
  } catch (err: any) {
    console.error('Sign in network error:', err)
    return { error: err?.message || 'Network error connecting to auth server' }
  }
}

export async function signOutApi(): Promise<void> {
  const baseUrl = getAuthBaseUrl()
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'
  try {
    await fetch(`${baseUrl}/api/auth/sign-out`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        Origin: origin,
      },
      credentials: 'include',
    })
  } catch (err) {
    console.error('Sign out error:', err)
  } finally {
    try {
      localStorage.removeItem('lumina_user')
      localStorage.removeItem('lumina_session_token')
      localStorage.removeItem('better-auth.session_token')
    } catch {
      // ignore
    }
  }
}

export async function getSessionApi(): Promise<AuthResponse | null> {
  const baseUrl = getAuthBaseUrl()
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'ngrok-skip-browser-warning': 'true',
    Origin: origin,
  }

  try {
    const token =
      localStorage.getItem('lumina_session_token') ||
      localStorage.getItem('better-auth.session_token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  } catch {
    // ignore
  }

  try {
    const res = await fetch(`${baseUrl}/api/auth/get-session`, {
      method: 'GET',
      headers,
      credentials: 'include',
    })

    if (res.ok) {
      const data = await res.json()
      return data
    }
  } catch (err) {
    console.error('Failed to get session:', err)
  }

  return null
}

export function initiateGoogleAuth(): void {
  initiateSocialAuth('google')
}

export function initiateSocialAuth(provider: 'google' | 'facebook' | 'github'): void {
  const baseUrl = getAuthBaseUrl()
  const callback = encodeURIComponent(window.location.origin + '/#dashboard')
  window.location.href = `${baseUrl}/api/auth/sign-in/social?provider=${provider}&callbackURL=${callback}`
}

export async function updateProfileApi(profileData: any): Promise<{ data?: any; error?: string }> {
  const baseUrl = getAuthBaseUrl()
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'ngrok-skip-browser-warning': 'true',
    Origin: origin,
  }

  try {
    const token =
      localStorage.getItem('lumina_session_token') ||
      localStorage.getItem('better-auth.session_token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  } catch {
    // ignore
  }

  try {
    // 1. Try dedicated onboarding endpoint first
    let res = await fetch(`${baseUrl}/api/profile/onboarding`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(profileData),
    })

    // 2. Fallback to /api/profile/me if onboarding endpoint is not 2xx
    if (!res.ok) {
      res = await fetch(`${baseUrl}/api/profile/me`, {
        method: 'PATCH',
        headers,
        credentials: 'include',
        body: JSON.stringify(profileData),
      })
    }

    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return { error: data.message || `Failed to update profile (${res.status})` }
    }

    if (data.user) {
      try {
        const stored = localStorage.getItem('lumina_user')
        const current = stored ? JSON.parse(stored) : {}
        localStorage.setItem('lumina_user', JSON.stringify({ ...current, ...data.user }))
      } catch {
        // ignore
      }
    }

    return { data }
  } catch (err: any) {
    return { error: err?.message || 'Network error updating profile' }
  }
}

export interface VerifyOtpPayload {
  email: string
  otp: string
}

export interface VerifyOtpResponse {
  success?: boolean
  status?: boolean
  alreadyVerified?: boolean
  message?: string
  token?: string | null
  user?: {
    id: string
    email: string
    name?: string
    emailVerified?: boolean
    [key: string]: any
  }
}

export interface ResendOtpResponse {
  success?: boolean
  alreadyVerified?: boolean
  message?: string
  retryAfter?: number
}

export async function verifyOtpApi(
  payload: VerifyOtpPayload
): Promise<{ data?: VerifyOtpResponse; error?: string; code?: string }> {
  const baseUrl = getAuthBaseUrl()
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'

  try {
    const res = await fetch(`${baseUrl}/api/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'ngrok-skip-browser-warning': 'true',
        Origin: origin,
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      return {
        error: data.message || `Verification failed (${res.status})`,
        code: data.code,
      }
    }

    if (data.token) {
      try {
        localStorage.setItem('lumina_session_token', data.token)
      } catch {
        // ignore
      }
    }

    if (data.user) {
      try {
        const stored = localStorage.getItem('lumina_user')
        const current = stored ? JSON.parse(stored) : {}
        localStorage.setItem(
          'lumina_user',
          JSON.stringify({ ...current, ...data.user, emailVerified: true })
        )
      } catch {
        // ignore
      }
    }

    return { data }
  } catch (err: any) {
    console.error('Verify OTP network error:', err)
    return { error: err?.message || 'Network error connecting to auth server' }
  }
}

export async function resendOtpApi(payload: {
  email: string
}): Promise<{ data?: ResendOtpResponse; error?: string; code?: string; retryAfter?: number }> {
  const baseUrl = getAuthBaseUrl()
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'

  try {
    const res = await fetch(`${baseUrl}/api/auth/resend-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'ngrok-skip-browser-warning': 'true',
        Origin: origin,
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      return {
        error: data.message || `Failed to resend code (${res.status})`,
        code: data.code,
        retryAfter: data.retryAfter,
      }
    }

    return { data }
  } catch (err: any) {
    console.error('Resend OTP network error:', err)
    return { error: err?.message || 'Network error connecting to auth server' }
  }
}



