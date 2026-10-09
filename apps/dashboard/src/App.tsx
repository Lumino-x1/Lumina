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
import { signOutApi } from './api/authApi'
import { fetchMyProfile, buildMergedUser } from './api/profileApi'

function App() {
  const [currentUser, setCurrentUser] = useState<DashboardUser | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('lumina_user')
        if (stored) return JSON.parse(stored)
      } catch {
        // ignore storage parse error
      }
    }
    return null
  })

  const [view, setView] = useState<'landing' | 'login' | 'signup' | 'dashboard' | 'editor' | 'profile'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash
      const path = window.location.pathname
      if (
        hash === '#dashboard' ||
        hash === '#feed' ||
        hash === '#/feed' ||
        path === '/dashboard' ||
        path === '/feed' ||
        path === '/api/feed'
      ) return 'dashboard'
      if (hash === '#editor' || hash === '#write' || path === '/editor') return 'editor'
      if (hash === '#profile' || hash === '#/profile' || path === '/profile') return 'profile'
      if (hash === '#login' || path === '/login') return 'login'
      if (hash === '#signup' || path === '/signup') return 'signup'
    }
    return 'landing'
  })

  // Synchronize with backend profile on mount/login/dashboard navigation
  useEffect(() => {
    let isMounted = true
    async function syncProfile() {
      try {
        const profile = await fetchMyProfile()
        if (profile && isMounted) {
          setCurrentUser((prev) => {
            const merged = buildMergedUser(prev, profile)
            try {
              localStorage.setItem('lumina_user', JSON.stringify(merged))
            } catch {
              // ignore
            }
            return merged
          })
        }
      } catch {
        // ignore network error
      }
    }

    if (view === 'dashboard' || view === 'profile' || currentUser?.id || localStorage.getItem('lumina_session_token')) {
      void syncProfile()
    }

    return () => {
      isMounted = false
    }
  }, [view, currentUser?.id])

  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash
      const path = window.location.pathname
      if (
        hash === '#dashboard' ||
        hash === '#feed' ||
        hash === '#/feed' ||
        path === '/dashboard' ||
        path === '/feed' ||
        path === '/api/feed'
      ) {
        setView('dashboard')
      } else if (hash === '#editor' || hash === '#write' || path === '/editor') {
        setView('editor')
      } else if (hash === '#profile' || hash === '#/profile' || path === '/profile') {
        setView('profile')
      } else if (hash === '#login' || path === '/login') {
        setView('login')
      } else if (hash === '#signup' || path === '/signup') {
        setView('signup')
      } else if (hash === '' || hash === '#home' || path === '/') {
        setView('landing')
      }
    }

    window.addEventListener('hashchange', handleLocationChange)
    window.addEventListener('popstate', handleLocationChange)
    return () => {
      window.removeEventListener('hashchange', handleLocationChange)
      window.removeEventListener('popstate', handleLocationChange)
    }
  }, [])

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

  const handleAuthSuccess = (user: DashboardUser) => {
    setCurrentUser(user)
    window.location.hash = 'feed'
    setView('dashboard')
  }

  const handleLogout = () => {
    void signOutApi()
    try {
      localStorage.removeItem('lumina_user')
      localStorage.removeItem('lumina_session_token')
    } catch {
      // ignore
    }
    setCurrentUser(null)
    window.location.hash = ''
    setView('landing')
  }

  // Profile Page View
  if (view === 'profile') {
    return (
      <ProfilePage
        user={currentUser}
        onBackToDashboard={handleOpenDashboard}
        onNavigateHome={handleBackToLanding}
      />
    )
  }

  // Visual Content Editor View
  if (view === 'editor') {
    return (
      <EditorShell
        onBackToDashboard={handleBackToDashboard}
        user={currentUser}
      />
    )
  }

  // Dashboard View
  if (view === 'dashboard') {
    return (
      <DashboardPage
        user={currentUser}
        onLogout={handleLogout}
        onNavigateHome={handleBackToLanding}
        onOpenWrite={handleOpenEditor}
        onOpenProfile={handleOpenProfile}
      />
    )
  }

  // Auth View (Login / Signup)
  if (view === 'login' || view === 'signup') {
    return (
      <AuthPage
        initialMode={view}
        onBack={handleBackToLanding}
        onSuccess={handleAuthSuccess}
      />
    )
  }

  // Landing Page View
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

export default App
