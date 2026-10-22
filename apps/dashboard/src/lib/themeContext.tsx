import React, { createContext, useContext, useEffect, useState } from 'react'

export type ThemeMode = 'dark'

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
  const [theme] = useState<ThemeMode>('dark')
  const isDark = true

  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    root.setAttribute('data-theme', 'dark')
    root.classList.add('dark')
    root.classList.remove('light', 'bright')

    body.setAttribute('data-theme', 'dark')
    body.classList.add('dark')
    body.classList.remove('light', 'bright')

    try {
      localStorage.setItem('lumina_theme', 'dark')
    } catch {
      // ignore storage error
    }
  }, [])

  const toggleTheme = () => {
    // Permanently dark theme only - toggle disabled per user request
  }

  const setTheme = () => {
    // Permanently dark theme only - light theme removed
  }

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
