import React from 'react'
import { Layers, Clock, Rocket } from 'lucide-react'
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
            1. TOP ROW: Unified Testimonial Section
            ==================================================================== */}
        <div className="command-testimonial-row">
          <Testimonial />
        </div>

        {/* ====================================================================
            2. MIDDLE ROW: Model Description vs Action Buttons (50/50 split)
            ==================================================================== */}
        <div className="command-middle-row">
          <div className="command-desc-col">
            <p className="command-desc-text">
              Lumina is an AI-powered campus ecosystem that unifies social networking, intelligent academic scheduling, AI-driven summarization, personalized learning, and career opportunities to redefine the college experience.
            </p>
          </div>
          <div className="command-actions-col">
            <button type="button" className="command-btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3z" />
              </svg>
              <span>Getting started with Lumina</span>
            </button>
            <button type="button" className="command-btn-secondary">
              Docs
            </button>
          </div>
        </div>

        {/* ====================================================================
            3. BOTTOM ROW: 4 Columns (Empty Visual Slot + [1], [2], [3] Stat Cards)
            ==================================================================== */}
        <div className="command-stats-grid">
          {/* Column 1: Left slot (empty placeholder frame without image as requested) */}
          <div className="command-stat-cell command-stat-empty-cell" aria-hidden="true" />

          {/* Column 2: [1] 80% */}
          <div className="command-stat-cell">
            <div className="command-stat-header">
              <div className="command-stat-icon-box" aria-hidden="true">
                <Layers className="w-4 h-4" />
              </div>
              <span className="command-stat-index">[1]</span>
            </div>
            <div className="command-stat-value">80%</div>
            <p className="command-stat-desc">
              of enterprise data is unstructured. Most of it sits in PDFs, scans, and spreadsheets your LLMs can&apos;t read.
            </p>
          </div>

          {/* Column 3: [2] 6+ months */}
          <div className="command-stat-cell">
            <div className="command-stat-header">
              <div className="command-stat-icon-box" aria-hidden="true">
                <Clock className="w-4 h-4" />
              </div>
              <span className="command-stat-index">[2]</span>
            </div>
            <div className="command-stat-value">6+ months</div>
            <p className="command-stat-desc">
              AI teams spend stitching parsers, OCR, and post-processing. Pipelines break the moment a layout changes.
            </p>
          </div>

          {/* Column 4: [3] <10% */}
          <div className="command-stat-cell">
            <div className="command-stat-header">
              <div className="command-stat-icon-box" aria-hidden="true">
                <Rocket className="w-4 h-4" />
              </div>
              <span className="command-stat-index">[3]</span>
            </div>
            <div className="command-stat-value">&lt;10%</div>
            <p className="command-stat-desc">
              of in-house document pipelines reach production. The rest stall in the pilot.
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
