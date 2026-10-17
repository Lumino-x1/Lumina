import React, { useState } from 'react'
import { Search, Menu, X } from 'lucide-react'
import { ThemeToggle } from './components/ThemeToggle'
import './Navbar.css'

export interface NavbarProps {
  onOpenAuth?: (mode: 'login' | 'signup') => void
  user?: { name?: string; email?: string } | null
  onOpenDashboard?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  user,
  onOpenDashboard,
}) => {
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isLoggedIn = Boolean(user && (user.email || user.name || (user as any).id))

  const handleActionClick = () => {
    setMobileMenuOpen(false)
    if (isLoggedIn) {
      if (onOpenDashboard) onOpenDashboard()
      else window.location.hash = 'dashboard'
    } else {
      if (onOpenAuth) onOpenAuth('signup')
      else window.location.hash = 'signup'
    }
  }

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="saascn-nav-section" aria-label="Top Navigation">
      <div className="saascn-nav-frame">
        {/* Left: Lumina Logo & Navigation Links */}
        <div className="saascn-nav-left">
          <a href="#home" className="saascn-nav-logo" onClick={handleNavClick}>
            Lumina
          </a>

          <nav className="saascn-nav-links" aria-label="Main Navigation">
            <a href="#about" className="saascn-nav-item">About</a>
            <a href="#features" className="saascn-nav-item">Features</a>
            <a href="#communities" className="saascn-nav-item">Communities</a>
            <a href="#careers" className="saascn-nav-item">Careers</a>
            <a href="#blog" className="saascn-nav-item">Blog</a>
          </nav>
        </div>

        {/* Right: Search Bar, Theme Toggle, & Action Button */}
        <div className="saascn-nav-right">
          <div className={`saascn-search-pill ${searchFocused ? 'is-focused' : ''}`}>
            <Search className="w-3.5 h-3.5 saascn-search-icon" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="saascn-search-input"
              aria-label="Search"
            />
            <div className="saascn-shortcut-badge" aria-hidden="true">
              <span className="saascn-key">⌘</span>
              <span className="saascn-key">K</span>
            </div>
          </div>

          {/* Theme Toggle (Bright Pure White/Black vs Existing Dark) */}
          <ThemeToggle />

          {/* Dashboard / Get Started Button (Desktop only) */}
          <button
            type="button"
            className="saascn-nav-dash-link saascn-desktop-only"
            onClick={handleActionClick}
          >
            {isLoggedIn ? 'Dashboard' : 'Get started'}
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className="saascn-mobile-menu-btn"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Menu className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Boundary Crosshair Markers (+) on the dividing bottom line */}
        <span className="crosshair-marker crosshair-bottom-left" aria-hidden="true">+</span>
        <span className="crosshair-marker crosshair-bottom-right" aria-hidden="true">+</span>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="saascn-mobile-menu-dropdown" role="dialog" aria-modal="true">
          <div className="saascn-mobile-search-wrap">
            <Search className="w-4 h-4 saascn-mobile-search-icon" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search Lumina..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="saascn-mobile-search-input"
              aria-label="Search topics or pages"
            />
          </div>

          <nav className="saascn-mobile-nav-links" aria-label="Mobile Navigation">
            <a href="#about" className="saascn-mobile-nav-item" onClick={handleNavClick}>About</a>
            <a href="#features" className="saascn-mobile-nav-item" onClick={handleNavClick}>Features</a>
            <a href="#communities" className="saascn-mobile-nav-item" onClick={handleNavClick}>Communities</a>
            <a href="#careers" className="saascn-mobile-nav-item" onClick={handleNavClick}>Careers</a>
            <a href="#blog" className="saascn-mobile-nav-item" onClick={handleNavClick}>Blog</a>
          </nav>

          <div className="saascn-mobile-actions">
            {isLoggedIn ? (
              <button
                type="button"
                className="saascn-mobile-dash-btn"
                onClick={handleActionClick}
              >
                Go to Dashboard
              </button>
            ) : (
              <div className="saascn-mobile-auth-actions">
                <button
                  type="button"
                  className="saascn-mobile-dash-btn"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    if (onOpenAuth) onOpenAuth('signup')
                    else window.location.hash = 'signup'
                  }}
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  className="saascn-mobile-dash-btn saascn-mobile-dash-btn-secondary"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    if (onOpenAuth) onOpenAuth('login')
                    else window.location.hash = 'login'
                  }}
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
