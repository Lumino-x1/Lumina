import React from 'react'
import './TrustAndQuoteSection.css'

export const TrustAndQuoteSection: React.FC = () => {
  return (
    <section className="trust-quote-section" aria-label="Trusted By and Testimonial">
      {/* Continuous Centered Container Frame with Vertical Dashed Guide Lines */}
      <div className="trust-quote-container-frame">
        {/* Corner Crosshairs at top of this section */}
        <span className="crosshair-marker crosshair-top-left" aria-hidden="true">+</span>
        <span className="crosshair-marker crosshair-top-right" aria-hidden="true">+</span>

        {/* ====================================================================
            Featured Quote Block (CEO Attribution)
            ==================================================================== */}
        <div className="trust-quote-block">
          {/* Quote Mark Icon */}
          <div className="trust-quote-icon" aria-hidden="true">
            <svg width="34" height="28" viewBox="0 0 34 28" fill="currentColor">
              <path d="M0 16.5C0 7.8 5.6 1.4 14.2 0l1.8 3.5C10.5 4.9 8.2 8.5 7.6 12h6.6v15.5H0V16.5zm19.8 0C19.8 7.8 25.4 1.4 34 0l1.8 3.5c-5.5 1.4-7.8 5-8.4 8.5H34v15.5H19.8V16.5z" />
            </svg>
          </div>

          {/* Large Headline Quote */}
          <blockquote className="trust-quote-text">
            If I were building LinkedIn for college students, Lumina is what it would look like.
          </blockquote>

          {/* Author Attribution Row */}
          <div className="trust-quote-author-row">
            {/* Avatar */}
            <div className="trust-quote-avatar">
              <img
                src="/landing-page-image-of-ceo.jpeg"
                alt="Sunilkumar T"
                className="trust-quote-avatar-img"
                loading="lazy"
              />
            </div>

            {/* Author Name and Title */}
            <span className="trust-quote-name">
              Sunilkumar T, Founder, CEO
            </span>

            {/* Lumina Badge Pill */}
            <div className="trust-quote-pill">
              <span className="trust-quote-pill-symbol">⌘</span>
              <span>Lumina</span>
            </div>
          </div>
        </div>

        {/* Bottom Corner Crosshairs (+) at frame border intersections */}
        <span className="crosshair-marker crosshair-bottom-left" aria-hidden="true">+</span>
        <span className="crosshair-marker crosshair-bottom-right" aria-hidden="true">+</span>
      </div>
    </section>
  )
}

export default TrustAndQuoteSection
