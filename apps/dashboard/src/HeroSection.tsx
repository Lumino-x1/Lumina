import React from 'react'
import SculptureHero from './components/ui/sculpture-hero'
import './HeroSection.css'

export interface HeroSectionProps {
  onOpenAuth?: (mode: 'login' | 'signup') => void
  user?: { name?: string; email?: string } | null
  onOpenDashboard?: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAuth,
  user: _user,
  onOpenDashboard,
}) => {
  const handlePrimary = () => {
    if (onOpenAuth) {
      onOpenAuth('signup')
    } else {
      window.location.hash = 'signup'
    }
  }

  const handleSecondary = () => {
    if (onOpenDashboard) {
      onOpenDashboard()
    } else {
      window.location.hash = 'dashboard'
    }
  }

  return (
    <section className="hero-section-root" aria-label="Hero Section">
      <SculptureHero
        showSculpture={false}
        theme="dark"
        background="#191919"
        darkBackground="#191919"
        textColor="#FFFFFF"
        accentColor="#FFFFFF"
        backdropText="LUMINA"
        brand="LUMINA"
        showNav={false}
        eyebrow=""
        headline={"Your College.\nOne Connected Community."}
        headlineAccent="all"
        body="Lumina is an AI-powered campus ecosystem that unifies social networking, intelligent academic scheduling, AI-driven summarization, personalized learning, and career opportunities to redefine the college experience."
        primaryCta={{
          label: 'Explore Lumina',
          onClick: handlePrimary,
        }}
        secondaryCta={{
          label: 'Talk to an engineer',
          onClick: handleSecondary,
        }}
        hint="Move across the sculpture"
        hintTouch="Touch the sculpture"
        showCredit={false}
        height="clamp(620px, calc(100svh - 64px), 940px)"
      />
    </section>
  )
}

export default HeroSection
