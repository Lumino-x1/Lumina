import React from 'react'
import { ArrowUpRight, Mail } from 'lucide-react'
import { GradientBackground } from './components/GradientBackground'
import './HeroSection.css'

export interface HeroSectionProps {
  onOpenAuth?: (mode: 'login' | 'signup') => void
  user?: { name?: string; email?: string } | null
  onOpenDashboard?: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAuth,
  user: _user,
  onOpenDashboard: _onOpenDashboard,
}) => {
  return (
    <section className="hero-section-root" aria-label="Hero Section">
      {/* Continuous Centered Container Frame with Vertical Dashed Guide Lines */}
      <div className="hero-container-frame">
        {/* Dynamic Gradient & Animated Grain Noise Background */}
        <GradientBackground
          gradientType="radial-gradient"
          gradientOrigin="bottom-middle"
          gradientSize="130% 130%"
          enableNoise={true}
          noisePatternAlpha={40}
          noiseIntensity={0.9}
        />

        {/* Main Hero Content */}
        <div className="hero-main-content">
          {/* Announcement Pill Badge */}
          <div className="hero-badge-wrap">
            <a href="#announcement" className="saascn-hero-badge">
              <span>Built for verified college communities</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 opacity-80" />
            </a>
          </div>

          {/* Large Hero Headline */}
          <h1 className="saascn-hero-title">
            Your College.<br />One Connected Community.
          </h1>

          {/* Subtitle Description */}
          <p className="saascn-hero-subtitle">
            Lumina brings students, faculty, alumni, communities, opportunities, and campus experiences together in one trusted platform.
          </p>

          {/* Rectangular Action Buttons */}
          <div className="saascn-hero-actions">
            <a href="#features" className="saascn-hero-btn-secondary">
              <span>Explore Lumina</span>
              <Mail className="saascn-hero-btn-icon" aria-hidden="true" />
            </a>

            <button
              type="button"
              className="saascn-hero-btn-primary"
              onClick={() => (onOpenAuth ? onOpenAuth('signup') : (window.location.hash = 'signup'))}
            >
              <span>Join Lumina</span>
              <ArrowUpRight className="saascn-hero-btn-icon" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Bottom Corner Crosshairs (+) at frame border intersections */}
        <span className="crosshair-marker crosshair-bottom-left" aria-hidden="true">+</span>
        <span className="crosshair-marker crosshair-bottom-right" aria-hidden="true">+</span>
      </div>
    </section>
  )
}

export default HeroSection
