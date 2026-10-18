import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { DashboardUser } from '../DashboardPage'
import { getSessionApi, signOutApi, HARDCODED_TEST_USER } from '../api/authApi'
import { fetchMyProfile, buildMergedUser } from '../api/profileApi'

export interface AuthContextType {
  user: DashboardUser | null
  isLoading: boolean
  isAuthenticated: boolean
  isEmailVerified: boolean
  refreshSession: (silent?: boolean) => Promise<DashboardUser | null>
  logout: () => Promise<void>
  setUser: (user: DashboardUser | null | ((prev: DashboardUser | null) => DashboardUser | null)) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<DashboardUser | null>(() => {
    try {
      if (typeof window !== 'undefined' && localStorage.getItem('lumina_hardcoded_user') === 'true') {
        const raw = localStorage.getItem('lumina_user')
        return raw ? JSON.parse(raw) : HARDCODED_TEST_USER
      }
    } catch {}
    return null
  })
  const [isLoading, setIsLoading] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined' && localStorage.getItem('lumina_hardcoded_user') === 'true') {
        return false
      }
    } catch {}
    return true
  })

  const refreshSession = useCallback(async (silent = false): Promise<DashboardUser | null> => {
    if (!silent) {
      const isHardcodedNow = typeof window !== 'undefined' && localStorage.getItem('lumina_hardcoded_user') === 'true'
      if (!isHardcodedNow) {
        setIsLoading(true)
      }
    }

    try {
      if (typeof window !== 'undefined' && localStorage.getItem('lumina_hardcoded_user') === 'true') {
        const raw = localStorage.getItem('lumina_user')
        const hardcodedUser = raw ? JSON.parse(raw) : HARDCODED_TEST_USER
        setUserState(hardcodedUser)
        setIsLoading(false)
        return hardcodedUser
      }
    } catch {
      // ignore
    }

    try {
      const session = await getSessionApi()

      if (session?.user?.id) {
        const sessionUser = session.user
        const baseUser: DashboardUser = {
          id: sessionUser.id,
          email: sessionUser.email,
          name: sessionUser.name,
          username: (sessionUser as any).username ? String((sessionUser as any).username).replace(/^@/, '') : undefined,
          image: sessionUser.image || undefined,
          emailVerified: Boolean(sessionUser.emailVerified),
          collegeId: (sessionUser as any).collegeId || undefined,
        }

        // Hydrate profile data in parallel/background without blocking basic auth state
        let fullUser = baseUser
        try {
          const profile = await fetchMyProfile()
          if (profile) {
            fullUser = buildMergedUser(baseUser, profile)
          }
        } catch {
          // ignore profile hydration failure; basic session user is valid
        }

        setUserState(fullUser)
        try {
          localStorage.setItem('lumina_user', JSON.stringify(fullUser))
        } catch {
          // ignore storage error
        }
        return fullUser
      } else {
        // No valid session: fail closed
        setUserState(null)
        try {
          localStorage.removeItem('lumina_user')
          localStorage.removeItem('lumina_session_token')
          localStorage.removeItem('better-auth.session_token')
        } catch {
          // ignore
        }
        return null
      }
    } catch (err) {
      console.warn('[AuthContext] Session retrieval failed, failing closed:', err)
      setUserState(null)
      try {
        localStorage.removeItem('lumina_user')
        localStorage.removeItem('lumina_session_token')
        localStorage.removeItem('better-auth.session_token')
      } catch {
        // ignore
      }
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async (): Promise<void> => {
    try {
      await signOutApi()
    } catch (err) {
      console.warn('[AuthContext] Error during signOutApi:', err)
    } finally {
      setUserState(null)
      try {
        localStorage.removeItem('lumina_hardcoded_user')
        localStorage.removeItem('lumina_user')
        localStorage.removeItem('lumina_session_token')
        localStorage.removeItem('better-auth.session_token')
      } catch {
        // ignore
      }
      window.location.hash = ''
    }
  }, [])

  const setUser = useCallback(
    (updater: DashboardUser | null | ((prev: DashboardUser | null) => DashboardUser | null)) => {
      setUserState((prev) => {
        const next = typeof updater === 'function' ? (updater as (prev: DashboardUser | null) => DashboardUser | null)(prev) : updater
        try {
          if (next) {
            localStorage.setItem('lumina_user', JSON.stringify(next))
          } else {
            localStorage.removeItem('lumina_user')
          }
        } catch {
          // ignore
        }
        return next
      })
    },
    []
  )

  // Synchronize session on initial application mount
  useEffect(() => {
    void refreshSession(false)
  }, [refreshSession])

  const isHardcoded = typeof window !== 'undefined' && localStorage.getItem('lumina_hardcoded_user') === 'true'
  const effectiveUser = user || (isHardcoded ? HARDCODED_TEST_USER : null)
  const isAuthenticated = Boolean(isHardcoded || (effectiveUser && effectiveUser.id))
  const isEmailVerified = Boolean(isHardcoded || (effectiveUser && effectiveUser.emailVerified === true))

  return (
    <AuthContext.Provider
      value={{
        user: effectiveUser,
        isLoading: isHardcoded ? false : isLoading,
        isAuthenticated,
        isEmailVerified,
        refreshSession,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
