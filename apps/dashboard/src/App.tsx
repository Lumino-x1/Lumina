import { useState, useEffect } from 'react'
import ReactLenis from 'lenis/react'
import { Navbar } from './Navbar'
import { HeroSection } from './HeroSection'
import { TrustAndQuoteSection } from './TrustAndQuoteSection'
import { WhyUsSection } from './WhyUsSection'
import { CommandCodeSection } from './CommandCodeSection'
import { CommunityAndFaqSection } from './CommunityAndFaqSection'
import { SaasCnFooterSection } from './SaasCnFooterSection'
import { AuthPage } from './AuthPage'
import { DashboardPage, type DashboardUser } from './DashboardPage'
import { ProfilePage } from './ProfilePage'
import { EditorShell } from './editor/components/EditorShell'
import { VerifyEmailPage } from './VerifyEmailPage'
import { AuthProvider, useAuth } from './lib/authContext'
import { ProtectedRoute } from './components/ProtectedRoute'

import {
  type AppView,
  parseViewFromLocation,
} from './lib/routeGuards'

function AppContent() {
  const {
    user: currentUser,
    isLoading,
    isAuthenticated,
    isEmailVerified,
    logout,
    setUser,
    refreshSession,
  } = useAuth()

  const [view, setView] = useState<AppView>(parseViewFromLocation)

  // Listen to hash and popstate navigation changes
  useEffect(() => {
    const handleLocationChange = () => {
      const nextView = parseViewFromLocation()
      setView(nextView)
    }

    window.addEventListener('hashchange', handleLocationChange)
    window.addEventListener('popstate', handleLocationChange)
    return () => {
      window.removeEventListener('hashchange', handleLocationChange)
      window.removeEventListener('popstate', handleLocationChange)
    }
  }, [])

  // If already logged in and verified, redirect away from login/signup/verify-email to dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated && isEmailVerified) {
      if (view === 'login' || view === 'signup' || view === 'verify-email') {
        window.location.hash = 'feed'
        setView('dashboard')
      }
    }
  }, [isLoading, isAuthenticated, isEmailVerified, view])

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    window.location.hash = mode
    setView(mode)
  }

  const handleBackToLanding = () => {
    window.location.hash = ''
    setView('landing')
  }

  const handleOpenDashboard = () => {
    window.location.hash = 'feed'
    setView('dashboard')
  }

  const handleOpenProfile = () => {
    window.location.hash = 'profile'
    setView('profile')
  }

  const handleOpenEditor = () => {
    window.location.hash = 'editor'
    setView('editor')
  }

  const handleBackToDashboard = () => {
    window.location.hash = 'feed'
    setView('dashboard')
  }

  const handleAuthSuccess = async (user: DashboardUser) => {
    setUser(user)
    await refreshSession(true)
    if (user.emailVerified === false) {
      window.location.hash = 'verify-email'
      setView('verify-email')
    } else {
      let redirectTarget: string | null = null
      try {
        redirectTarget = sessionStorage.getItem('lumina_redirect_after_login')
        sessionStorage.removeItem('lumina_redirect_after_login')
      } catch {
        // ignore
      }

      if (redirectTarget) {
        window.location.hash = redirectTarget.replace(/^#/, '')
      } else {
        window.location.hash = 'feed'
      }
      setView('dashboard')
    }
  }

  const handleLogout = async () => {
    await logout()
    window.location.hash = ''
    setView('landing')
  }

  // 1. Email Verification View
  if (view === 'verify-email') {
    return (
      <VerifyEmailPage
        initialEmail={currentUser?.email}
        onSuccess={async (verifiedUser) => {
          setUser(verifiedUser)

          let redirectTarget: string | null = null
          try {
            redirectTarget = sessionStorage.getItem('lumina_redirect_after_login')
            sessionStorage.removeItem('lumina_redirect_after_login')
          } catch {
            // ignore
          }

          if (redirectTarget) {
            window.location.hash = redirectTarget.replace(/^#/, '')
          } else {
            window.location.hash = 'feed'
          }
          setView('dashboard')
        }}
        onBackToLogin={() => {
          window.location.hash = 'login'
          setView('login')
        }}
        onBackToRegister={() => {
          window.location.hash = 'signup'
          setView('signup')
        }}
      />
    )
  }

  // 2. Auth View (Login / Signup)
  if (view === 'login' || view === 'signup') {
    return (
      <AuthPage
        initialMode={view}
        onBack={handleBackToLanding}
        onSuccess={handleAuthSuccess}
        onRequireVerification={() => {
          window.location.hash = 'verify-email'
          setView('verify-email')
        }}
      />
    )
  }

  // 3. Protected Views (Dashboard/Feed, Profile, Visual Editor)
  // Guaranteed by ProtectedRoute: will NOT mount or render any layout/components
  // unless the session check passes and emailVerified is true.
  if (view === 'dashboard' || view === 'profile' || view === 'editor') {
    return (
      <ProtectedRoute
        onRedirect={(target) => {
          window.location.hash = target
          setView(target)
        }}
      >
        {view === 'dashboard' && (
          <DashboardPage
            user={currentUser}
            onLogout={handleLogout}
            onNavigateHome={handleBackToLanding}
            onOpenWrite={handleOpenEditor}
            onOpenProfile={handleOpenProfile}
          />
        )}
        {view === 'profile' && (
          <ProfilePage
            user={currentUser}
            onBackToDashboard={handleOpenDashboard}
            onNavigateHome={handleBackToLanding}
            onLogout={handleLogout}
          />
        )}
        {view === 'editor' && (
          <EditorShell
            onBackToDashboard={handleBackToDashboard}
            user={currentUser}
          />
        )}
      </ProtectedRoute>
    )
  }

  // 4. Landing Page View (Default public route)
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <div className="app-main-wrapper">
        <Navbar
          user={currentUser}
          onOpenAuth={handleOpenAuth}
          onOpenDashboard={handleOpenDashboard}
        />
        <HeroSection
          user={currentUser}
          onOpenAuth={handleOpenAuth}
          onOpenDashboard={handleOpenDashboard}
        />
        <TrustAndQuoteSection />
        <WhyUsSection />
        <CommandCodeSection />
        <CommunityAndFaqSection />
        <SaasCnFooterSection onOpenAuth={handleOpenAuth} />
      </div>
    </ReactLenis>
  )
}

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
