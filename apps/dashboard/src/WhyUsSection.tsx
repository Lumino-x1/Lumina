import React from 'react'
import './WhyUsSection.css'

export interface WhyUsSectionProps {
  topBarText?: string
  title?: string
  subtitle?: string
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({
  title = 'Everything you need for college life.',
  subtitle = 'Connect with your campus, collaborate with your peers, discover opportunities, and build relationships that last beyond graduation.',
}) => {

  return (
    <section className="why-us-section" id="features" aria-label="Why Lumina">
      {/* Continuous Centered Container Frame with Vertical Dashed Guide Lines */}
      <div className="why-us-container-frame">
        {/* ====================================================================
            Hatched Blueprint Spacer Gap with Crosshairs (+)
            ==================================================================== */}
        <div className="why-us-hatch-gap" aria-hidden="true">
          <span className="crosshair-marker crosshair-hatch-tl">+</span>
          <span className="crosshair-marker crosshair-hatch-tr">+</span>
          <span className="crosshair-marker crosshair-hatch-bl">+</span>
          <span className="crosshair-marker crosshair-hatch-br">+</span>
        </div>

        {/* ====================================================================
            3. SECTION 1: Everything you need for college life.
            ==================================================================== */}
        <div className="why-us-main-content">
          <div className="why-us-header-block">
            <h2 className="why-us-title">{title}</h2>
            <p className="why-us-subtitle">{subtitle}</p>
          </div>

          {/* Architectural Bento Grid 1 */}
          <div className="why-us-bento-grid">
            <span className="crosshair-marker crosshair-top-left" aria-hidden="true">+</span>
            <span className="crosshair-marker crosshair-top-right" aria-hidden="true">+</span>
            <span className="crosshair-marker crosshair-bottom-left" aria-hidden="true">+</span>
            <span className="crosshair-marker crosshair-bottom-right" aria-hidden="true">+</span>

            {/* Row 1 */}
            <div className="why-us-bento-row">
              {/* Card 1: Verified Community */}
              <div className="why-us-card card-wide-left">
                <div className="why-us-card-image-wrap" aria-hidden="true">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                    alt="Verified Community"
                    className="why-us-card-bg-img"
                    loading="lazy"
                  />
                  <div className="why-us-card-overlay" />
                </div>

                <div className="why-us-card-content">
                  <div className="why-us-card-body">
                    <h3 className="why-us-card-title">Verified Community</h3>
                    <p className="why-us-card-desc">
                      Build meaningful connections inside a trusted network of students, faculty, and alumni.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: Academic Collaboration */}
              <div className="why-us-card card-narrow-right">
                <div className="why-us-card-image-wrap" aria-hidden="true">
                  <img
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80"
                    alt="Academic Collaboration"
                    className="why-us-card-bg-img"
                    loading="lazy"
                  />
                  <div className="why-us-card-overlay" />
                </div>

                <div className="why-us-card-content">
                  <div className="why-us-card-body">
                    <h3 className="why-us-card-title">Academic Collaboration</h3>
                    <p className="why-us-card-desc">
                      Create study groups, share knowledge, discuss academic work, and learn together.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="why-us-bento-row">
              {/* Card 3: Clubs & Communities */}
              <div className="why-us-card card-narrow-left">
                <div className="why-us-card-image-wrap" aria-hidden="true">
                  <img
                    src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80"
                    alt="Clubs & Communities"
                    className="why-us-card-bg-img"
                    loading="lazy"
                  />
                  <div className="why-us-card-overlay" />
                </div>

                <div className="why-us-card-content">
                  <div className="why-us-card-body">
                    <h3 className="why-us-card-title">Clubs & Communities</h3>
                    <p className="why-us-card-desc">
                      Discover communities and clubs that match your interests and become part of campus life.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 4: Career Opportunities */}
              <div className="why-us-card card-wide-right">
                <div className="why-us-card-image-wrap" aria-hidden="true">
                  <img
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80"
                    alt="Career Opportunities"
                    className="why-us-card-bg-img"
                    loading="lazy"
                  />
                  <div className="why-us-card-overlay" />
                </div>

                <div className="why-us-card-content">
                  <div className="why-us-card-body">
                    <h3 className="why-us-card-title">Career Opportunities</h3>
                    <p className="why-us-card-desc">
                      Discover internships, prepare for placements, and connect with mentors and alumni.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyUsSection
