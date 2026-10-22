import React from 'react'
import { ArrowUpRight, User } from 'lucide-react'
import './SaasCnFooterSection.css'

export interface SaasCnFooterSectionProps {
  onOpenAuth?: (mode: 'login' | 'signup') => void
}

export const SaasCnFooterSection: React.FC<SaasCnFooterSectionProps> = ({ onOpenAuth }) => {

  const handleGetStarted = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onOpenAuth) {
      onOpenAuth('signup')
    }
  }

  const handleUserClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onOpenAuth) {
      onOpenAuth('login')
    }
  }

  return (
    <section className="saascn-footer-section" aria-label="Call to Action and Footer">
      <div className="saascn-footer-frame">
        {/* ====================================================================
            1. SECTION 5 / FINAL CTA
            ==================================================================== */}
        <div className="saascn-cta-block">
          {/* Left: Headline */}
          <div className="saascn-cta-left">
            <h2 className="saascn-cta-title">
              Your college is more than a campus.<br />It's a community.
            </h2>
          </div>

          {/* Right: Subtitle & Rectangular Action Buttons */}
          <div className="saascn-cta-right">
            <p className="saascn-cta-desc">
              Lumina brings the people, conversations, opportunities, and experiences that shape college life into one connected platform.
            </p>

            <div className="saascn-cta-actions">
              <button
                type="button"
                className="saascn-btn-primary"
                onClick={handleGetStarted}
              >
                <span>Join Lumina</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </button>

              <a
                href="#features"
                className="saascn-btn-secondary"
              >
                <span>Explore Features</span>
              </a>
            </div>
          </div>
        </div>

        {/* ====================================================================
            2. Dividing Boundary Line with Crosshairs (+)
            ==================================================================== */}
        <div className="saascn-divider-line" aria-hidden="true">
          <span className="crosshair-marker crosshair-divider-left">+</span>
          <span className="crosshair-marker crosshair-divider-right">+</span>
        </div>

        {/* ====================================================================
            3. Navigation Grid & Brand Description
            ==================================================================== */}
        <div className="saascn-links-grid">
          {/* Brand Column / Description */}
          <div className="saascn-col">
            <h3 className="saascn-col-title">Lumina</h3>
            <p className="saascn-brand-tagline">
              Your college, connected.
            </p>
          </div>

          {/* Column 1: Pages */}
          <div className="saascn-col">
            <h3 className="saascn-col-title">Pages</h3>
            <ul className="saascn-col-list">
              <li><a href="#home" className="saascn-link active">Home</a></li>
              <li><a href="#about" className="saascn-link">About</a></li>
              <li><a href="#features" className="saascn-link">Features</a></li>
              <li><a href="#communities" className="saascn-link">Communities</a></li>
              <li><a href="#careers" className="saascn-link">Careers</a></li>
              <li><a href="#contact" className="saascn-link">Contact</a></li>
            </ul>
          </div>

          {/* Column 2: Explore */}
          <div className="saascn-col">
            <h3 className="saascn-col-title">Explore</h3>
            <ul className="saascn-col-list">
              <li><a href="#clubs" className="saascn-link">Clubs</a></li>
              <li><a href="#study-groups" className="saascn-link">Study Groups</a></li>
              <li><a href="#events" className="saascn-link">Events</a></li>
              <li><a href="#internships" className="saascn-link">Internships</a></li>
              <li><a href="#mentorship" className="saascn-link">Mentorship</a></li>
              <li><a href="#alumni" className="saascn-link">Alumni</a></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="saascn-col">
            <h3 className="saascn-col-title">Resources</h3>
            <ul className="saascn-col-list">
              <li><a href="#blog" className="saascn-link">Blog</a></li>
              <li><a href="#help" className="saascn-link">Help</a></li>
              <li><a href="#privacy" className="saascn-link">Privacy</a></li>
              <li><a href="#terms" className="saascn-link">Terms</a></li>
              <li><a href="#safety" className="saascn-link">Safety</a></li>
            </ul>
          </div>

          {/* Column 4: Socials */}
          <div className="saascn-col">
            <h3 className="saascn-col-title">Socials</h3>
            <ul className="saascn-col-list">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="saascn-link saascn-social-link"
                >
                  <svg
                    className="saascn-social-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="saascn-link saascn-social-link"
                >
                  <svg
                    className="saascn-social-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ====================================================================
            4. Bottom Utility Bar
        ==================================================================== */}
        <div className="saascn-bottom-bar">
          {/* User Icon Box Button */}
          <button
            type="button"
            className="saascn-user-btn"
            onClick={handleUserClick}
            aria-label="User Account"
          >
            <User className="w-4 h-4 text-current" />
          </button>

          {/* Copyright Center Text */}
          <div className="saascn-copyright">
            © 2026 Lumina. All rights reserved.
          </div>
        </div>
      </div>
    </section>
  )
}

export default SaasCnFooterSection
