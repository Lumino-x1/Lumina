'use client'

import React, { useState } from 'react'
import {
  initiateGoogleAuth,
  initiateSocialAuth,
  signInApi,
  signUpApi,
} from '@/api/authApi'
import DotGrid from '@/components/ui/dot-grid'
import { GrainGradient } from '@paper-design/shaders-react'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Globe,
  MapPin,
  X,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { useTheme } from './lib/themeContext'
import './AuthPage.css'

class ShaderErrorBoundary extends React.Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  override componentDidCatch(error: any) {
    console.warn('Shader render fallback:', error)
  }
  override render() {
    if (this.state.hasError) {
      return this.props.fallback || null
    }
    return this.props.children
  }
}

export interface AuthPageProps {
  initialMode?: 'login' | 'signup'
  onBack?: () => void
  onSuccess?: (user: any) => void
  onRequireVerification?: (email: string) => void
}

const INTERESTS_LIST = [
  'Technology',
  'AI & Machine Learning',
  'Programming',
  'Startups',
  'Business',
  'Design',
  'Science',
  'Finance',
  'Career',
  'Research',
  'Entertainment',
  'Sports',
  'Photography',
  'Music',
]

const YEAR_OPTIONS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
  'Postgraduate',
]

const SKILL_SUGGESTIONS = [
  'React',
  'Python',
  'Java',
  'Figma',
  'Data Science',
  'TypeScript',
  'Next.js',
  'C++',
  'UI/UX',
  'Machine Learning',
]


