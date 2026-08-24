import monsteraImg from './assets/chris-lee-70l1tDAI6rM-unsplash 2.png'
import React, { useState } from 'react'

import './LoginPage.css'

interface LoginPageProps {
  onBackToHome: () => void
  onGoToSignup: () => void
}

export default function LoginPage({ onBackToHome, onGoToSignup }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Welcome back! Logged in with ${email}`)
  }

  return (
    <div className="login-container">
      {/* Back to home floating nav */}
      <button
        className="login-back-btn"
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
      <div className="login-left-col">
        <div className="login-form-wrapper">
          <h1 className="login-title">Welcome back!</h1>
          <p className="login-subtitle">Enter your Credentials to access your account</p>

          <form
            onSubmit={handleSubmit}
            className="login-form"
          >
            <div className="form-group">
              <label htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <div className="label-with-link">
                <label htmlFor="login-password">Password</label>
                <a
                  href="#forgot"
                  className="forgot-password-link"
                  onClick={(e) => {
                    e.preventDefault()
                    alert('Password reset email sent.')
                  }}
                >
                  forgot password
                </a>
              </div>
              <input
                id="login-password"
                type="password"
                placeholder="Name"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-checkbox-group">
              <input
                id="remember-checkbox"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-checkbox">Remember for 30 days</label>
            </div>

            <button
              type="submit"
              className="login-submit-btn"
            >
              Login
            </button>
          </form>

          <div className="login-divider">
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

          <p className="login-footer-text">
            Don’t have an account?{' '}
            <button
              type="button"
              className="signup-link-btn"
              onClick={onGoToSignup}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>

      {/* Right Column: Plant Image Container */}
      <div className="login-right-col">
        <div className="login-image-card">
          <img
            src={monsteraImg}
            alt="Monstera Plant"
            className="login-monstera-img"
          />
        </div>
      </div>
    </div>
  )
}
