import React from 'react'
import { ArrowRight } from 'lucide-react'
import { CloudShader } from './components/ui/cloud-shader'
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
  return (
    <section className="hero-section-root" aria-label="Hero Section">
      {/* Continuous Centered Container Frame with Vertical Dashed Guide Lines */}
      <div className="hero-container-frame">
        {/* Top Boundary Crosshairs (+) */}
        <span className="crosshair-marker crosshair-top-left" aria-hidden="true">+</span>
        <span className="crosshair-marker crosshair-top-right" aria-hidden="true">+</span>

        {/* ====================================================================
            LEFT COLUMN: Left-Aligned Text & Actions
            ==================================================================== */}
        <div className="hero-text-col">
          {/* Large Hero Headline (Left Aligned) */}
          <h1 className="hero-split-title">
            Your College.<br />
            One Connected Community.
          </h1>

          {/* Subtitle Description */}
          <p className="hero-split-subtitle">
            Lumina is an AI-powered campus ecosystem that unifies social networking, intelligent academic scheduling, AI-driven summarization, personalized learning, and career opportunities to redefine the college experience.
          </p>

          {/* Rectangular Action Buttons */}
          <div className="hero-split-actions">
            <button
              type="button"
              className="hero-btn-primary"
              onClick={() => (onOpenAuth ? onOpenAuth('signup') : (window.location.hash = 'signup'))}
            >
              <span>Explore Lumina</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              className="hero-btn-secondary"
              onClick={() => {
                if (onOpenDashboard) onOpenDashboard()
                else window.location.hash = 'dashboard'
              }}
            >
              Talk to an engineer
            </button>
          </div>
        </div>

        {/* ====================================================================
            RIGHT COLUMN: CloudShader Canvas (Notion Black Palette)
            ==================================================================== */}
        <div className="hero-image-col hero-cloud-col" aria-hidden="true">
          <CloudShader
            className="w-full h-full min-h-[520px]"
            cloudColor="#525252"
            skyTopColor="#121212"
            skyBottomColor="#191919"
          />

          {/* Divider Crosshair Markers at column border intersections */}
          <span className="crosshair-marker crosshair-top-divider" aria-hidden="true">+</span>
          <span className="crosshair-marker crosshair-bottom-divider" aria-hidden="true">+</span>
        </div>

        {/* Bottom Corner Crosshairs (+) */}
        <span className="crosshair-marker crosshair-bottom-left" aria-hidden="true">+</span>
        <span className="crosshair-marker crosshair-bottom-right" aria-hidden="true">+</span>
      </div>
    </section>
  )
}

export default HeroSection
