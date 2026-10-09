import React from "react";
import Integrations from "./components/ui/integrations-4";
import "./IntegrationsSection.css";

export const IntegrationsSection: React.FC = () => {
  return (
    <section className="integrations-section" id="integrations" aria-label="Ecosystem Integrations">
      {/* Top Architectural Grid Ruler Strip with Cells */}
      <div className="integrations-ruler-strip" aria-hidden="true">
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="integrations-ruler-cell" />
        ))}
      </div>

      <div className="integrations-container">
        {/* Heading Row with Clean Icon (No background box) */}
        <div className="integrations-heading-row">
          <div className="integrations-heading-left">
            <div className="integrations-icon-wrapper" aria-hidden="true">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="8" height="8" x="3" y="3" rx="2" />
                <path d="M7 11v4a2 2 0 0 0 2 2h4" />
                <rect width="8" height="8" x="13" y="13" rx="2" />
              </svg>
            </div>

            <h2 className="integrations-heading-title">
              Connected across your<br />
              favorite creative tools
            </h2>
          </div>

          <div className="integrations-heading-right">
            <p className="integrations-year-tag">
              Over <strong>100+</strong> connected platforms in 2026.
            </p>
          </div>
        </div>

        {/* Integrations Component Visual Layout */}
        <Integrations />
      </div>

      {/* Bottom Dotted Matrix Grid Strip Separator */}
      <div className="integrations-dotted-strip" aria-hidden="true" />
    </section>
  );
};

export default IntegrationsSection;
