'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const images = [
  {
    src: '/images/x.com/13.jpeg',
    alt: 'Illustrations by AarzooAly',
    code: '# 23',
  },
  {
    src: '/images/x.com/32.jpeg',
    alt: 'Illustrations by AarzooAly',
    code: '# 24',
  },
  {
    src: '/images/x.com/20.jpeg',
    alt: 'Illustrations by AarzooAly',
    code: '# 25',
  },
  {
    src: '/images/x.com/21.jpeg',
    alt: 'Illustrations by AarzooAly',
    code: '# 26',
  },
  {
    src: '/images/x.com/19.jpeg',
    alt: 'Illustrations by AarzooAly',
    code: '# 27',
  },
  {
    src: '/images/x.com/1.jpeg',
    alt: 'Illustrations by AarzooAly',
    code: '# 28',
  },
  {
    src: '/images/x.com/2.jpeg',
    alt: 'Illustrations by AarzooAly',
    code: '# 29',
  },
  {
    src: '/images/x.com/3.jpeg',
    alt: 'Illustrations by AarzooAly',
    code: '# 30',
  },
  {
    src: '/images/x.com/4.jpeg',
    alt: 'Illustrations by AarzooAly',
    code: '# 31',
  },
]

export const HoverExpand_001 = ({
  images: imageList = images,
  className,
}: {
  images?: { src: string; alt: string; code: string }[]
  className?: string
}) => {
  const [activeImage, setActiveImage] = useState<number | null>(1)

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.2,
      }}
      className={cn('relative w-full max-w-6xl px-5', className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="flex w-full items-center justify-center gap-1.5 overflow-x-auto py-4">
          {imageList.map((image, index) => (
            <motion.div
              key={index}
              className="relative cursor-pointer overflow-hidden rounded-3xl shrink-0"
              initial={{ width: '2.5rem', height: '20rem' }}
              animate={{
                width: activeImage === index ? '24rem' : '5rem',
                height: activeImage === index ? '24rem' : '24rem',
              }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              onClick={() => setActiveImage(index)}
              onHoverStart={() => setActiveImage(index)}
            >
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute h-full w-full bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute flex h-full w-full flex-col items-end justify-end p-4 z-20 pointer-events-none"
                  >
                    <p className="text-left text-xs font-mono text-white/70">
                      {image.code}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              <img
                src={image.src}
                className="size-full object-cover"
                alt={image.alt}
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export const Skiper52 = () => {
  return (
    <section className="relative flex flex-col w-full items-center justify-center overflow-hidden bg-black py-20" id="showcase">
      <div className="w-full h-px bg-white/[0.08] mb-12" aria-hidden="true" />
      <HoverExpand_001 images={images} />
      <div className="w-full h-px bg-white/[0.08] mt-12" aria-hidden="true" />
    </section>
  )
}

export default Skiper52
