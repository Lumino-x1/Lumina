import React, { createContext, useContext, useEffect, useState } from 'react'

export type ThemeMode = 'dark' | 'light' | 'bright'

interface ThemeContextType {
  theme: ThemeMode
  isDark: boolean
  toggleTheme: () => void
  setTheme: (theme: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  isDark: true,
  toggleTheme: () => {},
  setTheme: () => {},
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('lumina_theme')
        if (stored === 'light' || stored === 'bright') return 'light'
        if (stored === 'dark') return 'dark'
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return 'dark'
        }
      } catch {
        // ignore storage error
      }
    }
    return 'light' // Default to crisp white editorial light theme
  })

  const isDark = theme === 'dark'

  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    if (isDark) {
      root.setAttribute('data-theme', 'dark')
      root.classList.add('dark')
      root.classList.remove('light', 'bright')
      body.setAttribute('data-theme', 'dark')
      body.classList.add('dark')
      body.classList.remove('light', 'bright')
    } else {
      root.setAttribute('data-theme', 'light')
      root.classList.add('light', 'bright')
      root.classList.remove('dark')
      body.setAttribute('data-theme', 'light')
      body.classList.add('light', 'bright')
      body.classList.remove('dark')
    }

    try {
      localStorage.setItem('lumina_theme', isDark ? 'dark' : 'light')
    } catch {
      // ignore storage error
    }
  }, [isDark, theme])

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme === 'bright' ? 'light' : newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
