import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import './Testimonial.css'

export interface LuminaDifferenceSlide {
  label: string
  headline: string
  description: string
  number: string
  category: string
  metadata: string
}

export type TestimonialItem = LuminaDifferenceSlide

export const luminaDifferenceSlides: LuminaDifferenceSlide[] = [
  {
    label: 'THE LUMINA DIFFERENCE',
    headline: 'Your entire campus life. One connected ecosystem.',
    description:
      'From academic planning and campus communities to personalized learning and career opportunities, Lumina brings everything you need for college into one intelligent platform.',
    number: '01',
    category: 'Connected Campus',
    metadata: 'Social · Academics · Careers',
  },
  {
    label: 'INTELLIGENT LEARNING',
    headline: 'A smarter way to learn, built around you.',
    description:
      'Turn complex subjects into clear insights with AI-powered summaries, personalized learning experiences, and intelligent academic assistance that adapts to your needs.',
    number: '02',
    category: 'AI-Powered Learning',
    metadata: 'Summaries · Personalization · Discovery',
  },
  {
    label: 'YOUR NEXT CHAPTER',
    headline: 'Your next opportunity starts on campus.',
    description:
      'Discover communities, connect with peers and alumni, explore career opportunities, and turn the connections you make today into possibilities for tomorrow.',
    number: '03',
    category: 'Career & Community',
    metadata: 'Connections · Opportunities · Growth',
  },
]

export interface LuminaDifferenceProps {
  items?: LuminaDifferenceSlide[]
  className?: string
}

export type TestimonialProps = LuminaDifferenceProps

export const LuminaDifference: React.FC<LuminaDifferenceProps> = ({
  items = luminaDifferenceSlides,
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse position for subtle magnetic parallax effect on watermark number
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Transform for parallax on the large watermark number
  const numberX = useTransform(x, [-200, 200], [-18, 18])
  const numberY = useTransform(y, [-200, 200], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }
  }

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length)
  }, [items.length])

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
  }, [items.length])

  // Autoplay with pause on hover/focus
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(goNext, 7000)
    return () => clearInterval(timer)
  }, [goNext, isPaused])

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        containerRef.current &&
        containerRef.current.contains(document.activeElement)
      ) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          goPrev()
        } else if (e.key === 'ArrowRight') {
          e.preventDefault()
          goNext()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev])

  const current = items[activeIndex] || items[0]

  return (
    <section
      className={`testimonial-root difference-root ${className}`}
      aria-label="The Lumina Difference"
      role="region"
      aria-roledescription="carousel"
      aria-live="polite"
    >
      <div
        ref={containerRef}
        className="testimonial-container difference-container"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        tabIndex={0}
      >
        {/* Oversized background watermark number (bleeds off left edge) */}
        <motion.div
          className="testimonial-oversized-number difference-oversized-number"
          style={{ x: numberX, y: numberY }}
          aria-hidden="true"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.88, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.08, filter: 'blur(8px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'block' }}
            >
              {current.number}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Main asymmetric editorial layout */}
        <div className="testimonial-main-layout difference-main-layout">
          {/* Left Column: Vertical Section Label & Segmented Progress Line */}
          <div className="testimonial-left-col difference-left-col">
            <div className="difference-vertical-label-wrap">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeIndex}
                  className="testimonial-vertical-label difference-vertical-label"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {current.label}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Vertical Progress Line Track */}
            <div
              className="testimonial-progress-track difference-progress-track"
              role="progressbar"
              aria-valuenow={activeIndex + 1}
              aria-valuemin={1}
              aria-valuemax={items.length}
              aria-label={`Slide ${activeIndex + 1} of ${items.length}`}
            >
              <motion.div
                className="testimonial-progress-fill difference-progress-fill"
                animate={{
                  height: `${((activeIndex + 1) / items.length) * 100}%`,
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Center Column: Category Badge, Headline, Description, Metadata & Controls */}
          <div className="testimonial-center-col difference-center-col">
            {/* Category Badge Pill */}
            <div className="testimonial-badge-wrap difference-badge-wrap">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 14 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="difference-category-badge">
                    <span className="difference-category-dot" aria-hidden="true" />
                    {current.category}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide Headline */}
            <div className="difference-headline-box">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={activeIndex}
                  className="difference-headline-text"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {current.headline}
                </motion.h3>
              </AnimatePresence>
            </div>

            {/* Slide Description */}
            <div className="difference-desc-box">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeIndex}
                  className="difference-desc-text"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.38, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  {current.description}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Bottom Row: Metadata & Navigation Controls */}
            <div className="difference-footer-row">
              {/* Metadata row with terracotta line */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="difference-metadata-wrap"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="difference-meta-line" aria-hidden="true" />
                  <span className="difference-meta-text">{current.metadata}</span>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Cluster: Slide Jump Indicators & Arrow Buttons */}
              <div className="difference-nav-cluster">
                {/* 3-Slide Step Jump Indicators */}
                <div
                  className="difference-slide-indicators"
                  role="tablist"
                  aria-label="Slide Selection"
                >
                  {items.map((slide, idx) => (
                    <button
                      key={slide.number}
                      type="button"
                      role="tab"
                      aria-selected={idx === activeIndex}
                      aria-label={`Jump to slide ${idx + 1}: ${slide.category}`}
                      className={`difference-slide-dot ${idx === activeIndex ? 'is-active' : ''}`}
                      onClick={() => setActiveIndex(idx)}
                    >
                      <span className="sr-only">Slide {idx + 1}</span>
                    </button>
                  ))}
                </div>

                {/* Circular Tactile Arrow Controls */}
                <div className="testimonial-nav-group difference-nav-group">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="testimonial-nav-btn difference-nav-btn"
                    aria-label="Previous slide"
                    title="Previous slide"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M10 12L6 8L10 4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={goNext}
                    className="testimonial-nav-btn difference-nav-btn"
                    aria-label="Next slide"
                    title="Next slide"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 4L10 8L6 12"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Bottom Architectural Ticker Marquee */}
        <div className="testimonial-ticker-wrap difference-ticker-wrap" aria-hidden="true">
          <motion.div
            className="testimonial-ticker-track difference-ticker-track"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
          >
            {[...Array(6)].map((_, i) => (
              <span key={i} className="testimonial-ticker-item difference-ticker-item">
                CONNECTED CAMPUS • INTELLIGENT LEARNING • YOUR NEXT CHAPTER • LUMINA •
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export const Testimonial = LuminaDifference
export default LuminaDifference
