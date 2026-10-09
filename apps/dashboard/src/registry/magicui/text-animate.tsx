import React, { type ElementType } from 'react'
import { motion, type Variants } from 'framer-motion'
import { cn } from '../../lib/utils'

export type AnimationType =
  | 'fadeIn'
  | 'blurIn'
  | 'blurInUp'
  | 'blurInDown'
  | 'slideUp'
  | 'slideDown'
  | 'scaleUp'
  | 'scaleDown'

export interface TextAnimateProps {
  children: React.ReactNode
  as?: ElementType
  animation?: AnimationType
  by?: 'word' | 'character' | 'line'
  startOnView?: boolean
  once?: boolean
  delay?: number
  duration?: number
  className?: string
  segmentClassName?: string
}

const animationVariants: Record<AnimationType, { container: Variants; item: Variants }> = {
  blurIn: {
    container: {
      hidden: { opacity: 0 },
      show: (i: { delay: number }) => ({
        opacity: 1,
        transition: {
          staggerChildren: 0.05,
          delayChildren: i.delay,
        },
      }),
    },
    item: {
      hidden: {
        filter: 'blur(10px)',
        opacity: 0,
      },
      show: {
        filter: 'blur(0px)',
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    },
  },
  fadeIn: {
    container: {
      hidden: { opacity: 0 },
      show: (i: { delay: number }) => ({
        opacity: 1,
        transition: { staggerChildren: 0.04, delayChildren: i.delay },
      }),
    },
    item: {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.4 } },
    },
  },
  blurInUp: {
    container: {
      hidden: { opacity: 0 },
      show: (i: { delay: number }) => ({
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: i.delay },
      }),
    },
    item: {
      hidden: { filter: 'blur(10px)', opacity: 0, y: 16 },
      show: { filter: 'blur(0px)', opacity: 1, y: 0, transition: { duration: 0.5 } },
    },
  },
  blurInDown: {
    container: {
      hidden: { opacity: 0 },
      show: (i: { delay: number }) => ({
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: i.delay },
      }),
    },
    item: {
      hidden: { filter: 'blur(10px)', opacity: 0, y: -16 },
      show: { filter: 'blur(0px)', opacity: 1, y: 0, transition: { duration: 0.5 } },
    },
  },
  slideUp: {
    container: {
      hidden: { opacity: 0 },
      show: (i: { delay: number }) => ({
        opacity: 1,
        transition: { staggerChildren: 0.04, delayChildren: i.delay },
      }),
    },
    item: {
      hidden: { y: 20, opacity: 0 },
      show: { y: 0, opacity: 1, transition: { duration: 0.4 } },
    },
  },
  slideDown: {
    container: {
      hidden: { opacity: 0 },
      show: (i: { delay: number }) => ({
        opacity: 1,
        transition: { staggerChildren: 0.04, delayChildren: i.delay },
      }),
    },
    item: {
      hidden: { y: -20, opacity: 0 },
      show: { y: 0, opacity: 1, transition: { duration: 0.4 } },
    },
  },
  scaleUp: {
    container: {
      hidden: { opacity: 0 },
      show: (i: { delay: number }) => ({
        opacity: 1,
        transition: { staggerChildren: 0.04, delayChildren: i.delay },
      }),
    },
    item: {
      hidden: { scale: 0.8, opacity: 0 },
      show: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
    },
  },
  scaleDown: {
    container: {
      hidden: { opacity: 0 },
      show: (i: { delay: number }) => ({
        opacity: 1,
        transition: { staggerChildren: 0.04, delayChildren: i.delay },
      }),
    },
    item: {
      hidden: { scale: 1.2, opacity: 0 },
      show: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
    },
  },
}

export const TextAnimate: React.FC<TextAnimateProps> = ({
  children,
  as: Component = 'p',
  animation = 'blurIn',
  by = 'word',
  startOnView = true,
  once = true,
  delay = 0,
  className,
  segmentClassName,
}) => {
  const selectedAnimation = animationVariants[animation] || animationVariants.blurIn

  // If children is a string, split into segments
  if (typeof children === 'string') {
    let segments: string[] = []
    if (by === 'character') {
      segments = Array.from(children)
    } else if (by === 'line') {
      segments = children.split('\n')
    } else {
      segments = children.split(/(\s+)/)
    }

    const MotionComponent = motion.create(Component as keyof HTMLElementTagNameMap)

    return (
      <MotionComponent
        variants={selectedAnimation.container}
        initial="hidden"
        whileInView={startOnView ? 'show' : undefined}
        animate={!startOnView ? 'show' : undefined}
        viewport={{ once }}
        custom={{ delay }}
        className={cn('inline-block', className)}
      >
        {segments.map((segment, index) => {
          if (segment.match(/^\s+$/)) {
            return <React.Fragment key={index}>{segment}</React.Fragment>
          }
          return (
            <motion.span
              key={index}
              variants={selectedAnimation.item}
              className={cn('inline-block', segmentClassName)}
            >
              {segment}
            </motion.span>
          )
        })}
      </MotionComponent>
    )
  }

  // If children is JSX / ReactNodes, wrap the container with animation
  const MotionComponent = motion.create(Component as keyof HTMLElementTagNameMap)
  return (
    <MotionComponent
      variants={selectedAnimation.item}
      initial="hidden"
      whileInView={startOnView ? 'show' : undefined}
      animate={!startOnView ? 'show' : undefined}
      viewport={{ once }}
      transition={{ delay, duration: 0.6 }}
      className={className}
    >
      {children}
    </MotionComponent>
  )
}

export default TextAnimate
