import React, { useState, useRef } from 'react'
import './Navbar.css'

export interface NavbarProps {
  onOpenAuth?: (mode: 'login' | 'signup') => void
}

interface MegaMenuColumn {
  title: string
  links: {
    label: string
    href: string
    isExternal?: boolean
    badge?: string
  }[]
}

interface MegaMenuShelfItem {
  label: string
  href: string
  badge?: string
}

interface MegaMenuSection {
  columns: MegaMenuColumn[]
  shelf: MegaMenuShelfItem[]
}

const MEGA_MENU_DATA: Record<string, MegaMenuSection> = {
  products: {
    columns: [
      {
        title: 'Agent Stack',
        links: [
          { label: 'AI SDK', href: '#ai-sdk' },
          { label: 'AI Gateway', href: '#ai-gateway' },
          { label: 'Sandbox', href: '#sandbox' },
          { label: 'Passport', href: '#passport' },
          { label: 'Connect', href: '#connect' },
          { label: 'eve', href: '#eve' },
        ],
      },
      {
        title: 'Core Platform',
        links: [
          { label: 'Security', href: '#security' },
          { label: 'Content Delivery', href: '#content-delivery' },
          { label: 'Fluid Compute', href: '#fluid-compute' },
          { label: 'Observability', href: '#observability' },
          { label: 'Workflows', href: '#workflows' },
          { label: 'CI/CD', href: '#cicd' },
        ],
      },
      {
        title: 'Tools',
        links: [
          { label: 'Next.js', href: '#nextjs' },
          { label: 'Vercel Agent', href: '#vercel-agent' },
          { label: 'Vercel Plugin', href: '#vercel-plugin' },
          { label: 'Open Source', href: '#open-source' },
          { label: 'Domains', href: '#domains', isExternal: true },
          { label: 'v0', href: '#v0', isExternal: true },
        ],
      },
    ],
    shelf: [
      { label: 'Sandbox', href: '#sandbox' },
      { label: 'Fluid Compute', href: '#fluid-compute' },
      { label: 'Bot Management', href: '#bot-management' },
      { label: 'Vercel Plugin', href: '#vercel-plugin', badge: 'New' },
      { label: 'Nuxt', href: '#nuxt' },
      { label: 'Flags SDK', href: '#flags-sdk' },
      { label: 'Workflows', href: '#workflows' },
      { label: 'Observability', href: '#observability' },
      { label: 'BotID', href: '#botid' },
      { label: 'Agent Skills', href: '#agent-skills' },
      { label: 'SvelteKit', href: '#sveltekit' },
      { label: 'Chat SDK', href: '#chat-sdk', badge: 'New' },
    ],
  },
  resources: {
    columns: [
      {
        title: 'Learn',
        links: [
          { label: 'Docs', href: '#docs' },
          { label: 'Templates', href: '#templates' },
          { label: 'Guides', href: '#guides' },
          { label: 'Integrations', href: '#integrations' },
          { label: 'Customers', href: '#customers' },
          { label: 'Academy', href: '#academy' },
        ],
      },
      {
        title: 'Developers',
        links: [
          { label: 'Changelog', href: '#changelog' },
          { label: 'GitHub', href: '#github', isExternal: true },
          { label: 'Discord', href: '#discord', isExternal: true },
          { label: 'Events & Meetups', href: '#events' },
          { label: 'System Status', href: '#status' },
          { label: 'CLI Reference', href: '#cli' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About Lumina', href: '#about' },
          { label: 'Careers', href: '#careers', badge: 'Hiring' },
          { label: 'Blog', href: '#blog' },
          { label: 'Press & Media', href: '#press' },
          { label: 'Security & Trust', href: '#security-trust' },
          { label: 'Contact Sales', href: '#contact-sales' },
        ],
      },
    ],
    shelf: [
      { label: 'Documentation', href: '#docs' },
      { label: 'API Reference', href: '#api' },
      { label: 'Quickstart Guide', href: '#quickstart' },
      { label: 'Community Showcase', href: '#showcase' },
      { label: 'Release Notes', href: '#releases' },
      { label: 'Status Page', href: '#status' },
    ],
  },
  enterprise: {
    columns: [
      {
        title: 'Enterprise Platform',
        links: [
          { label: 'Enterprise Cloud', href: '#enterprise-cloud' },
          { label: 'Custom Campus SLA (99.99%)', href: '#sla' },
          { label: 'Dedicated Support', href: '#support' },
          { label: 'Advanced Identity & SSO', href: '#sso' },
        ],
      },
      {
        title: 'Security & Governance',
        links: [
          { label: 'FERPA & GDPR Compliance', href: '#compliance' },
          { label: 'SOC2 Type II Certified', href: '#soc2' },
          { label: 'Role-based Access Control', href: '#rbac' },
          { label: 'Audit Log Streams', href: '#audit-logs' },
        ],
      },
      {
        title: 'Get Started',
        links: [
          { label: 'Book an Enterprise Demo', href: '#demo', isExternal: true },
          { label: 'Talk to Campus Sales', href: '#sales', isExternal: true },
          { label: 'Security Whitepaper', href: '#whitepaper', isExternal: true },
        ],
      },
    ],
    shelf: [
      { label: 'Campus Enterprise', href: '#enterprise' },
      { label: 'Security Overview', href: '#security' },
      { label: 'Customer Stories', href: '#customers' },
      { label: 'Talk to an Expert', href: '#expert' },
    ],
  },
  pricing: {
    columns: [
      {
        title: 'Plans',
        links: [
          { label: 'Student Free', href: '#free' },
          { label: 'Campus Organization', href: '#org' },
          { label: 'University Wide', href: '#university' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Feature Matrix', href: '#features' },
          { label: 'Billing FAQ', href: '#faq' },
          { label: 'Education Grants', href: '#grants', isExternal: true },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'Contact Billing', href: '#contact-billing' },
          { label: 'Upgrade Guide', href: '#upgrade' },
        ],
      },
    ],
    shelf: [
      { label: 'Compare All Plans', href: '#pricing' },
      { label: 'Non-profit Discounts', href: '#discounts' },
      { label: 'Enterprise Quotes', href: '#quotes' },
    ],
  },
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleNavHover = (menuId: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setActiveDropdown(menuId)
  }

  const handleNavLeave = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 180)
  }

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
  }

  const handleNavClick = (menuId: string) => {
    setActiveDropdown((prev) => (prev === menuId ? null : menuId))
  }

  const currentMenu = activeDropdown ? MEGA_MENU_DATA[activeDropdown] : null

  return (
    <div
      className={`lumina-navbar-fixed ${activeDropdown ? 'has-megamenu' : ''}`}
      onMouseLeave={handleNavLeave}
    >
      <header className="lumina-nav-bar">
        <div className="lumina-nav-left">
          {/* Brand Lumina Logo */}
          <button
            type="button"
            className="lumina-nav-logo-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
          >
            <svg
              className="lumina-nav-logo"
              viewBox="0 0 88 64"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.2 38.6L20.8 13.2L27.6 17.1L13 42.5L6.2 38.6Z" />
              <path d="M18.4 47.8L37.2 9.4L44.4 13.6L25.6 52L18.4 47.8Z" />
              <path d="M32.8 54.4L54.6 5.8L62 10.2L40.2 58.8L32.8 54.4Z" />
              <path d="M48.2 59.6L69.8 11.4L77 15.6L55.4 63.8L48.2 59.6Z" />
            </svg>
          </button>

          {/* Navigation Links */}
          <nav className="lumina-nav-links" aria-label="Main Navigation">
            <button
              type="button"
              className={`lumina-nav-link-btn ${activeDropdown === 'products' ? 'is-active' : ''}`}
              onMouseEnter={() => handleNavHover('products')}
              onClick={() => handleNavClick('products')}
            >
              <span>Products</span>
              <svg className="lumina-chevron" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className={`lumina-nav-link-btn ${activeDropdown === 'resources' ? 'is-active' : ''}`}
              onMouseEnter={() => handleNavHover('resources')}
              onClick={() => handleNavClick('resources')}
            >
              <span>Resources</span>
              <svg className="lumina-chevron" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className={`lumina-nav-link-btn ${activeDropdown === 'enterprise' ? 'is-active' : ''}`}
              onMouseEnter={() => handleNavHover('enterprise')}
              onClick={() => handleNavClick('enterprise')}
            >
              <span>Enterprise</span>
            </button>
            <button
              type="button"
              className={`lumina-nav-link-btn ${activeDropdown === 'pricing' ? 'is-active' : ''}`}
              onMouseEnter={() => handleNavHover('pricing')}
              onClick={() => handleNavClick('pricing')}
            >
              <span>Pricing</span>
            </button>
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="lumina-nav-right">
          <button
            type="button"
            className="lumina-btn-demo"
            onClick={() => handleNavClick('enterprise')}
          >
            Get a Demo
          </button>
          <button
            type="button"
            className="lumina-btn-login"
            onClick={() => (onOpenAuth ? onOpenAuth('login') : (window.location.hash = 'login'))}
          >
            Log In
          </button>
          <button
            type="button"
            className="lumina-btn-signup"
            onClick={() => (onOpenAuth ? onOpenAuth('signup') : (window.location.hash = 'signup'))}
          >
            Sign Up
          </button>
          <button
            type="button"
            className="lumina-mobile-toggle"
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mega Menu Dropdown Panel */}
      <div
        className={`lumina-megamenu-panel ${activeDropdown ? 'is-open' : ''}`}
        onMouseEnter={handleDropdownEnter}
        onMouseLeave={handleNavLeave}
        aria-hidden={!activeDropdown}
      >
        {currentMenu && (
          <div className="lumina-megamenu-inner">
            <div className="lumina-megamenu-cols">
              {currentMenu.columns.map((col, cIdx) => (
                <div key={cIdx} className="lumina-megamenu-col">
                  <span className="lumina-col-title">{col.title}</span>
                  <ul className="lumina-col-list">
                    {col.links.map((link, lIdx) => (
                      <li key={lIdx} className="lumina-col-item">
                        <a href={link.href} className="lumina-menu-link">
                          <span>{link.label}</span>
                          {link.isExternal && <span className="lumina-menu-arrow" aria-hidden="true">↗</span>}
                          {link.badge && <span className="lumina-badge-new">{link.badge}</span>}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom Sub-shelf */}
            {currentMenu.shelf && currentMenu.shelf.length > 0 && (
              <div className="lumina-megamenu-shelf">
                {currentMenu.shelf.map((item, sIdx) => (
                  <a key={sIdx} href={item.href} className="lumina-shelf-item">
                    <span>{item.label}</span>
                    {item.badge && <span className="lumina-badge-new">{item.badge}</span>}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
