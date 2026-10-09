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
            1. 6-Column x 2-Row Logo Grid
            ==================================================================== */}
        <div className="trust-logo-grid" aria-label="Trusted by companies">
          {/* Row 1, Cell 1: Trusted by developers text */}
          <div className="trust-grid-cell">
            <div className="trust-grid-text-cell">
              <span className="trust-grid-text-line1">Trusted by developers</span>
              <span className="trust-grid-text-line2">at 5000+ companies</span>
            </div>
          </div>

          {/* Row 1, Cell 2: Databricks */}
          <div className="trust-grid-cell">
            <div className="trust-logo-item">
              <svg width="112" height="22" viewBox="0 0 112 22" fill="currentColor" aria-label="Databricks">
                {/* Databricks 4-layer stacked isometric diamonds */}
                <path d="M7 2.5L2 5.5l5 3 5-3-5-3zm0 5L2 10.5l5 3 5-3-5-3zm0 5L2 15.5l5 3 5-3-5-3zm0 5L2 20.5l5 3 5-3-5-3z" />
                {/* databricks text */}
                <text x="18" y="15" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13" fontWeight="600" letterSpacing="-0.02em">
                  databricks
                </text>
              </svg>
            </div>
          </div>

          {/* Row 1, Cell 3: CircleCI */}
          <div className="trust-grid-cell">
            <div className="trust-logo-item">
              <svg width="98" height="22" viewBox="0 0 98 22" fill="currentColor" aria-label="CircleCI">
                {/* CircleCI mark */}
                <path fillRule="evenodd" clipRule="evenodd" d="M7 2a8 8 0 105.657 13.657l-1.414-1.414A6 6 0 117 4V2zm0 4a3 3 0 100 6 3 3 0 000-6z" />
                <text x="18" y="15" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13" fontWeight="600" letterSpacing="-0.02em">
                  circleci
                </text>
              </svg>
            </div>
          </div>

          {/* Row 1, Cell 4: Microsoft */}
          <div className="trust-grid-cell">
            <div className="trust-logo-item">
              <svg width="102" height="22" viewBox="0 0 102 22" fill="currentColor" aria-label="Microsoft">
                {/* Microsoft 4 squares */}
                <rect x="1" y="4" width="6.5" height="6.5" />
                <rect x="8.5" y="4" width="6.5" height="6.5" />
                <rect x="1" y="11.5" width="6.5" height="6.5" />
                <rect x="8.5" y="11.5" width="6.5" height="6.5" />
                <text x="20" y="15.5" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13.5" fontWeight="500" letterSpacing="-0.01em">
                  Microsoft
                </text>
              </svg>
            </div>
          </div>

          {/* Row 1, Cell 5: ClickUp */}
          <div className="trust-grid-cell">
            <div className="trust-logo-item">
              <svg width="92" height="22" viewBox="0 0 92 22" fill="currentColor" aria-label="ClickUp">
                {/* ClickUp chevron & smile arc */}
                <path d="M3.2 12.2l2.6-2 2.6 2 1.3-1.6-3.9-3-3.9 3 1.3 1.6zm0 1.2c1.4 1 3 1.5 4.7 1.5s3.3-.5 4.7-1.5l1.2 1.6c-1.8 1.3-3.8 2-5.9 2s-4.1-.7-5.9-2l1.2-1.6z" />
                <text x="17" y="15.5" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13.5" fontWeight="600" letterSpacing="-0.02em">
                  ClickUp
                </text>
              </svg>
            </div>
          </div>

          {/* Row 1, Cell 6: AMD */}
          <div className="trust-grid-cell">
            <div className="trust-logo-item">
              <svg width="68" height="20" viewBox="0 0 68 20" fill="currentColor" aria-label="AMD">
                {/* AMD chevron/box */}
                <path d="M1 3.5h7.5v7.5H1V3.5zm9 9H17.5v-7.5H10v7.5zm-1.5-9h-1v10h10v-1h-9V3.5z" />
                <text x="21" y="15.5" fontFamily="system-ui, -apple-system, sans-serif" fontSize="15" fontWeight="800" letterSpacing="0.04em">
                  AMD
                </text>
              </svg>
            </div>
          </div>

          {/* Row 2, Cell 1: Google */}
          <div className="trust-grid-cell">
            <div className="trust-logo-item">
              <svg width="78" height="22" viewBox="0 0 78 22" fill="currentColor" aria-label="Google">
                <text x="2" y="16.5" fontFamily="'Product Sans', system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="600" letterSpacing="-0.02em">
                  Google
                </text>
              </svg>
            </div>
          </div>

          {/* Row 2, Cell 2: Netlify */}
          <div className="trust-grid-cell">
            <div className="trust-logo-item">
              <svg width="86" height="22" viewBox="0 0 86 22" fill="currentColor" aria-label="Netlify">
                {/* Netlify diamond crystal mark */}
                <path d="M8 3.5L2.5 9l5.5 5.5 5.5-5.5L8 3.5zm0 2.2l3.3 3.3L8 12.3 4.7 9 8 5.7zM7.2 2v2.5h1.6V2H7.2zm0 11.5v2.5h1.6v-2.5H7.2zM2 8.2v1.6h2.5V8.2H2zm11.5 0v1.6H16V8.2h-2.5z" />
                <text x="18" y="15" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13.5" fontWeight="600" letterSpacing="-0.02em">
                  netlify
                </text>
              </svg>
            </div>
          </div>

          {/* Row 2, Cell 3: Atlassian */}
          <div className="trust-grid-cell">
            <div className="trust-logo-item">
              <svg width="102" height="22" viewBox="0 0 102 22" fill="currentColor" aria-label="Atlassian">
                {/* Atlassian sails */}
                <path d="M6.2 9.5c-.3.4-.6.8-1 1.2L1.8 15h6.6l.8-2.2-3-3.3zm2.5-5.3c-.2.3-.5.7-.7 1.1L3.8 12.5l5.2 2.5h6.6L9.6 4.2h-.9z" />
                <text x="18" y="15" fontFamily="system-ui, -apple-system, sans-serif" fontSize="12" fontWeight="700" letterSpacing="0.08em">
                  ATLASSIAN
                </text>
              </svg>
            </div>
          </div>

          {/* Row 2, Cell 4: GitHub */}
          <div className="trust-grid-cell">
            <div className="trust-logo-item">
              <svg width="84" height="22" viewBox="0 0 84 22" fill="currentColor" aria-label="GitHub">
                {/* GitHub Octocat */}
                <path fillRule="evenodd" clipRule="evenodd" d="M7 2a7 7 0 00-2.2 13.6c.35.06.48-.15.48-.34v-1.2c-1.95.42-2.36-.94-2.36-.94-.32-.81-.78-1.03-.78-1.03-.64-.44.05-.43.05-.43.7.05 1.07.72 1.07.72.63 1.07 1.64.76 2.04.58.06-.45.25-.76.45-.94-1.55-.18-3.19-.78-3.19-3.46 0-.76.27-1.39.72-1.88-.07-.18-.31-.89.07-1.85 0 0 .59-.19 1.92.72a6.7 6.7 0 013.5 0c1.33-.91 1.92-.72 1.92-.72.38.96.14 1.67.07 1.85.45.49.72 1.12.72 1.88 0 2.69-1.64 3.28-3.2 3.45.25.22.48.65.48 1.3v1.94c0 .19.12.4.48.33A7 7 0 007 2z" />
                <text x="17" y="15.5" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13.5" fontWeight="600" letterSpacing="-0.02em">
                  GitHub
                </text>
              </svg>
            </div>
          </div>

          {/* Row 2, Cell 5: Sourcegraph */}
          <div className="trust-grid-cell">
            <div className="trust-logo-item">
              <svg width="104" height="22" viewBox="0 0 104 22" fill="currentColor" aria-label="Sourcegraph">
                {/* Sourcegraph asterisk */}
                <path d="M7 3.5l1 2.2 2.2-1-1 2.2 2.2 1-2.2 1 1 2.2-2.2-1-1 2.2-1-2.2-2.2 1 1-2.2-2.2-1 2.2-1-1-2.2 2.2 1L7 3.5z" />
                <text x="16" y="15" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13" fontWeight="600" letterSpacing="-0.02em">
                  Sourcegraph
                </text>
              </svg>
            </div>
          </div>

          {/* Row 2, Cell 6: PwC */}
          <div className="trust-grid-cell">
            <div className="trust-logo-item">
              <svg width="58" height="22" viewBox="0 0 58 22" fill="currentColor" aria-label="PwC">
                {/* PwC geometric square mark */}
                <rect x="1" y="7" width="4.5" height="4.5" />
                <rect x="6" y="4" width="4.5" height="4.5" />
                <rect x="6" y="10" width="4.5" height="4.5" />
                <text x="14" y="15.5" fontFamily="Georgia, serif" fontSize="15" fontWeight="700" letterSpacing="-0.02em">
                  pwc
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* ====================================================================
            2. Featured Quote Block
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
            If I were building GitHub for software built with AI, Langbase is what it would look like.
          </blockquote>

          {/* Author Attribution Row */}
          <div className="trust-quote-author-row">
            {/* Avatar */}
            <div className="trust-quote-avatar">
              <img
                src="https://avatars.githubusercontent.com/u/1?v=4"
                alt="Tom Preston-Werner"
                className="trust-quote-avatar-img"
                loading="lazy"
              />
            </div>

            {/* Author Name and Title */}
            <span className="trust-quote-name">
              Tom Preston-Werner, Co Founder, CEO
            </span>

            {/* GitHub Badge Pill */}
            <div className="trust-quote-pill">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>GitHub</span>
            </div>

            {/* Lead Investor */}
            <span className="trust-quote-role">PWV · Lead Investor</span>

            {/* Langbase Badge Pill */}
            <div className="trust-quote-pill">
              <span className="trust-quote-pill-symbol">⌘</span>
              <span>Langbase</span>
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