const DEPARTMENT_SUGGESTIONS = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electrical & Electronics Engineering',
  'Mechanical Engineering',
  'Data Science & Artificial Intelligence',
  'Business Administration',
  'Biotechnology',
]

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'login',
  onBack,
  onSuccess,
  onRequireVerification,
}) => {
  const { isDark } = useTheme()
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode)
  const [signupStep, setSignupStep] = useState<1 | 2 | 3 | 4>(1)

  const [prevInitialMode, setPrevInitialMode] = useState(initialMode)
  if (prevInitialMode !== initialMode) {
    setPrevInitialMode(initialMode)
    setMode(initialMode)
  }

  // Login credentials
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showLoginPassword, setShowLoginPassword] = useState(false)

  // Step 1: About you
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [showSignupPassword, setShowSignupPassword] = useState(false)

  // Step 2: Academics
  const [department, setDepartment] = useState('')
  const [year, setYear] = useState('')

  // Step 3: Personalize Lumina
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [currentSkillInput, setCurrentSkillInput] = useState('')

  // Step 4: Your profile
  const [bio, setBio] = useState('')
  const [leetcodeUrl, setLeetcodeUrl] = useState('')
  const [github, setGithub] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [portfolio, setPortfolio] = useState('')
  const [location, setLocation] = useState('')

  // UI state
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const switchMode = (newMode: 'login' | 'signup') => {
    setMode(newMode)
    setSignupStep(1)
    setErrorMessage(null)
    setSuccessMessage(null)
    window.location.hash = newMode
  }

  // Handle Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setSuccessMessage(null)

    if (!loginEmail.trim() || !loginPassword) {
      setErrorMessage('Please enter both your email and password.')
      return
    }

    setLoading(true)

    try {
      const { data, error } = await signInApi({
        email: loginEmail.trim().toLowerCase(),
        password: loginPassword,
      })

      if (error) {
        setErrorMessage(error)
        setLoading(false)
        return
      }

      setSuccessMessage('Signed in successfully!')
      setLoading(false)

      if (data?.user && data.user.emailVerified === false) {
        try {
          localStorage.setItem('lumina_pending_verification_email', loginEmail.trim().toLowerCase())
        } catch {
          // ignore
        }
        if (onRequireVerification) {
          onRequireVerification(loginEmail.trim().toLowerCase())
        } else {
          window.location.hash = 'verify-email'
        }
        return
      }

      if (onSuccess && data?.user) {
        onSuccess(data.user)
      } else {
        window.location.hash = 'dashboard'
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Login failed. Please try again.')
      setLoading(false)
    }
  }

  // Handle Interest Toggle
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest))
    } else {
      setSelectedInterests([...selectedInterests, interest])
    }
  }

  // Handle Skills
  const addSkill = (skill: string) => {
    const trimmed = skill.trim()
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed])
      setCurrentSkillInput('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove))
  }

  // Step validation
  const validateStep1 = () => {
    if (!firstName.trim()) {
      setErrorMessage("Please enter your first name.")
      return false
    }
    if (!signupEmail.trim() || !signupEmail.includes('@')) {
      setErrorMessage("Please enter a valid university email address.")
      return false
    }
    if (signupPassword.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.")
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (!department.trim()) {
      setErrorMessage("Please enter your department.")
      return false
    }
    if (!year) {
      setErrorMessage("Please select your current year of study.")
      return false
    }
    return true
  }

  const validateStep3 = () => {
    if (selectedInterests.length < 3) {
      setErrorMessage("Please select at least 3 interests.")
      return false
    }
    return true
  }

  const nextStep = () => {
    setErrorMessage(null)
    if (signupStep === 1 && !validateStep1()) return
    if (signupStep === 2 && !validateStep2()) return
    if (signupStep === 3 && !validateStep3()) return

    if (signupStep < 4) {
      setSignupStep((prev) => (prev + 1) as any)
    }
  }

  const prevStep = () => {
    setErrorMessage(null)
    if (signupStep > 1) {
      setSignupStep((prev) => (prev - 1) as any)
    } else {
      switchMode('login')
    }
  }

  // Final Registration Submission
  const handleFinalSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setSuccessMessage(null)

    if (!validateStep1() || !validateStep2() || !validateStep3()) {
      return
    }

    setLoading(true)

    try {
      const fullName = `${firstName.trim()} ${lastName.trim()}`.trim() || firstName.trim()

      // 1. Create user account
      const { data, error } = await signUpApi({
        name: fullName,
        email: signupEmail.trim().toLowerCase(),
        password: signupPassword,
      })

      if (error) {
        setErrorMessage(error)
        setLoading(false)
        return
      }

      // Convert year text to year integer (e.g. "1st Year" -> 1)
      const yearNum = year.includes('1')
        ? 1
        : year.includes('2')
          ? 2
          : year.includes('3')
            ? 3
            : year.includes('4')
              ? 4
              : 5

      const profilePayload = {
        userId: data?.user?.id,
        email: signupEmail.trim().toLowerCase(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        department: department.trim(),
        year: yearNum,
        interests: selectedInterests,
        skills,
        bio: bio.trim() || undefined,
        leetcodeUrl: leetcodeUrl.trim() || undefined,
        github: github.trim() || undefined,
        linkedin: linkedin.trim() || undefined,
        portfolio: portfolio.trim() || undefined,
        location: location.trim() || undefined,
      }

      // Persist onboarding profile and pending verification email for post-verification completion
      try {
        localStorage.setItem('lumina_pending_verification_email', signupEmail.trim().toLowerCase())
        localStorage.setItem('lumina_onboarding_profile', JSON.stringify(profilePayload))
      } catch {
        // ignore
      }

      setSuccessMessage('Account created! Please check your email for your 6-digit verification code.')
      setLoading(false)

      setTimeout(() => {
        if (onRequireVerification) {
          onRequireVerification(signupEmail.trim().toLowerCase())
        } else {
          window.location.hash = 'verify-email'
        }
      }, 500)
    } catch (err: any) {
      setErrorMessage(err?.message || 'Registration failed. Please try again.')
      setLoading(false)
    }
  }

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      window.location.hash = ''
    }
  }

  return (
    <div className={`lumina-split-root ${!isDark ? 'light bright' : 'dark'}`} data-theme={!isDark ? 'light' : 'dark'}>
      {/* ====================================================================
          LEFT PANE: AUTH & ONBOARDING FLOW (WITH DOT GRID BACKGROUND)
         ==================================================================== */}
      <div className="lumina-split-left">
        {/* DotGrid background strictly confined to left pane */}
        <DotGrid theme={!isDark ? 'light' : 'dark'} spacing={20} />

        {/* Top: Back Navigation & Step Badge */}
        <div className="lumina-auth-top-bar">
          <button
            type="button"
            onClick={handleBack}
            className="lumina-auth-back-btn"
            aria-label="Back to website"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to website</span>
          </button>

          {mode === 'signup' && (
            <span className="lumina-auth-step-badge">
              Step {signupStep} of 4
            </span>
          )}
        </div>

        {/* Centered Form Wrapper */}
        <div className="lumina-auth-form-wrap">
          {/* Header */}
          <div className="lumina-auth-header">
            <h1 className="lumina-auth-title">
              {mode === 'login' ? 'Sign In' : 'Create an account'}
            </h1>

            {mode === 'signup' && (
              <div className="lumina-progress-track">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`lumina-progress-bar ${
                      step === signupStep
                        ? 'active'
                        : step < signupStep
                          ? 'completed'
                          : ''
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Card Container with Architectural Dashed Lines & Corner Crosshairs */}
          <div className="lumina-auth-card">
            {/* Corner Crosshairs (+) matching landing page */}
            <span className="crosshair-marker crosshair-top-left" aria-hidden="true">+</span>
            <span className="crosshair-marker crosshair-top-right" aria-hidden="true">+</span>
            <span className="crosshair-marker crosshair-bottom-left" aria-hidden="true">+</span>
            <span className="crosshair-marker crosshair-bottom-right" aria-hidden="true">+</span>

            {/* Segmented Mode Switch Tabs: Sign In / Sign Up */}
            <div className="lumina-auth-mode-tabs" role="tablist" aria-label="Sign in or Sign up">
              <button
                type="button"
                role="tab"
                id="lumina-tab-login"
                aria-selected={mode === 'login'}
                className={`lumina-auth-mode-tab ${mode === 'login' ? 'active' : ''}`}
                onClick={() => switchMode('login')}
              >
                Sign In
              </button>
              <button
                type="button"
                role="tab"
                id="lumina-tab-signup"
                aria-selected={mode === 'signup'}
                className={`lumina-auth-mode-tab ${mode === 'signup' ? 'active' : ''}`}
                onClick={() => switchMode('signup')}
              >
                Sign Up
              </button>
            </div>

            {errorMessage && (
              <div className="lumina-auth-alert lumina-auth-alert-error" role="alert">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="lumina-auth-alert lumina-auth-alert-success" role="status">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>{successMessage}</span>
              </div>
            )}

            {/* ==========================================================
                LOGIN FORM
               ========================================================== */}
            {mode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="lumina-auth-form">
                <div className="lumina-auth-field">
                  <label className="lumina-auth-label" htmlFor="login-email">
                    Email
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    className="lumina-auth-input"
                    placeholder="Email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    disabled={loading}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="lumina-auth-field">
                  <label className="lumina-auth-label" htmlFor="login-password">
                    Password
                  </label>
                  <div className="lumina-auth-password-wrap">
                    <input
                      id="login-password"
                      type={showLoginPassword ? 'text' : 'password'}
                      className="lumina-auth-input"
                      placeholder="Password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      disabled={loading}
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="lumina-auth-password-toggle"
                      onClick={() => setShowLoginPassword((prev) => !prev)}
                      aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                      tabIndex={-1}
                    >
                      {showLoginPassword ? (
                        <EyeOff className="lumina-auth-eye-icon" />
                      ) : (
                        <Eye className="lumina-auth-eye-icon" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="lumina-auth-btn-row">
                  <button
                    type="button"
                    className="lumina-auth-secondary-btn"
                    onClick={() => switchMode('signup')}
                  >
                    Create account
                  </button>
                  <button
                    type="submit"
                    className="lumina-auth-submit-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="lumina-auth-spinner" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ChevronRight className="size-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Hairline Divider */}
                <div className="lumina-auth-divider">
                  <span className="lumina-auth-divider-line" />
                  <span className="lumina-auth-divider-text">Or continue with</span>
                  <span className="lumina-auth-divider-line" />
                </div>

                {/* Social Login */}
                <div className="lumina-auth-social-stack">
                  <button
                    type="button"
                    className="lumina-auth-social-btn"
                    onClick={initiateGoogleAuth}
                  >
                    <GoogleIcon />
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    className="lumina-auth-social-btn"
                    onClick={() => initiateSocialAuth('facebook')}
                  >
                    <FacebookIcon />
                    <span>Facebook</span>
                  </button>

                  <button
                    type="button"
                    className="lumina-auth-social-btn"
                    onClick={() => initiateSocialAuth('github')}
                  >
                    <GitHubIcon />
                    <span>GitHub</span>
                  </button>
                </div>
              </form>
            ) : (
              /* ==========================================================
                 SIGNUP MULTI-STEP ONBOARDING FORM
                 ========================================================== */
              <div className="lumina-auth-form">
                {/* STEP 1: ABOUT YOU */}
                {signupStep === 1 && (
                  <>
                    <div className="lumina-auth-field-grid">
                      <div>
                        <label className="lumina-auth-label" htmlFor="first-name">
                          First name *
                        </label>
                        <input
                          id="first-name"
                          type="text"
                          className="lumina-auth-input"
                          placeholder="Alex"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="lumina-auth-label" htmlFor="last-name">
                          Last name <span className="lumina-auth-label-opt">(optional)</span>
                        </label>
                        <input
                          id="last-name"
                          type="text"
                          className="lumina-auth-input"
                          placeholder="Chen"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Credentials */}
                    <div className="lumina-auth-field">
                      <label className="lumina-auth-label" htmlFor="signup-email">
                        University email *
                      </label>
                      <input
                        id="signup-email"
                        type="email"
                        className="lumina-auth-input"
                        placeholder="alex@university.edu"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                        autoComplete="email"
                      />
                    </div>

                    <div className="lumina-auth-field">
                      <label className="lumina-auth-label" htmlFor="signup-password">
                        Password *
                      </label>
                      <div className="lumina-auth-password-wrap">
                        <input
                          id="signup-password"
                          type={showSignupPassword ? 'text' : 'password'}
                          className="lumina-auth-input"
                          placeholder="At least 8 characters"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          minLength={8}
                          required
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          className="lumina-auth-password-toggle"
                          onClick={() => setShowSignupPassword((prev) => !prev)}
                          aria-label={showSignupPassword ? 'Hide password' : 'Show password'}
                          tabIndex={-1}
                        >
                          {showSignupPassword ? (
                            <EyeOff className="lumina-auth-eye-icon" />
                          ) : (
                            <Eye className="lumina-auth-eye-icon" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="lumina-auth-btn-row">
                      <button
                        type="button"
                        className="lumina-auth-secondary-btn"
                        onClick={() => switchMode('login')}
                      >
                        Sign in instead
                      </button>
                      <button
                        type="button"
                        className="lumina-auth-submit-btn"
                        onClick={nextStep}
                      >
                        <span>Continue</span>
                        <ChevronRight className="size-4" />
                      </button>
                    </div>
                  </>
                )}

                {/* STEP 2: ACADEMICS */}
                {signupStep === 2 && (
                  <>

                    <div className="lumina-auth-field">
                      <label className="lumina-auth-label" htmlFor="dept-name">
                        Department *
                      </label>
                      <input
                        id="dept-name"
                        type="text"
                        className="lumina-auth-input"
                        placeholder="e.g. Computer Science"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        list="dept-list"
                        required
                      />
                      <datalist id="dept-list">
                        {DEPARTMENT_SUGGESTIONS.map((d) => (
                          <option key={d} value={d} />
                        ))}
                      </datalist>
                    </div>

                    <div className="lumina-auth-field">
                      <label className="lumina-auth-label">
                        Year of study *
                      </label>
                      <div className="lumina-year-pills">
                        {YEAR_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            className={`lumina-year-pill-btn ${year === opt ? 'active' : ''}`}
                            onClick={() => setYear(opt)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="lumina-auth-btn-row">
                      <button
                        type="button"
                        className="lumina-auth-secondary-btn"
                        onClick={prevStep}
                      >
                        <ChevronLeft className="size-4" />
                        <span>Back</span>
                      </button>
                      <button
                        type="button"
                        className="lumina-auth-submit-btn"
                        onClick={nextStep}
                      >
                        <span>Continue</span>
                        <ChevronRight className="size-4" />
                      </button>
                    </div>
                  </>
                )}

                {/* STEP 3: PERSONALIZE LUMINA */}
                {signupStep === 3 && (
                  <>
                    <div className="lumina-auth-field">
                      <div className="lumina-chip-indicator">
                        <label className="lumina-auth-label" style={{ margin: 0 }}>
                          Interests *
                        </label>
                        <span className={selectedInterests.length >= 3 ? 'valid' : ''}>
                          {selectedInterests.length}/3 minimum selected
                        </span>
                      </div>
                      <span className="lumina-auth-label-hint">
                        Select at least 3 topics to personalize your campus feed:
                      </span>
                      <div className="lumina-chips-container" style={{ marginTop: '10px' }}>
                        {INTERESTS_LIST.map((interest) => {
                          const isSelected = selectedInterests.includes(interest)
                          return (
                            <button
                              key={interest}
                              type="button"
                              className={`lumina-chip-btn ${isSelected ? 'selected' : ''}`}
                              onClick={() => toggleInterest(interest)}
                            >
                              {isSelected && <Check className="size-3" />}
                              <span>{interest}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="lumina-auth-field">
                      <label className="lumina-auth-label" htmlFor="skills-input">
                        Skills <span className="lumina-auth-label-opt">(optional)</span>
                      </label>
                      <input
                        id="skills-input"
                        type="text"
                        className="lumina-auth-input"
                        placeholder="e.g. React, Python, Figma (Press Enter)"
                        value={currentSkillInput}
                        onChange={(e) => setCurrentSkillInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            addSkill(currentSkillInput)
                          }
                        }}
                      />

                      {skills.length > 0 && (
                        <div className="lumina-skills-tags-wrap">
                          {skills.map((s) => (
                            <span key={s} className="lumina-skill-tag">
                              <span>{s}</span>
                              <button
                                type="button"
                                className="lumina-skill-tag-remove"
                                onClick={() => removeSkill(s)}
                                aria-label={`Remove ${s}`}
                              >
                                <X className="size-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="lumina-skills-suggestions">
                        {SKILL_SUGGESTIONS.filter((s) => !skills.includes(s)).slice(0, 5).map((s) => (
                          <button
                            key={s}
                            type="button"
                            className="lumina-skill-suggestion-btn"
                            onClick={() => addSkill(s)}
                          >
                            + {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="lumina-auth-btn-row">
                      <button
                        type="button"
                        className="lumina-auth-secondary-btn"
                        onClick={prevStep}
                      >
                        <ChevronLeft className="size-4" />
                        <span>Back</span>
                      </button>
                      <button
                        type="button"
                        className="lumina-auth-submit-btn"
                        onClick={nextStep}
                      >
                        <span>Continue</span>
                        <ChevronRight className="size-4" />
                      </button>
                    </div>
                  </>
                )}

                {/* STEP 4: YOUR PROFILE (FINAL ONBOARDING SCREEN) */}
                {signupStep === 4 && (
                  <form onSubmit={handleFinalSignup}>
                    <div className="lumina-auth-field">
                      <label className="lumina-auth-label" htmlFor="user-bio">
                        About you <span className="lumina-auth-label-opt">(optional)</span>
                      </label>
                      <textarea
                        id="user-bio"
                        className="lumina-auth-textarea"
                        placeholder="Brief introduction, your passions, or your campus journey..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        maxLength={300}
                      />
                    </div>

                    <div className="lumina-auth-field">
                      <label className="lumina-auth-label" htmlFor="leetcode-url">
                        LeetCode URL <span className="lumina-auth-label-opt">(optional)</span>
                      </label>
                      <div className="lumina-auth-input-prefix-wrap">
                        <span className="lumina-auth-input-prefix" style={{ fontSize: '11px', left: '10px' }}>lc/</span>
                        <input
                          id="leetcode-url"
                          type="text"
                          className="lumina-auth-input has-prefix"
                          placeholder="https://leetcode.com/username or username"
                          value={leetcodeUrl}
                          onChange={(e) => setLeetcodeUrl(e.target.value)}
                          maxLength={200}
                        />
                      </div>
                    </div>

                    {/* Social & Profile Links */}
                    <div className="lumina-auth-field-grid">
                      <div>
                        <label className="lumina-auth-label" htmlFor="user-github">
                          GitHub <span className="lumina-auth-label-opt">(optional)</span>
                        </label>
                        <div className="lumina-auth-input-prefix-wrap">
                          <span className="lumina-auth-input-prefix" style={{ fontSize: '11px', left: '10px' }}>gh/</span>
                          <input
                            id="user-github"
                            type="text"
                            className="lumina-auth-input has-prefix"
                            placeholder="username"
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                            style={{ paddingLeft: '38px' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="lumina-auth-label" htmlFor="user-linkedin">
                          LinkedIn <span className="lumina-auth-label-opt">(optional)</span>
                        </label>
                        <div className="lumina-auth-input-prefix-wrap">
                          <span className="lumina-auth-input-prefix" style={{ fontSize: '11px', left: '10px' }}>in/</span>
                          <input
                            id="user-linkedin"
                            type="text"
                            className="lumina-auth-input has-prefix"
                            placeholder="username"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            style={{ paddingLeft: '36px' }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="lumina-auth-field-grid">
                      <div>
                        <label className="lumina-auth-label" htmlFor="user-portfolio">
                          Portfolio / Website <span className="lumina-auth-label-opt">(optional)</span>
                        </label>
                        <div className="lumina-auth-input-prefix-wrap">
                          <Globe className="size-3.5 lumina-auth-input-prefix text-zinc-500" style={{ top: '15px', left: '12px' }} />
                          <input
                            id="user-portfolio"
                            type="url"
                            className="lumina-auth-input has-prefix"
                            placeholder="https://yourwebsite.com"
                            value={portfolio}
                            onChange={(e) => setPortfolio(e.target.value)}
                            style={{ paddingLeft: '34px' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="lumina-auth-label" htmlFor="user-location">
                          Location <span className="lumina-auth-label-opt">(optional)</span>
                        </label>
                        <div className="lumina-auth-input-prefix-wrap">
                          <MapPin className="size-3.5 lumina-auth-input-prefix text-zinc-500" style={{ top: '15px', left: '12px' }} />
                          <input
                            id="user-location"
                            type="text"
                            className="lumina-auth-input has-prefix"
                            placeholder="e.g. San Francisco, CA"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            style={{ paddingLeft: '34px' }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="lumina-auth-btn-row" style={{ marginTop: '16px' }}>
                      <button
                        type="button"
                        className="lumina-auth-secondary-btn"
                        onClick={prevStep}
                        disabled={loading}
                      >
                        <ChevronLeft className="size-4" />
                        <span>Back</span>
                      </button>
                      <button
                        type="submit"
                        className="lumina-auth-submit-btn"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="lumina-auth-spinner" />
                            <span>Completing setup...</span>
                          </>
                        ) : (
                          <>
                            <span>Complete & Join Lumina</span>
                            <ChevronRight className="size-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Footer toggle */}
          <div className="lumina-auth-footer">
            {mode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  className="lumina-auth-switch-btn"
                  onClick={() => switchMode('signup')}
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  className="lumina-auth-switch-btn"
                  onClick={() => switchMode('login')}
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Spacer */}
        <div className="lumina-auth-bottom-spacer" />
      </div>

      {/* ====================================================================
          RIGHT PANE: GrainGradient Orange Shader Showcase
         ==================================================================== */}
      <div className="lumina-split-right">
        <ShaderErrorBoundary>
          <GrainGradient
            speed={1}
            scale={1}
            rotation={0}
            offsetX={0}
            offsetY={0}
            softness={0.5}
            intensity={0.5}
            noise={0.25}
            shape="corners"
            frame={2854.5}
            colors={
              !isDark
                ? ['#FFFFFF', '#C15F3C', '#C15F3C', '#F4F3EE']
                : ['#FFFFFF', '#C15F3C', '#C15F3C', '#FFFFFF']
            }
            colorBack={!isDark ? '#F4F3EE' : '#000000'}
            className="absolute inset-0 w-full h-full"
          />
        </ShaderErrorBoundary>

        <div className="lumina-split-right-content">
          <h2 className="lumina-split-heading">
            Think fast,
            <br />
            Build faster
          </h2>
        </div>
      </div>
    </div>
  )
}

export default AuthPage

/* Google G Logo Icon */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
        fill="#EB4335"
      />
    </svg>
  )
}

/* Facebook Official Icon */
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

/* GitHub Official Icon */
function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  )
}
