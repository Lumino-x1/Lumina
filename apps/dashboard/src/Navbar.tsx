import React, { useState } from 'react'
import { Search } from 'lucide-react'
import './Navbar.css'

export interface NavbarProps {
  onOpenAuth?: (mode: 'login' | 'signup') => void
  user?: { name?: string; email?: string } | null
  onOpenDashboard?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth: _onOpenAuth,
  user: _user,
  onOpenDashboard,
}) => {
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  return (
    <header className="saascn-nav-section" aria-label="Top Navigation">
      <div className="saascn-nav-frame">
        {/* Left: Lumina Logo & Navigation Links */}
        <div className="saascn-nav-left">
          <a href="#home" className="saascn-nav-logo">
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

        {/* Right: Search Bar & Dashboard Button */}
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

          {/* Dashboard Button */}
          <button
            type="button"
            className="saascn-nav-dash-link"
            onClick={() => {
              if (onOpenDashboard) onOpenDashboard()
              else window.location.hash = 'dashboard'
            }}
          >
            Dashboard
          </button>
        </div>

        {/* Boundary Crosshair Markers (+) on the dividing bottom line */}
        <span className="crosshair-marker crosshair-bottom-left" aria-hidden="true">+</span>
        <span className="crosshair-marker crosshair-bottom-right" aria-hidden="true">+</span>
      </div>
    </header>
  )
}

export default Navbar
