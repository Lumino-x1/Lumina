import React, { useState, useEffect } from 'react'
import './ProblemSection.css'

interface ColorTheme {
  name: string
  primary: string
  secondary: string
  accent: string
  glow: string
  gradient: string
}

const RULER_THEMES: ColorTheme[] = [
  {
    name: 'cyan-purple',
    primary: '#00f2fe',
    secondary: '#4facfe',
    accent: '#8a2be2',
    glow: 'rgba(0, 242, 254, 0.75)',
    gradient: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 40%, #8a2be2 100%)',
  },
  {
    name: 'neon-lime',
    primary: '#a3e635',
    secondary: '#10b981',
    accent: '#06b6d4',
    glow: 'rgba(163, 230, 53, 0.75)',
    gradient: 'linear-gradient(135deg, #a3e635 0%, #10b981 40%, #06b6d4 100%)',
  },
  {
    name: 'magenta-rose',
    primary: '#f43f5e',
    secondary: '#ec4899',
    accent: '#a855f7',
    glow: 'rgba(244, 63, 94, 0.75)',
    gradient: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 40%, #a855f7 100%)',
  },
  {
    name: 'solar-amber',
    primary: '#fbbf24',
    secondary: '#f97316',
    accent: '#ef4444',
    glow: 'rgba(251, 191, 36, 0.75)',
    gradient: 'linear-gradient(135deg, #fbbf24 0%, #f97316 40%, #ef4444 100%)',
  },
  {
    name: 'sapphire-blue',
    primary: '#38bdf8',
    secondary: '#3b82f6',
    accent: '#6366f1',
    glow: 'rgba(56, 189, 248, 0.75)',
    gradient: 'linear-gradient(135deg, #38bdf8 0%, #3b82f6 40%, #6366f1 100%)',
  },
]

export const ProblemSection: React.FC = () => {
  const [themeIdx, setThemeIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setThemeIdx((prev) => (prev + 1) % RULER_THEMES.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const currentTheme = RULER_THEMES[themeIdx]

  return (
    <section className="problem-section" id="problem">

      {/* Grid Ruler Strip with 3s Cosmic Color Beam Animation */}
      <div
        className="grid-ruler-strip"
        style={
          {
            '--beam-primary': currentTheme.primary,
            '--beam-secondary': currentTheme.secondary,
            '--beam-accent': currentTheme.accent,
            '--beam-glow': currentTheme.glow,
            '--beam-gradient': currentTheme.gradient,
          } as React.CSSProperties
        }
        aria-hidden="true"
      >
        {/* Animated Moving Light Cluster & Sweep */}
        <div className="ruler-light-cluster" />
        <div className="ruler-glow-spotlight" />

        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="ruler-cell" />
        ))}
      </div>

      <div className="problem-container">
        {/* Section Header Meta Bar: [01] removed, Problem label on right */}
        <div className="problem-meta-bar">
          <span className="problem-label">Problem</span>
        </div>

        {/* Heading Row with Icon Badge and Tagline */}
        <div className="problem-heading-row">
          <div className="problem-heading-left">
            {/* Clean White Icon */}
            <div className="problem-icon-wrapper" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4771 12 22C12 16.4771 16.4771 12 22 12C16.4771 12 12 7.52285 12 2Z" />
              </svg>
            </div>

            <h2 className="problem-title">
              Campus life wasn’t built for<br />
              one connected community
            </h2>
          </div>

          <div className="problem-heading-right">
            <p className="problem-year-tag">
              A lot has changed in <strong>2026</strong>.
            </p>
          </div>
        </div>

        {/* 3-Column Problem Cards Deck */}
        <div className="problem-cards-deck">
          {/* Card 1 */}
          <div className="problem-card">
            <div className="problem-card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="7" cy="17" r="3" />
                <circle cx="17" cy="7" r="3" />
                <line x1="9.1" y1="14.9" x2="14.9" y2="9.1" />
                <line x1="14" y1="7" x2="19" y2="7" />
                <line x1="17" y1="4" x2="17" y2="9" />
              </svg>
            </div>
            <div className="problem-card-content">
              <h3 className="problem-card-title">Too many platforms</h3>
              <p className="problem-card-desc">
                Students jump between messaging apps, group chats, college portals, spreadsheets, and separate career platforms just to manage everyday campus life.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="problem-card">
            <div className="problem-card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
            </div>
            <div className="problem-card-content">
              <h3 className="problem-card-title">Hard to stay connected</h3>
              <p className="problem-card-desc">
                Important club updates, campus events, study groups, research opportunities, and announcements are scattered across disconnected channels.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="problem-card">
            <div className="problem-card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="7" x2="17" y2="17" />
                <polyline points="17 7 17 17 7 17" />
              </svg>
            </div>
            <div className="problem-card-content">
              <h3 className="problem-card-title">Trust is fragmented</h3>
              <p className="problem-card-desc">
                Verified student identity, privacy, moderation, and organizational access are fragmented, making it difficult to foster a trusted college ecosystem.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Dotted Matrix Grid Strip */}
      <div className="grid-dotted-strip" aria-hidden="true" />
    </section>
  )
}

export default ProblemSection
