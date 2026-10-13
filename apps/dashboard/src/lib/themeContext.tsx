import React, { createContext, useContext, useEffect, useState } from 'react'

export type ThemeMode = 'dark' | 'bright'

interface ThemeContextType {
  theme: ThemeMode
  toggleTheme: () => void
  setTheme: (theme: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('lumina_theme')
        if (stored === 'bright' || stored === 'light') return 'bright'
        if (stored === 'dark') return 'dark'
      } catch {
        // ignore storage error
      }
    }
    return 'dark' // Dark is default existing color
  })

  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    if (theme === 'bright') {
      root.setAttribute('data-theme', 'bright')
      root.classList.add('bright', 'light')
      root.classList.remove('dark')
      body.setAttribute('data-theme', 'bright')
      body.classList.add('bright', 'light')
      body.classList.remove('dark')
    } else {
      root.setAttribute('data-theme', 'dark')
      root.classList.add('dark')
      root.classList.remove('bright', 'light')
      body.setAttribute('data-theme', 'dark')
      body.classList.add('dark')
      body.classList.remove('bright', 'light')
    }

    try {
      localStorage.setItem('lumina_theme', theme)
    } catch {
      // ignore storage error
    }
  }, [theme])

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'bright' : 'dark'))
  }

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
