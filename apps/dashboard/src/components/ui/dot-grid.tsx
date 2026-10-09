'use client'

import React, { createContext, useContext } from 'react'

const ThemeContext = createContext<'light' | 'dark'>('dark')

export function useThemeContext() {
  return useContext(ThemeContext)
}

export interface DotGridProps {
  theme?: 'light' | 'dark'
  spacing?: number
  className?: string
  style?: React.CSSProperties
}

export default function DotGrid({ theme: themeProp, spacing = 20, className, style }: DotGridProps) {
  const ctx = useThemeContext()
  const theme = themeProp || ctx || 'dark'
  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(circle, ${theme === 'light' ? '#d4d4d4' : '#333'} 1px, transparent 1px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
        borderRadius: 'inherit',
        pointerEvents: 'none',
        ...style,
      }}
      aria-hidden="true"
    />
  )
}
