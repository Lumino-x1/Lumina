export type AppView =
  | 'landing'
  | 'login'
  | 'signup'
  | 'verify-email'
  | 'dashboard'
  | 'editor'
  | 'profile'

export function isProtectedRoute(view: AppView): boolean {
  return view === 'dashboard' || view === 'profile' || view === 'editor'
}

export function isPublicRoute(view: AppView): boolean {
  return view === 'landing' || view === 'login' || view === 'signup' || view === 'verify-email'
}

export function parseViewFromLocation(
  hash: string = typeof window !== 'undefined' ? window.location.hash : '',
  pathname: string = typeof window !== 'undefined' ? window.location.pathname : '/'
): AppView {
  const cleanHash = hash.trim()
  const cleanPath = pathname.trim()

  if (cleanHash === '#verify-email' || cleanPath === '/verify-email') return 'verify-email'
  if (
    cleanHash === '#dashboard' ||
    cleanHash === '#feed' ||
    cleanHash === '#/feed' ||
    cleanHash.startsWith('#post') ||
    cleanHash.startsWith('#story') ||
    cleanPath === '/dashboard' ||
    cleanPath === '/feed' ||
    cleanPath.startsWith('/post') ||
    cleanPath === '/api/feed'
  ) {
    return 'dashboard'
  }
  if (cleanHash === '#editor' || cleanHash === '#write' || cleanPath === '/editor') return 'editor'
  if (cleanHash === '#profile' || cleanHash === '#/profile' || cleanPath === '/profile') return 'profile'
  if (cleanHash === '#login' || cleanPath === '/login') return 'login'
  if (cleanHash === '#signup' || cleanPath === '/signup') return 'signup'

  return 'landing'
}

export interface RouteAccessCheckInput {
  view: AppView
  isLoading: boolean
  isAuthenticated: boolean
  isEmailVerified: boolean
}

export interface RouteAccessCheckResult {
  status: 'loading' | 'allowed' | 'redirect'
  redirectTo?: 'login' | 'verify-email' | 'feed'
}

/**
 * Pure authorization determination rule engine.
 * Decides whether a view may mount, must wait for session resolution, or must redirect.
 */
export function determineRouteAccess(input: RouteAccessCheckInput): RouteAccessCheckResult {
  const { view, isLoading, isAuthenticated, isEmailVerified } = input

  // 1. Session is still loading
  if (isLoading) {
    if (isProtectedRoute(view)) {
      return { status: 'loading' }
    }
    // Public pages can render even while session loads
    return { status: 'allowed' }
  }

  // 2. Protected Routes (Dashboard / Feed, Profile, Editor)
  if (isProtectedRoute(view)) {
    if (!isAuthenticated) {
      return { status: 'redirect', redirectTo: 'login' }
    }
    if (!isEmailVerified) {
      return { status: 'redirect', redirectTo: 'verify-email' }
    }
    return { status: 'allowed' }
  }

  // 3. Email Verification Route
  if (view === 'verify-email') {
    if (isAuthenticated && isEmailVerified) {
      return { status: 'redirect', redirectTo: 'feed' }
    }
    return { status: 'allowed' }
  }

  // 4. Login / Registration Route
  if (view === 'login' || view === 'signup') {
    if (isAuthenticated && isEmailVerified) {
      return { status: 'redirect', redirectTo: 'feed' }
    }
    return { status: 'allowed' }
  }

  // 5. Default Public Landing Page
  return { status: 'allowed' }
}
