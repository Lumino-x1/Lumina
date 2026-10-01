import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from './lib/utils'
import './Skiper48.css'

export const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6 text-white' }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6 text-white' }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export interface ImageItem {
  src: string
  alt: string
  title?: string
  subtitle?: string
}

const DEFAULT_IMAGES: ImageItem[] = [
  {
    src: '/landing-page-image-of-ceo.jpeg',
    alt: 'Sunilkumar T CEO Lumina',
    title: 'Sunilkumar T',
    subtitle: 'CEO Lumina',
  },
  {
    src: '/landing-page-image-of-CTO.jpeg',
    alt: 'Dharaneesh S L CTO Lumina',
    title: 'Dharaneesh S L',
    subtitle: 'CTO Lumina',
  },
  {
    src: '/landing-page-ML-dev.jpeg',
    alt: 'Agnesh KK ML developer Lumina',
    title: 'Agnesh KK',
    subtitle: 'ML developer Lumina',
  },
  {
    src: '/landing-page-image-of-ceo.jpeg',
    alt: 'Sunilkumar T CEO Lumina',
    title: 'Sunilkumar T',
    subtitle: 'CEO Lumina',
  },
  {
    src: '/landing-page-image-of-CTO.jpeg',
    alt: 'Dharaneesh S L CTO Lumina',
    title: 'Dharaneesh S L',
    subtitle: 'CTO Lumina',
  },
  {
    src: '/landing-page-ML-dev.jpeg',
    alt: 'Agnesh KK ML developer Lumina',
    title: 'Agnesh KK',
    subtitle: 'ML developer Lumina',
  },
]

export interface Carousel002Props {
  images?: ImageItem[]
  className?: string
  showPagination?: boolean
  showNavigation?: boolean
  loop?: boolean
  autoplay?: boolean
  spaceBetween?: number
}

export const Carousel_002: React.FC<Carousel002Props> = ({
  images = DEFAULT_IMAGES,
  className,
  showPagination = false,
  showNavigation = true,
  loop = true,
  autoplay = true,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const total = images.length

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (loop ? (prev + 1) % total : Math.min(prev + 1, total - 1)))
  }, [loop, total])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (loop ? (prev - 1 + total) % total : Math.max(prev - 1, 0)))
  }, [loop, total])

  useEffect(() => {
    if (!autoplay) return
    const timer = setInterval(() => {
      handleNext()
    }, 3200)
    return () => clearInterval(timer)
  }, [autoplay, handleNext])

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -40) {
      handleNext()
    } else if (info.offset.x > 40) {
      handlePrev()
    }
  }

  // Visual stack: top card (0), behind 1, behind 2, behind 3
  const visibleCards = [0, 1, 2, 3].map((offset) => {
    const idx = (activeIndex + offset) % total
    return {
      index: idx,
      offset,
      image: images[idx],
    }
  })

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn('relative w-full max-w-3xl flex flex-col items-center', className)}
    >
      <div className="skiper-deck-wrapper">
        <div className="Carousal_002 h-[480px] w-[340px] relative select-none">
          <AnimatePresence mode="popLayout">
            {[...visibleCards].reverse().map(({ index, offset, image }) => {
              const isTop = offset === 0
              // Calculate stacked perspective
              const scale = 1 - offset * 0.05
              const translateY = -offset * 14
              const rotate = offset === 0 ? 0 : offset % 2 === 0 ? 3.5 * offset : -3.5 * offset
              const opacity = 1 - offset * 0.18

              return (
                <motion.div
                  key={`${index}-${offset}`}
                  className="skiper48-card-stack rounded-none"
                  style={{
                    zIndex: 10 - offset,
                  }}
                  initial={{
                    scale: scale - 0.04,
                    y: translateY - 8,
                    opacity: 0,
                  }}
                  animate={{
                    scale,
                    y: translateY,
                    rotate,
                    opacity,
                  }}
                  exit={{
                    x: -260,
                    opacity: 0,
                    rotate: -18,
                    scale: 0.9,
                    transition: { duration: 0.35, ease: 'easeOut' },
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 24,
                  }}
                  drag={isTop ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={isTop ? handleDragEnd : undefined}
                >
                  <div className="skiper48-card-inner">
                    <img
                      className="skiper48-image"
                      src={image.src}
                      alt={image.alt}
                      draggable={false}
                      onError={(e) => {
                        const target = e.currentTarget
                        target.src = DEFAULT_IMAGES[index % DEFAULT_IMAGES.length].src
                      }}
                    />
                    <div className="skiper48-card-glass-glow" />

                    {/* CEO or Card Caption Overlay */}
                    {image.title && (
                      <div className="skiper48-card-caption">
                        <div className="caption-text-group">
                          <span className="caption-title">{image.title}</span>
                          {image.subtitle && <span className="caption-subtitle">{image.subtitle}</span>}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        {showNavigation && (
          <div className="skiper48-nav-controls">
            <button
              type="button"
              onClick={handlePrev}
              className="skiper48-nav-btn swiper-button-prev"
              aria-label="Previous card"
            >
              <ChevronLeftIcon className="h-5 w-5 text-white" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="skiper48-nav-btn swiper-button-next"
              aria-label="Next card"
            >
              <ChevronRightIcon className="h-5 w-5 text-white" />
            </button>
          </div>
        )}

        {/* Pagination Dots */}
        {showPagination && (
          <div className="skiper48-dots">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={cn('skiper48-dot', i === activeIndex && 'active')}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export const Skiper48: React.FC<{ images?: ImageItem[]; className?: string }> = ({
  images,
  className,
}) => {
  return (
    <div className={cn('skiper48-outer-wrap flex w-full items-center justify-center overflow-visible', className)}>
      <Carousel_002 images={images} loop autoplay={true} />
    </div>
  )
}

export default Skiper48
