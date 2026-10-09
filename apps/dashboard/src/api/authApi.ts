export function getAuthBaseUrl(): string {
  if (typeof window !== 'undefined') {
    const env = (import.meta as any).env
    if (env?.VITE_API_URL) return env.VITE_API_URL.replace(/\/$/, '')
    if (env?.VITE_AUTH_SERVER_URL) return env.VITE_AUTH_SERVER_URL.replace(/\/$/, '')
  }
  return 'http://localhost:3002'
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


