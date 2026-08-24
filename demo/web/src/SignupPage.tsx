import monsteraImg from './assets/chris-lee-70l1tDAI6rM-unsplash 2.png'
import React, { useState } from 'react'

import './SignupPage.css'

interface SignupPageProps {
  onBackToHome: () => void
  onGoToLogin?: () => void
}

export default function SignupPage({ onBackToHome, onGoToLogin }: SignupPageProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/auth/sign-up/email', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, rememberMe: true }),
      })
      const data = (await response.json()) as { message?: string }

      if (!response.ok) {
        throw new Error(data.message ?? 'Unable to create your account.')
      }

      onGoToLogin?.()
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'Unable to create your account.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="signup-container">
      {/* Back to home floating nav */}
      <button
        className="signup-back-btn"
        onClick={onBackToHome}
        aria-label="Back to Home"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line
            x1="19"
            y1="12"
            x2="5"
            y2="12"
          ></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Back to Home</span>
      </button>

      {/* Left Column: Form */}
      <div className="signup-left-col">
        <div className="signup-form-wrapper">
          <h1 className="signup-title">Get Started Now</h1>

          <form
            onSubmit={handleSubmit}
            className="signup-form"
          >
            <div className="form-group">
              <label htmlFor="signup-name">Name</label>
              <input
                id="signup-name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-email">Email address</label>
              <input
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                placeholder="Name"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-checkbox-group">
              <input
                id="terms-checkbox"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
              />
              <label htmlFor="terms-checkbox">
                I agree to the{' '}
                <a
                  href="#terms"
                  className="terms-link"
                >
                  terms & policy
                </a>
              </label>
            </div>

            {error && (
              <p
                className="signup-error"
                role="alert"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="signup-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating account...' : 'Signup'}
            </button>
          </form>

          <div className="signup-divider">
            <span className="divider-line"></span>
            <span className="divider-text">Or</span>
            <span className="divider-line"></span>
          </div>

          <div className="social-signin-row">
            <button
              type="button"
              className="social-btn google-btn"
            >
              <svg
                className="social-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>

            <button
              type="button"
              className="social-btn apple-btn"
            >
              <svg
                className="social-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.12-1.96.99-3.1-.97.04-2.15.65-2.84 1.45-.61.71-1.15 1.87-1.01 2.99 1.09.08 2.2-.52 2.86-1.34z" />
              </svg>
              <span>Sign in with Apple</span>
            </button>
          </div>

          <p className="signup-footer-text">
            Have an account?{' '}
            <button
              type="button"
              className="signin-link-btn"
              onClick={onGoToLogin || onBackToHome}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>

      {/* Right Column: Plant Image Container */}
      <div className="signup-right-col">
        <div className="signup-image-card">
          <img
            src={monsteraImg}
            alt="Monstera Plant"
            className="signup-monstera-img"
          />
        </div>
      </div>
    </div>
  )
}
