import React from 'react'
import { OrbGallery } from '@designcodeio/threeui'
import '@designcodeio/threeui/style.css'
import { cn } from "@/lib/utils"
import { GridPattern } from "@/registry/magicui/grid-pattern"
import './GlobeSection.css'

export function Scene() {
  return (
    <div className="shader-frame">
      <OrbGallery />
    </div>
  )
}

export const GlobeSection: React.FC = () => {
  return (
    <section className="globe-section" aria-label="Campus Network" id="community">
      <div className="globe-section-container">
        {/* Left Side: Interactive 3D Globe */}
        <div className="globe-left-col">
          <div className="globe-canvas-wrapper">
            <Scene />
          </div>
        </div>

        {/* Right Side: Grid Pattern Background & Blueprint Frame */}
        <div className="globe-right-col">
          <GridPattern
            squares={[
              [4, 4],
              [5, 1],
              [8, 2],
              [5, 3],
              [5, 5],
              [10, 10],
              [12, 15],
              [15, 10],
              [10, 15],
              [15, 10],
              [10, 15],
              [15, 10],
            ]}
            className={cn(
              "globe-grid-pattern",
              "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
            )}
          />

          {/* Content Block */}
          <div className="globe-content-wrap">
            <h3 className="globe-content-title">
              One trusted network for your campus.
            </h3>
            <p className="globe-content-desc">
              Connect with students, discover communities, join study groups, explore events, and find career opportunities through one verified campus platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GlobeSection
