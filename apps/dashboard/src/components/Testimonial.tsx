import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import './Testimonial.css'

export interface TestimonialItem {
  quote: string
  author: string
  role: string
  company: string
}

const defaultTestimonials: TestimonialItem[] = [
  {
    quote: "Transformed our entire creative process overnight.",
    author: "Sarah Chen",
    role: "Design Director",
    company: "Linear",
  },
  {
    quote: "The most elegant solution we've ever implemented.",
    author: "Marcus Webb",
    role: "Creative Lead",
    company: "Vercel",
  },
  {
    quote: "Pure craftsmanship in every single detail.",
    author: "Elena Frost",
    role: "Head of Product",
    company: "Stripe",
  },
]

export interface TestimonialProps {
  items?: TestimonialItem[]
  className?: string
}

export const Testimonial: React.FC<TestimonialProps> = ({
  items = defaultTestimonials,
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse position for magnetic parallax effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Transform for parallax on the large watermark number
  const numberX = useTransform(x, [-200, 200], [-20, 20])
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

  const goNext = () => setActiveIndex((prev) => (prev + 1) % items.length)
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length)

  useEffect(() => {
    const timer = setInterval(goNext, 6000)
    return () => clearInterval(timer)
  }, [items.length])

  const current = items[activeIndex] || items[0]

  return (
    <div className={`testimonial-root ${className}`}>
      <div ref={containerRef} className="testimonial-container" onMouseMove={handleMouseMove}>
        {/* Oversized index number - positioned to bleed off left edge */}
        <motion.div
          className="testimonial-oversized-number"
          style={{ x: numberX, y: numberY }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'block' }}
            >
              {String(activeIndex + 1).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Main content - asymmetric layout */}
        <div className="testimonial-main-layout">
          {/* Left column - vertical text */}
          <div className="testimonial-left-col">
            <motion.span
              className="testimonial-vertical-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Testimonials
            </motion.span>

            {/* Vertical progress line */}
            <div className="testimonial-progress-track">
              <motion.div
                className="testimonial-progress-fill"
                animate={{
                  height: `${((activeIndex + 1) / items.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Center - main content */}
          <div className="testimonial-center-col">
            {/* Company badge */}
            <div className="testimonial-badge-wrap">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="testimonial-company-badge">
                    <span className="testimonial-company-dot" />
                    {current.company}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quote with character/word reveal */}
            <div className="testimonial-quote-box">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={activeIndex}
                  className="testimonial-quote-text"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {current.quote.split(' ').map((word, i) => (
                    <motion.span
                      key={i}
                      className="testimonial-word"
                      variants={{
                        hidden: { opacity: 0, y: 20, rotateX: 90 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          transition: {
                            duration: 0.5,
                            delay: i * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -10,
                          transition: { duration: 0.2, delay: i * 0.02 },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author row */}
            <div className="testimonial-author-row">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="testimonial-author-info"
                >
                  {/* Animated line before name */}
                  <motion.div
                    className="testimonial-signature-line"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  />
                  <div>
                    <p className="testimonial-author-name">{current.author}</p>
                    <p className="testimonial-author-role">{current.role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="testimonial-nav-group">
                <motion.button
                  type="button"
                  onClick={goPrev}
                  className="testimonial-nav-btn"
                  aria-label="Previous testimonial"
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M10 12L6 8L10 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={goNext}
                  className="testimonial-nav-btn"
                  aria-label="Next testimonial"
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom ticker - subtle repeating company names */}
        <div className="testimonial-ticker-wrap" aria-hidden="true">
          <motion.div
            className="testimonial-ticker-track"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="testimonial-ticker-item">
                {items.map((t) => t.company).join(' • ')} •
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Testimonial
