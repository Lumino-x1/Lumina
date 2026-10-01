import React, { useState } from 'react'
import './CtaSection.css'

export interface CtaSectionProps {
  onOpenAuth?: (mode: 'login' | 'signup') => void
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenAuth }) => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <section className="cta-section" aria-label="Get Started & Newsletter">
      <div className="cta-container">
        {/* Top Architectural Grid with Lumina Logo */}
        <div className="cta-grid-header">
          <div className="cta-grid-matrix" aria-label="Lumina Logo">
            <div className="cta-grid-line-h" aria-hidden="true" />
            <div className="cta-grid-line-h bottom" aria-hidden="true" />
            <div className="cta-grid-line-v left" aria-hidden="true" />
            <div className="cta-grid-line-v right" aria-hidden="true" />
            <svg
              className="cta-lumina-logo"
              viewBox="0 0 88 64"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.2 38.6L20.8 13.2L27.6 17.1L13 42.5L6.2 38.6Z" />
              <path d="M18.4 47.8L37.2 9.4L44.4 13.6L25.6 52L18.4 47.8Z" />
              <path d="M32.8 54.4L54.6 5.8L62 10.2L40.2 58.8L32.8 54.4Z" />
              <path d="M48.2 59.6L69.8 11.4L77 15.6L55.4 63.8L48.2 59.6Z" />
            </svg>
          </div>
        </div>

        {/* Main CTA Heading & Copy */}
        <div className="cta-body">
          <h2 className="cta-title">Get started with Lumina</h2>
          <p className="cta-subtitle">
            Lumina is the trusted platform for college communities: connect, collaborate,
            and discover opportunities through one verified campus identity.
          </p>

          <div className="cta-action-row">
            <a
              href="#signup"
              className="btn-cta-blue"
              onClick={(e) => {
                if (onOpenAuth) {
                  e.preventDefault()
                  onOpenAuth('signup')
                }
              }}
            >
              Get started
            </a>
            <a href="#demo" className="btn-cta-white">
              Book a demo
            </a>
          </div>
        </div>

        {/* Bottom Newsletter Card */}
        <div className="newsletter-card">
          {/* Architectural hatched background accents & crosshairs */}
          <div className="newsletter-hatch-pattern left" aria-hidden="true" />
          <div className="newsletter-hatch-pattern right" aria-hidden="true" />
          <div className="newsletter-crosshair top-center" aria-hidden="true">
            <span className="crosshair-dot" />
          </div>
          <div className="newsletter-crosshair bottom-center" aria-hidden="true">
            <span className="crosshair-dot" />
          </div>
          <div className="newsletter-crosshair bottom-left" aria-hidden="true">
            <span className="crosshair-dot" />
          </div>
          <div className="newsletter-crosshair top-right" aria-hidden="true">
            <span className="crosshair-dot" />
          </div>

          <div className="newsletter-content">
            <div className="newsletter-left">
              <h3 className="newsletter-heading">Subscribe to our newsletter</h3>
              <p className="newsletter-subtext">Get our content in your inbox every week.</p>
            </div>

            <div className="newsletter-right">
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <div className="newsletter-input-pill">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=""
                    aria-label="Email address"
                    className="newsletter-input"
                    required
                  />
                  <button type="submit" className="newsletter-submit-btn">
                    {submitted ? 'Subscribed' : 'Submit'}
                  </button>
                </div>
                <span className="newsletter-disclaimer">
                  Provide your email address to receive our newsletter.
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaSection
