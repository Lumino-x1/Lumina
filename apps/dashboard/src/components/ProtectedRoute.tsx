import React, { useEffect } from 'react'
import { useAuth } from '../lib/authContext'
import { AuthLoadingScreen } from './AuthLoadingScreen'

export interface ProtectedRouteProps {
  children: React.ReactNode
  onRedirect?: (target: 'login' | 'verify-email') => void
}

/**
 * Centralized Route Guard ensuring that protected pages (Feed, Dashboard, Profile, Editor)
 * are NEVER mounted or rendered unless the user has an active, authenticated Better Auth session
 * AND their authoritative emailVerified status is true.
 *
 * Prevents UI leakage, flashes of dashboard components, and premature API calls.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, onRedirect }) => {
  const { isLoading, isAuthenticated, isEmailVerified } = useAuth()

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated) {
      if (typeof window !== 'undefined' && window.location.hash) {
        try {
          sessionStorage.setItem('lumina_redirect_after_login', window.location.hash)
        } catch {
          // ignore
        }
      }
      if (onRedirect) {
        onRedirect('login')
      } else {
        window.location.hash = 'login'
      }
    } else if (!isEmailVerified) {
      if (onRedirect) {
        onRedirect('verify-email')
      } else {
        window.location.hash = 'verify-email'
      }
    }
  }, [isLoading, isAuthenticated, isEmailVerified, onRedirect])

  // A. Session is loading: render neutral loading screen, DO NOT render protected children
  if (isLoading) {
    return <AuthLoadingScreen message="Checking authorization..." />
  }

  // B. User is unauthenticated: block rendering completely
  if (!isAuthenticated) {
    return null
  }

  // C. User is authenticated but email is unverified: block rendering completely
  if (!isEmailVerified) {
    return null
  }

  // D. Fully authenticated and verified: allow child dashboard components to mount
  return <>{children}</>
}

export default ProtectedRoute
