import React, { useState, useRef, useEffect } from 'react'
import { ConstellationField, WireframeForms } from '@designcodeio/threeui'
import '@designcodeio/threeui/style.css'
import { HeroAvatarGroup } from './components/AvatarGroup'
import './HeroSection.css'

import { Navbar } from './Navbar'

export const Scene = React.memo(function Scene() {
  return (
    <div className="shader-frame">
      <ConstellationField
        variant="topo-field"
        mode="dark"
        speed={1.0}
        size={1.0}
        length={1.0}
        density={1.0}
        opacity={1.0}
        hue={0}
        saturation={1.0}
        brightness={1.0}
      />
    </div>
  )
})

export const WireframeCube = React.memo(function WireframeCube() {
  return (
    <WireframeForms
      variant="cube"
      mode="dark"
      speed={3.00}
      size={1.00}
      length={1.00}
      density={1.00}
      opacity={0.45}
      hue={0}
      saturation={1.00}
      brightness={1.00}
    />
  )
})

interface ProjectTab {
  id: string
  name: string
  url: string
  dotColor: string
  image: string
}

const PROJECTS: ProjectTab[] = [
  {
    id: 'provet',
    name: 'Provet',
    url: 'provet.com',
    dotColor: '#ff5e3a',
    image: '/projects/provet.png',
  },
  {
    id: 'oag',
    name: 'OAG',
    url: 'oag.com',
    dotColor: '#4f4f52',
    image: '/projects/provet.png',
  },
  {
    id: 'pinokio',
    name: 'Pinokio',
    url: 'pinokio.computer',
    dotColor: '#4f4f52',
    image: '/projects/provet.png',
  },
  {
    id: 'saaspo',
    name: 'Saaspo',
    url: 'saaspo.com',
    dotColor: '#4f4f52',
    image: '/projects/provet.png',
  },
  {
    id: 'orbi',
    name: 'Orbi',
    url: 'orbi.ai',
    dotColor: '#4f4f52',
    image: '/projects/provet.png',
  },
]

export interface HeroSectionProps {
  onOpenAuth?: (mode: 'login' | 'signup') => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAuth }) => {
  const [activeTab, setActiveTab] = useState<string>('provet')

  const currentProject = PROJECTS.find((p) => p.id === activeTab) || PROJECTS[0]

  return (
    <div className="hero-container">
      {/* Background Topo Field (ConstellationField) */}
      <div className="hero-bg-canvas" aria-hidden="true">
        <Scene />
      </div>

      {/* Fixed Notion Dark Navbar */}
      <Navbar onOpenAuth={onOpenAuth} />

      {/* Main Hero Content */}
      <main className="hero-content">
        {/* Top Header Row: Headline on Left, Experience & Avatars on Right */}
        <div className="hero-top-row">
          <div className="hero-left">
            <h1 className="hero-title">
              <span className="hero-title-line">One platform for</span>
              <span className="hero-title-line">
                every campus <span className="hero-cursive-word">connection</span>.
              </span>
            </h1>

            <p className="hero-subtitle">
              Lumina is a trusted platform for college communities, helping students <strong>connect</strong>, <strong>collaborate</strong>, and <strong>grow</strong> through one verified campus identity.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="btn-primary-pill"
                onClick={() => (onOpenAuth ? onOpenAuth('signup') : (window.location.hash = 'signup'))}
              >
                Get started
              </button>
              <button type="button" className="btn-docs-pill">
                Read Docs
              </button>
            </div>
          </div>

          {/* Right Column: Wireframe Cube + Avatar Group */}
          <div className="hero-right-column" aria-hidden="true">
            <div className="hero-wireframe-frame">
              <WireframeForms
                variant="cube"
                mode="dark"
                speed={3.00}
                size={1.00}
                length={1.00}
                density={1.00}
                opacity={0.45}
                hue={0}
                saturation={1.00}
                brightness={1.00}
              />
            </div>
            <div className="hero-avatar-stack-wrap">
              <HeroAvatarGroup size="md" />
            </div>
          </div>
        </div>

        {/* Hero Browser Mockup Showcase */}
        <div className="hero-browser-showcase">
          {/* Decorative Mosaic Accent */}
          <div className="hero-mosaic-accent" aria-hidden="true">
            <div className="mosaic-tile tile-cyan" />
            <div className="mosaic-tile tile-empty" />
            <div className="mosaic-tile tile-empty" />
            <div className="mosaic-tile tile-lime" />
          </div>

          <div className="browser-window">
            {/* Sidebar */}
            <aside className="browser-sidebar">
              <div className="sidebar-header">
                <div className="traffic-lights">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <div className="nav-controls">
                  <button type="button" className="nav-btn" aria-label="Back">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button type="button" className="nav-btn" aria-label="Forward">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button type="button" className="nav-btn" aria-label="Reload">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Address Bar */}
              <div className="browser-address-bar">
                <span className="address-text">{currentProject.url}</span>
              </div>

              {/* Tab List */}
              <nav className="browser-tabs-list" aria-label="Project Tabs">
                {PROJECTS.map((project) => {
                  const isActive = project.id === activeTab
                  return (
                    <button
                      key={project.id}
                      type="button"
                      className={`browser-tab-item ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveTab(project.id)}
                    >
                      <span
                        className={`tab-status-dot ${isActive ? 'active' : ''}`}
                        style={{ backgroundColor: isActive ? '#ff5e3a' : '#45464a' }}
                      />
                      <span className="tab-name">{project.name}</span>
                    </button>
                  )
                })}
              </nav>
            </aside>

            {/* Main Viewport */}
            <div className="browser-viewport">
              <div className="viewport-inner">
                <img
                  src={currentProject.image}
                  alt={`${currentProject.name} website preview`}
                  className="viewport-image"
                />
              </div>
            </div>
          </div>

          {/* Feature Highlights Bar Below Browser */}
          <div className="showcase-features-bar">
            <div className="feature-pill">
              <svg className="feature-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              <span>Built to extend with AI</span>
            </div>

            <div className="feature-pill">
              <svg className="feature-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="12" r="3" />
                <line x1="9" y1="12" x2="15" y2="12" />
              </svg>
              <span>No developer bottlenecks</span>
            </div>

            <div className="feature-pill">
              <svg className="feature-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                <path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2 5-2" />
                <path d="M15 15v5s3.03-.55 4.5-2c1.63-1.62 2-5 2-5" />
              </svg>
              <span>Launch in 4-6 weeks</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HeroSection
