import React from 'react'
import './Footer.css'

interface FooterLink {
  label: string
  href?: string
  isNew?: boolean
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

const TOP_COLUMNS: FooterColumn[] = [
  {
    title: 'Agent Stack',
    links: [
      { label: 'AI SDK' },
      { label: 'AI Gateway' },
      { label: 'Sandbox' },
      { label: 'Workflows' },
      { label: 'Connect', isNew: true },
      { label: 'Passport', isNew: true },
      { label: 'eve', isNew: true },
    ],
  },
  {
    title: 'Core Platform',
    links: [
      { label: 'CI/CD' },
      { label: 'Content Delivery' },
      { label: 'Fluid Compute' },
      { label: 'Observability' },
    ],
  },
  {
    title: 'Security',
    links: [
      { label: 'Platform Security' },
      { label: 'WAF' },
      { label: 'Bot Management' },
      { label: 'BotID' },
    ],
  },
  {
    title: 'Tools',
    links: [
      { label: 'Vercel Drop', isNew: true },
      { label: 'Vercel Agent' },
      { label: 'Vercel Plugin', isNew: true },
      { label: 'Agent Skills' },
      { label: 'Domains' },
      { label: 'v0' },
    ],
  },
  {
    title: 'Frameworks',
    links: [
      { label: 'eve', isNew: true },
      { label: 'Next.js' },
      { label: 'Nuxt' },
      { label: 'SvelteKit' },
      { label: 'Nitro' },
      { label: 'Turborepo' },
      { label: 'TanStack Start' },
      { label: 'FastAPI' },
      { label: 'All frameworks' },
    ],
  },
  {
    title: 'SDKs',
    links: [
      { label: 'Vercel SDK' },
      { label: 'Workflow SDK', isNew: true },
      { label: 'Flags SDK' },
      { label: 'Chat SDK', isNew: true },
      { label: 'Queues SDK', isNew: true },
      { label: 'Streamdown' },
    ],
  },
]

const BOTTOM_COLUMNS: FooterColumn[] = [
  {
    title: 'Build',
    links: [
      { label: 'AI Apps' },
      { label: 'Web Apps' },
      { label: 'Marketing Sites' },
      { label: 'Platforms' },
      { label: 'Commerce' },
      { label: 'Platform Engineers' },
      { label: 'Design Engineers' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Docs' },
      { label: 'Blog' },
      { label: 'Changelog' },
      { label: 'Knowledge Base' },
      { label: 'Academy' },
      { label: 'Articles' },
      { label: 'Community' },
      { label: 'Is Agentic' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Customers' },
      { label: 'Marketplace' },
      { label: 'Templates' },
      { label: 'Partner Finder' },
      { label: 'Vercel + AWS' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About' },
      { label: 'Careers' },
      { label: 'Press' },
      { label: 'Events' },
      { label: 'Startups' },
      { label: 'Shipped on Vercel' },
      { label: 'Open Source Program' },
      { label: 'Enterprise' },
      { label: 'Pricing' },
      { label: 'Help' },
    ],
  },
  {
    title: 'Legal & Trust',
    links: [
      { label: 'Privacy Policy' },
      { label: 'Terms of Service' },
      { label: 'Cookie Policy' },
      { label: 'DPA' },
      { label: 'Acceptable Use Policy' },
      { label: 'Legal (all documents)' },
      { label: 'Trust Center' },
      { label: 'Status' },
    ],
  },
  {
    title: 'Social',
    links: [
      { label: 'GitHub' },
      { label: 'X' },
      { label: 'LinkedIn' },
      { label: 'YouTube' },
      { label: 'Instagram' },
    ],
  },
]

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer" aria-label="Site Footer">
      <div className="footer-container">
        {/* Links Grid: Row 1 */}
        <div className="footer-links-grid">
          {TOP_COLUMNS.map((col, idx) => (
            <div key={idx} className="footer-column">
              <h3 className="footer-col-title">{col.title}</h3>
              <ul className="footer-col-list">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx} className="footer-link-item">
                    <a href={link.href || '#'} className="footer-link">
                      <span>{link.label}</span>
                      {link.isNew && <span className="pill-badge-new">New</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Links Grid: Row 2 */}
        <div className="footer-links-grid footer-row-bottom">
          {BOTTOM_COLUMNS.map((col, idx) => (
            <div key={idx} className="footer-column">
              <h3 className="footer-col-title">{col.title}</h3>
              <ul className="footer-col-list">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx} className="footer-link-item">
                    <a href={link.href || '#'} className="footer-link">
                      <span>{link.label}</span>
                      {link.isNew && <span className="pill-badge-new">New</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Utility Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-status-block">
            {/* System Status Indicator */}
            <div className="system-status-indicator">
              <span className="status-live-dot" />
              <span className="status-text">All Systems Normal.</span>
            </div>
          </div>

          {/* Theme & Controls Toolbar */}
          <div className="footer-controls-toolbar" role="group" aria-label="Preferences">
            <button type="button" className="toolbar-btn" aria-label="System Theme" title="System preference">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </button>
            <button type="button" className="toolbar-btn" aria-label="Light Theme" title="Light theme">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </button>
            <button type="button" className="toolbar-btn" aria-label="Dark Theme" title="Dark theme">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
            <button type="button" className="toolbar-btn" aria-label="Shortcuts" title="Keyboard shortcuts">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10" />
              </svg>
            </button>
          </div>
        </div>

        {/* Giant Lumina Brand Wordmark in Gray Color (Granby style) */}
        <div className="footer-giant-wordmark-wrap" aria-hidden="true">
          <span className="footer-giant-wordmark">Lumina</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
