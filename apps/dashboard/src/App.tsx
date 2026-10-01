import { useState, useEffect } from 'react'
import ReactLenis from 'lenis/react'
import { HeroSection } from './HeroSection'
import { ProblemSection } from './ProblemSection'
import { Skiper28 } from './Skiper28'
import { ProcessSection } from './ProcessSection'
import { GlobeSection } from './GlobeSection'
import { CtaSection } from './CtaSection'
import { Footer } from './Footer'
import { AuthPage } from './AuthPage'

function App() {
  const [authView, setAuthView] = useState<'login' | 'signup' | null>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash
      if (hash === '#login') return 'login'
      if (hash === '#signup') return 'signup'
    }
    return null
  })

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === '#login') setAuthView('login')
      else if (hash === '#signup') setAuthView('signup')
      else if (hash === '' || hash === '#home') setAuthView(null)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    window.location.hash = mode
    setAuthView(mode)
  }

  const handleBack = () => {
    window.location.hash = ''
    setAuthView(null)
  }

  if (authView) {
    return <AuthPage initialMode={authView} onBack={handleBack} />
  }

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <div className="app-main-wrapper">
        <HeroSection onOpenAuth={handleOpenAuth} />
        <ProblemSection />
        <Skiper28 />
        <ProcessSection />
        <GlobeSection />
        <CtaSection onOpenAuth={handleOpenAuth} />
        <Footer />
      </div>
    </ReactLenis>
  )
}

export default App
