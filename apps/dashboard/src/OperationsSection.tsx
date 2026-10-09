import React, { useRef } from "react";
import { motion } from "framer-motion";
import "./OperationsSection.css";

export interface OperationFeatureItem {
  id: string;
  title: string;
  description: string;
  image?: string; // Left blank by default per request
}

export const defaultOperationItems: OperationFeatureItem[] = [
  {
    id: "item-1",
    title: "Advanced Campus Management",
    description:
      "Create rich community spaces, set up student groups, and manage campus initiatives effortlessly with our bulk tools.",
    image: "", // Blank for user to insert
  },
  {
    id: "item-2",
    title: "Multiple Campus Channels",
    description:
      "Set up discussion channels with customizable rules and roles to handle department notices, chats, and events.",
    image: "", // Blank for user to insert
  },
  {
    id: "item-3",
    title: "Resource & Event Scheduling",
    description:
      "Coordinate campus reservations, track real-time resource availability, and streamline physical item exchanges.",
    image: "", // Blank for user to insert
  },
  {
    id: "item-4",
    title: "Verified Identity & Roles",
    description:
      "Authenticate college credentials instantly with single sign-on and role-based permissions across departments.",
    image: "", // Blank for user to insert
  },
];

export interface OperationsSectionProps {
  title?: string;
  subtitle?: string;
  items?: OperationFeatureItem[];
}

export const OperationsSection: React.FC<OperationsSectionProps> = ({
  title = "Handle campus operations at scale",
  subtitle = "The world's most flexible campus platform. Built to be customized by students and developers.",
  items = defaultOperationItems,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 460;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="operations-section"
      id="operations"
      aria-label="Campus Operations at Scale"
    >
      {/* Top Architectural Divider Grid Line */}
      <div className="operations-top-divider" aria-hidden="true" />

      <div className="operations-container">
        {/* Top Header Row: Title on Left, Subtitle + Carousel Nav Buttons on Right */}
        <div className="operations-header-row">
          <div className="operations-header-left">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="operations-title"
            >
              {title}
            </motion.h2>
          </div>

          <div className="operations-header-right">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="operations-subtitle"
            >
              {subtitle}
            </motion.p>

            {/* Circular Carousel Controls */}
            <div className="operations-nav-controls">
              <button
                type="button"
                className="operations-carousel-btn"
                onClick={() => handleScroll("left")}
                aria-label="Previous slide"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                type="button"
                className="operations-carousel-btn"
                onClick={() => handleScroll("right")}
                aria-label="Next slide"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Cards Track with Grid Borders & Blank Image Containers */}
      <div className="operations-track-wrapper">
        <div className="operations-cards-track" ref={scrollRef}>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true }}
              className="operations-card-cell"
            >
              {/* Blank Image Container (Ready for user to drop image) */}
              <div className="operations-image-slot">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="operations-image-content"
                    loading="lazy"
                  />
                ) : (
                  <div className="operations-image-blank" aria-hidden="true">
                    <div className="operations-blank-inner">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.22)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <span className="operations-blank-label">Image Slot</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Description under the image */}
              <div className="operations-card-meta">
                <h3 className="operations-card-title">{item.title}</h3>
                <p className="operations-card-description">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OperationsSection;
