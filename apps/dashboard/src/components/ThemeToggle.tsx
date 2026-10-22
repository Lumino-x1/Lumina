import React from 'react'
import type { ThemeMode } from '../lib/themeContext'

export interface ThemeToggleProps {
  theme?: ThemeMode
  onToggle?: () => void
  onSelect?: (mode: ThemeMode) => void
  showLabels?: boolean
  className?: string
}

/**
 * Theme toggle removed per user request (permanently dark theme only)
 */
export const ThemeToggleButton3: React.FC<ThemeToggleProps> = () => null

export const ThemeToggle = ThemeToggleButton3
export default ThemeToggle
