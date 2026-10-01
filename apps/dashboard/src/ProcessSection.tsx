import React from 'react'
import './ProcessSection.css'
import { Skiper39 } from './CrowdCanvas'

export const ProcessSection: React.FC = () => {
  return (
    <section className="process-section" id="process" aria-label="Process">
      {/* Top Architectural Ruler Bar */}
      <div className="process-top-ruler" aria-hidden="true">
        <div className="process-ruler-grid">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="ruler-cell" />
          ))}
        </div>
      </div>

      <div className="process-container">
        {/* Heading Row */}
        <div className="process-heading-row">
          <div className="process-heading-left">
            <h2 className="process-title">
              How we connect your
              <span className="process-title-break">entire campus in one place?</span>
            </h2>
          </div>
        </div>

        {/* Crowd Canvas Showcase */}
        <div className="process-crowd-wrapper">
          <Skiper39 />
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
