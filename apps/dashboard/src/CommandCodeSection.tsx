import React from 'react'
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
            1. TOP ROW: Trace Timeline & // command Showcase (50/50 split)
            ==================================================================== */}
        <div className="command-top-row">
          {/* Left Column: Interactive Execution Trace */}
          <div className="command-trace-col">
            <div className="command-trace-timeline">
              {/* Row 1: Input */}
              <div className="command-trace-row">
                <span className="command-trace-tag">[ Input ]</span>
                <div className="command-trace-spine-cell">
                  <div className="command-spine-seg-top-dashed" />
                  <div className="command-spine-seg-down spine-color-1" />
                  <div className="command-trace-node-box">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4 9c0-2.2 2-4 8-4s8 1.8 8 4v1.5H4V9z" />
                      <path d="M2 10.5h14v1.5H2z" />
                      <path d="M5 12h14v4a7 7 0 0 1-14 0v-4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
                      <rect x="6.5" y="13" width="4.5" height="3" rx="0.8" />
                      <rect x="13" y="13" width="4.5" height="3" rx="0.8" />
                      <path d="M11 14.5h2" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </div>
                </div>
                <div className="command-trace-text">
                  Can I use a coding agent that knows my taste and preferences?`
                </div>
              </div>

              {/* Row 2: Thinking - Step 1 */}
              <div className="command-trace-row">
                <span className="command-trace-tag">[ Thinking ]</span>
                <div className="command-trace-spine-cell">
                  <div className="command-spine-seg-down spine-color-2" />
                  <div className="command-trace-node-box">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
                    </svg>
                  </div>
                </div>
                <div className="command-trace-text command-trace-text-muted">
                  Searching memory &quot;langbase-docs&quot;, &quot;command-code-docs&quot;
                </div>
              </div>

              {/* Row 3: Thinking - Step 2 */}
              <div className="command-trace-row">
                <span className="command-trace-tag"></span>
                <div className="command-trace-spine-cell">
                  <div className="command-spine-seg-down spine-color-3" />
                  <div className="command-trace-node-box">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
                    </svg>
                  </div>
                </div>
                <div className="command-trace-text command-trace-text-muted">
                  Agentic re-ranking the most relevant context
                </div>
              </div>

              {/* Row 4: Thinking - Step 3 */}
              <div className="command-trace-row">
                <span className="command-trace-tag"></span>
                <div className="command-trace-spine-cell">
                  <div className="command-spine-seg-down spine-color-4" />
                  <div className="command-trace-node-box">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
                    </svg>
                  </div>
                </div>
                <div className="command-trace-text command-trace-text-muted">
                  Citation: Used &quot;command-code-docs&quot; content &quot;Taste&quot;
                </div>
              </div>

              {/* Row 5: Output */}
              <div className="command-trace-row">
                <span className="command-trace-tag">[ Output ]</span>
                <div className="command-trace-spine-cell">
                  <div className="command-spine-seg-bottom" />
                  <div className="command-trace-node-box">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3z" />
                    </svg>
                  </div>
                </div>
                <div className="command-trace-text">
                  Commad Code is the first coding agent that continuously learns your coding taste.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: // command Typography Display */}
          <div className="command-hero-col">
            <div className="command-brand-display">
              <span className="command-brand-slash">//</span>
              <span className="command-brand-name">command</span>
            </div>
          </div>
        </div>

        {/* ====================================================================
            2. MIDDLE ROW: Model Description vs Action Buttons (50/50 split)
            ==================================================================== */}
        <div className="command-middle-row">
          <div className="command-desc-col">
            <p className="command-desc-text">
              Command Code is a frontier coding agent with Meta Neuro-Symbolic AI model &lsquo;taste-1&rsquo; that can continuously learns your coding taste.
            </p>
          </div>
          <div className="command-actions-col">
            <button type="button" className="command-btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3z" />
              </svg>
              <span>Get started with Command Code</span>
            </button>
            <button type="button" className="command-btn-secondary">
              Docs
            </button>
          </div>
        </div>

        {/* ====================================================================
            3. BOTTOM ROW: 3 Feature Columns with Gradient Mosaic Bricks
            ==================================================================== */}
        <div className="command-features-grid">
          {/* Column 1: Continuously Learning (Pink / Magenta / Violet) */}
          <div className="command-feature-card">
            <div className="command-feature-header">
              <h3 className="command-feature-title">
                <span className="command-feature-slash">//</span>
                Continuously Learning
              </h3>
              <p className="command-feature-desc">
                Learns the taste of your code (explicit &amp; implicit feedback).
              </p>
            </div>

            {/* Mosaic Bricks: Violet / Magenta Theme */}
            <div className="command-bricks-mosaic">
              {/* Row 1: 2 bricks */}
              <div className="command-brick-row">
                <div className="command-brick brick-theme-violet-faded" style={{ width: '27%' }} />
                <div className="command-brick brick-theme-violet" style={{ width: '70%' }} />
              </div>
              {/* Row 2: 2 bricks */}
              <div className="command-brick-row">
                <div className="command-brick brick-theme-violet-alt" style={{ width: '48%' }} />
                <div className="command-brick brick-theme-violet" style={{ width: '49%' }} />
              </div>
              {/* Row 3: 3 bricks */}
              <div className="command-brick-row">
                <div className="command-brick brick-theme-violet" style={{ width: '28%' }} />
                <div className="command-brick brick-theme-violet-dark" style={{ width: '47%' }} />
                <div className="command-brick brick-theme-violet-alt" style={{ width: '20%' }} />
              </div>
              {/* Row 4: 4 bricks */}
              <div className="command-brick-row">
                <div className="command-brick brick-theme-violet" style={{ width: '8%' }} />
                <div className="command-brick brick-theme-violet-faded" style={{ width: '28%' }} />
                <div className="command-brick brick-theme-violet-dark" style={{ width: '24%' }} />
                <div className="command-brick brick-theme-violet" style={{ width: '36%' }} />
              </div>
              {/* Row 5: 3 bricks */}
              <div className="command-brick-row">
                <div className="command-brick brick-theme-violet" style={{ width: '22%' }} />
                <div className="command-brick brick-theme-violet-alt" style={{ width: '48%' }} />
                <div className="command-brick brick-theme-violet-dark" style={{ width: '26%' }} />
              </div>
            </div>
          </div>

          {/* Column 2: Meta Neuro-Symbolic AI (Cyan / Teal / Emerald) */}
          <div className="command-feature-card">
            <div className="command-feature-header">
              <h3 className="command-feature-title">
                <span className="command-feature-slash">//</span>
                Meta Neuro-Symbolic AI
              </h3>
              <p className="command-feature-desc">
                taste-1 enforces the invisible logic of your choices and taste.
              </p>
            </div>

            {/* Mosaic Bricks: Cyan / Teal Theme */}
            <div className="command-bricks-mosaic">
              {/* Row 1: 2 bricks */}
              <div className="command-brick-row">
                <div className="command-brick brick-theme-cyan" style={{ width: '24%' }} />
                <div className="command-brick brick-theme-cyan-dark" style={{ width: '73%' }} />
              </div>
              {/* Row 2: 3 bricks */}
              <div className="command-brick-row">
                <div className="command-brick brick-theme-cyan" style={{ width: '26%' }} />
                <div className="command-brick brick-theme-cyan-faded" style={{ width: '30%' }} />
                <div className="command-brick brick-theme-cyan-alt" style={{ width: '40%' }} />
              </div>
              {/* Row 3: 2 bricks */}
              <div className="command-brick-row">
                <div className="command-brick brick-theme-cyan-dark" style={{ width: '36%' }} />
                <div className="command-brick brick-theme-cyan" style={{ width: '61%' }} />
              </div>
              {/* Row 4: 2 bricks */}
              <div className="command-brick-row">
                <div className="command-brick brick-theme-cyan-alt" style={{ width: '44%' }} />
                <div className="command-brick brick-theme-cyan-dark" style={{ width: '53%' }} />
              </div>
              {/* Row 5: 3 bricks */}
              <div className="command-brick-row">
                <div className="command-brick brick-theme-cyan" style={{ width: '28%' }} />
                <div className="command-brick brick-theme-cyan-faded" style={{ width: '28%' }} />
                <div className="command-brick brick-theme-cyan-dark" style={{ width: '40%' }} />
              </div>
            </div>
          </div>

          {/* Column 3: Share with your team (Orange / Amber / Coral) */}
          <div className="command-feature-card">
            <div className="command-feature-header">
              <h3 className="command-feature-title">
                <span className="command-feature-slash">//</span>
                Share with your team
              </h3>
              <p className="command-feature-desc">
                Share your taste to build consistent code using npx taste push/pull.
              </p>
            </div>

            {/* Mosaic Bricks: Orange / Amber Theme */}
            <div className="command-bricks-mosaic">
              {/* Row 1: 2 bricks */}
              <div className="command-brick-row">
                <div className="command-brick brick-theme-orange-dark" style={{ width: '57%' }} />
                <div className="command-brick brick-theme-orange" style={{ width: '40%' }} />
              </div>
              {/* Row 2: 2 bricks */}
              <div className="command-brick-row">
                <div className="command-brick brick-theme-orange" style={{ width: '36%' }} />
                <div className="command-brick brick-theme-orange-dark" style={{ width: '61%' }} />
              </div>
              {/* Row 3: 4 bricks */}
              <div className="command-brick-row">
                <div className="command-brick brick-theme-orange" style={{ width: '12%' }} />
                <div className="command-brick brick-theme-orange-alt" style={{ width: '16%' }} />
                <div className="command-brick brick-theme-orange-dark" style={{ width: '50%' }} />
                <div className="command-brick brick-theme-orange" style={{ width: '16%' }} />
              </div>
              {/* Row 4: 2 bricks */}
              <div className="command-brick-row">
                <div className="command-brick brick-theme-orange-faded" style={{ width: '28%' }} />
                <div className="command-brick brick-theme-orange" style={{ width: '69%' }} />
              </div>
              {/* Row 5: 3 bricks */}
              <div className="command-brick-row">
                <div className="command-brick brick-theme-orange" style={{ width: '68%' }} />
                <div className="command-brick brick-theme-orange-dark" style={{ width: '12%' }} />
                <div className="command-brick brick-theme-orange-alt" style={{ width: '15%' }} />
              </div>
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
