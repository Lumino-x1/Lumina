import React, { useState } from 'react'
import './AuthPage.css'

export interface AuthPageProps {
  initialMode?: 'login' | 'signup'
  onBack?: () => void
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login', onBack }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleGoogleAuth = () => {
    // Demo Google Auth trigger
    alert('Connecting with Google Account...')
  }

  return (
    <div className="auth-page-root" role="main">
      {/* Top Navigation Bar */}
      <header className="auth-header">
        <div className="auth-header-left">
          <a
            href="#"
            className="auth-brand-link"
            onClick={(e) => {
              e.preventDefault()
              if (onBack) onBack()
              else window.location.hash = ''
            }}
            aria-label="Back to Lumina Home"
          >
            <svg
              className="auth-lumina-logo"
              viewBox="0 0 88 64"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.2 38.6L20.8 13.2L27.6 17.1L13 42.5L6.2 38.6Z" />
              <path d="M18.4 47.8L37.2 9.4L44.4 13.6L25.6 52L18.4 47.8Z" />
              <path d="M32.8 54.4L54.6 5.8L62 10.2L40.2 58.8L32.8 54.4Z" />
              <path d="M48.2 59.6L69.8 11.4L77 15.6L55.4 63.8L48.2 59.6Z" />
            </svg>
            <span className="auth-brand-name">Lumina</span>
          </a>
        </div>

        <div className="auth-header-right">
          <button
            type="button"
            className="auth-back-btn"
            onClick={() => {
              if (onBack) onBack()
              else window.location.hash = ''
            }}
            aria-label="Back to website"
            title="Back to website"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Center Form */}
      <main className="auth-main-content">
        <div className="auth-card">
          {/* Header titles */}
          <div className="auth-card-head">
            <h1 className="auth-title">
              {mode === 'login' ? 'Welcome to Lumina' : 'Create your account'}
            </h1>
            <p className="auth-subtitle">
              {mode === 'login'
                ? 'Campus management and verified networks for students and faculty'
                : 'Connect with students, clubs, and opportunities across universities'}
            </p>
          </div>

          {/* Social Google Login Button */}
          <button
            type="button"
            className="auth-google-btn"
            onClick={handleGoogleAuth}
          >
            <svg className="google-icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Minimal Divider */}
          <div className="auth-divider">
            <span className="auth-divider-line" />
            <span className="auth-divider-text">or</span>
            <span className="auth-divider-line" />
          </div>

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="auth-field-group">
                <label className="auth-label" htmlFor="auth-name">
                  Full name
                </label>
                <input
                  id="auth-name"
                  type="text"
                  className="auth-input"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="auth-field-group">
              <label className="auth-label" htmlFor="auth-email">
                Email
              </label>
              <input
                id="auth-email"
                type="email"
                className="auth-input"
                placeholder="Type your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-field-group">
              <div className="auth-label-row">
                <label className="auth-label" htmlFor="auth-password">
                  Password
                </label>
                {mode === 'login' && (
                  <a href="#forgot" className="auth-forgot-link">
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="auth-input-wrapper">
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  className="auth-input with-toggle"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">
              {submitted ? (
                'Signed in'
              ) : mode === 'login' ? (
                'Continue with email'
              ) : (
                'Create account'
              )}
            </button>
          </form>

          {/* Toggle Login / Signup Mode */}
          <div className="auth-mode-toggle">
            {mode === 'login' ? (
              <p className="auth-toggle-text">
                Don't have an account?{' '}
                <button
                  type="button"
                  className="auth-toggle-btn"
                  onClick={() => {
                    setMode('signup')
                    window.location.hash = 'signup'
                  }}
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="auth-toggle-text">
                Already have an account?{' '}
                <button
                  type="button"
                  className="auth-toggle-btn"
                  onClick={() => {
                    setMode('login')
                    window.location.hash = 'login'
                  }}
                >
                  Log in
                </button>
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="auth-footer">
        <p className="auth-disclaimer">
          By clicking "Continue with Google" or "Continue with email",
          you agree to our <a href="#terms">Terms of Use</a> and{' '}
          <a href="#privacy">Privacy policy</a>.
        </p>
      </footer>
    </div>
  )
}

export default AuthPage
