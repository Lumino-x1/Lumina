import React, { useId, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme, type ThemeMode } from '../lib/themeContext'
import { cn } from '../lib/utils'
import './ThemeToggle.css'

export interface ThemeToggleProps {
  theme?: ThemeMode
  onToggle?: () => void
  onSelect?: (mode: ThemeMode) => void
  showLabels?: boolean
  className?: string
}

/**
 * ThemeToggleButton3 — Morphing Sun/Moon Toggle Animation
 * Inspired by Skiper UI / toggles.dev (Alfie Jones)
 * Recreated with React + Framer Motion and integrated with Lumina Theme System.
 */
export const ThemeToggleButton3: React.FC<ThemeToggleProps> = ({
  className = '',
  theme: propTheme,
  onToggle: propOnToggle,
  onSelect: propOnSelect,
}) => {
  const context = useTheme()
  const rawId = useId()
  const clipId = `skiper-btn-3-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`

  const currentTheme: ThemeMode = propTheme ?? context.theme ?? 'dark'
  const isDark = currentTheme === 'dark'

  const handleToggle = () => {
    if (propOnToggle) {
      propOnToggle()
    } else if (propOnSelect) {
      propOnSelect(isDark ? 'bright' : 'dark')
    } else if (context.toggleTheme) {
      context.toggleTheme()
    }
  }

  // Global keyboard shortcut 'T' to toggle theme outside text fields
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 't' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const target = e.target as HTMLElement | null
        if (
          target &&
          (target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.isContentEditable ||
            target.closest('[contenteditable="true"]'))
        ) {
          return
        }
        e.preventDefault()
        handleToggle()
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [isDark])

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Toggle theme (currently ${isDark ? 'Dark mode' : 'Bright/Light mode'})`}
      title={`Theme: ${isDark ? 'Dark' : 'Light'} • Press [T] to toggle`}
      className={cn(
        'lumina-skiper-toggle-btn relative inline-flex items-center justify-center !rounded-full transition-all duration-300 active:scale-95 cursor-pointer',
        'w-9 h-9 p-2 shrink-0 aspect-square',
        isDark
          ? 'bg-black text-white border border-white/15 hover:border-white/30 hover:bg-neutral-900 shadow-sm'
          : 'bg-white text-black border border-black/15 hover:border-black/30 hover:bg-neutral-100 shadow-sm',
        className,
      )}
      style={{ borderRadius: '50%' }}
      onClick={handleToggle}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        strokeLinecap="round"
        viewBox="0 0 32 32"
        className="w-full h-full"
      >
        <clipPath id={clipId}>
          <motion.path
            animate={{ y: isDark ? 14 : 0, x: isDark ? -11 : 0 }}
            transition={{ ease: 'easeInOut', duration: 0.35 }}
            d="M0-11h25a1 1 0 0017 13v30H0Z"
          />
        </clipPath>
        <g clipPath={`url(#${clipId})`}>
          <motion.circle
            animate={{ r: isDark ? 10 : 8 }}
            transition={{ ease: 'easeInOut', duration: 0.35 }}
            cx="16"
            cy="16"
          />
          <motion.g
            animate={{
              scale: isDark ? 0.5 : 1,
              opacity: isDark ? 0 : 1,
            }}
            transition={{ ease: 'easeInOut', duration: 0.35 }}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M18.3 3.2c0 1.3-1 2.3-2.3 2.3s-2.3-1-2.3-2.3S14.7.9 16 .9s2.3 1 2.3 2.3zm-4.6 25.6c0-1.3 1-2.3 2.3-2.3s2.3 1 2.3 2.3-1 2.3-2.3 2.3-2.3-1-2.3-2.3zm15.1-10.5c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zM3.2 13.7c1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3S.9 17.3.9 16s1-2.3 2.3-2.3zm5.8-7C9 7.9 7.9 9 6.7 9S4.4 8 4.4 6.7s1-2.3 2.3-2.3S9 5.4 9 6.7zm16.3 21c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm2.4-21c0 1.3-1 2.3-2.3 2.3S23 7.9 23 6.7s1-2.3 2.3-2.3 2.4 1 2.4 2.3zM6.7 23C8 23 9 24 9 25.3s-1 2.3-2.3 2.3-2.3-1-2.3-2.3 1-2.3 2.3-2.3z" />
          </motion.g>
        </g>
      </svg>
    </button>
  )
}

export const ThemeToggle = ThemeToggleButton3
export default ThemeToggle
