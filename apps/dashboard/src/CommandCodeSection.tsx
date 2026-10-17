import React from 'react'
import { UsersRound, BrainCircuit, Rocket } from 'lucide-react'
import { Testimonial } from './components/Testimonial'
import './CommandCodeSection.css'

export const CommandCodeSection: React.FC = () => {
  return (
    <section className="command-section" aria-label="Command Code Overview">
      {/* Continuous Centered Container Frame with Vertical Dashed Guide Lines */}
      <div className="command-container-frame">
        {/* Corner Crosshairs at the top of this section */}
        <span className="crosshair-marker crosshair-top-left" aria-hidden="true">+</span>
        <span className="crosshair-marker crosshair-top-right" aria-hidden="true">+</span>

        {/* ====================================================================
            1. TOP ROW: The Lumina Difference Section
            ==================================================================== */}
        <div className="command-testimonial-row">
          <Testimonial />
        </div>

        {/* ====================================================================
            2. MIDDLE ROW: Platform Description vs Action Buttons (50/50 split)
            ==================================================================== */}
        <div className="command-middle-row">
          <div className="command-desc-col">
            <p className="command-desc-text">
              Lumina brings the campus experience to life through meaningful connections, smarter learning, and limitless possibilities—empowering students to discover, grow, and shape their future in one connected space.
            </p>
          </div>
          <div className="command-actions-col">
            <button
              type="button"
              className="command-btn-primary"
              onClick={() => {
                window.location.hash = 'signup'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3z" />
              </svg>
              <span>Getting started with Lumina</span>
            </button>
            <a
              href="#features"
              className="command-btn-secondary"
            >
              Explore the platform
            </a>
          </div>
        </div>

        {/* ====================================================================
            3. BOTTOM ROW: Three-Column Highlights (Card 01, Card 02, Card 03)
            ==================================================================== */}
        <div className="command-stats-grid">
          {/* Card 01: [01] Connected Campus */}
          <div className="command-stat-cell">
            <div className="command-stat-header">
              <div className="command-stat-icon-box" aria-hidden="true">
                <UsersRound className="w-4 h-4" />
              </div>
              <span className="command-stat-index">[01]</span>
            </div>
            <div className="command-stat-category">CONNECTED CAMPUS</div>
            <h3 className="command-stat-headline">One connected campus</h3>
            <p className="command-stat-desc">
              Bring students, communities, and alumni together in one space to share ideas, build relationships, and discover opportunities across campus.
            </p>
          </div>

          {/* Card 02: [02] Intelligent Learning */}
          <div className="command-stat-cell">
            <div className="command-stat-header">
              <div className="command-stat-icon-box" aria-hidden="true">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <span className="command-stat-index">[02]</span>
            </div>
            <div className="command-stat-category">INTELLIGENT LEARNING</div>
            <h3 className="command-stat-headline">Learning, reimagined</h3>
            <p className="command-stat-desc">
              Turn complex academic material into clear insights with AI-powered summaries, personalized learning, and intelligent study assistance.
            </p>
          </div>

          {/* Card 03: [03] Career & Growth */}
          <div className="command-stat-cell">
            <div className="command-stat-header">
              <div className="command-stat-icon-box" aria-hidden="true">
                <Rocket className="w-4 h-4" />
              </div>
              <span className="command-stat-index">[03]</span>
            </div>
            <div className="command-stat-category">CAREER &amp; GROWTH</div>
            <h3 className="command-stat-headline">Built for what&apos;s next</h3>
            <p className="command-stat-desc">
              Discover career opportunities, learn from alumni, expand your network, and turn your campus experience into a foundation for the future.
            </p>
          </div>
        </div>

        {/* Bottom Corner Crosshairs (+) at frame border intersections */}
        <span className="crosshair-marker crosshair-bottom-left" aria-hidden="true">+</span>
        <span className="crosshair-marker crosshair-bottom-right" aria-hidden="true">+</span>
      </div>
    </section>
  )
}
