import React, { useState, useEffect, useRef } from 'react'
import { Check, Mail, ArrowLeft, AlertCircle } from 'lucide-react'
import {
  verifyOtpApi,
  resendOtpApi,
  getSessionApi,
  updateProfileApi,
} from './api/authApi'
import './VerifyEmailPage.css'

export interface VerifyEmailPageProps {
  initialEmail?: string
  onSuccess?: (user: any) => void
  onBackToLogin?: () => void
  onBackToRegister?: () => void
}

export const VerifyEmailPage: React.FC<VerifyEmailPageProps> = ({
  initialEmail = '',
  onSuccess,
  onBackToLogin,
  onBackToRegister,
}) => {
  const [email, setEmail] = useState<string>(() => {
    if (initialEmail) return initialEmail
    if (typeof window !== 'undefined') {
      try {
        const pending = localStorage.getItem('lumina_pending_verification_email')
        if (pending) return pending
        const storedUser = localStorage.getItem('lumina_user')
        if (storedUser) {
          const parsed = JSON.parse(storedUser)
          if (parsed?.email) return parsed.email
        }
      } catch {
        // ignore storage read error
      }
    }
    return ''
  })

  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(!email)
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', ''])
  const [loading, setLoading] = useState<boolean>(false)
  const [resending, setResending] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [cooldownSeconds, setCooldownSeconds] = useState<number>(0)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldownSeconds <= 0) return
    const timer = setInterval(() => {
      setCooldownSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [cooldownSeconds])

  // Focus first input on mount
  useEffect(() => {
    if (!isEditingEmail && inputRefs.current[0]) {
      inputRefs.current[0]?.focus()
    }
  }, [isEditingEmail])

  const handleDigitChange = (index: number, value: string) => {
    setErrorMessage(null)
    setSuccessMessage(null)

    // Handle multi-character paste/autofill in single box
    const cleanDigits = value.replace(/\D/g, '')
    if (cleanDigits.length > 1) {
      const newOtp = [...otpDigits]
      for (let i = 0; i < cleanDigits.length && index + i < 6; i++) {
        newOtp[index + i] = cleanDigits[i] || ''
      }
      setOtpDigits(newOtp)
      const nextIndex = Math.min(index + cleanDigits.length, 5)
      inputRefs.current[nextIndex]?.focus()
      return
    }

    const digit = cleanDigits.slice(-1)
    const newOtp = [...otpDigits]
    newOtp[index] = digit
    setOtpDigits(newOtp)

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otpDigits[index] && index > 0) {
        const newOtp = [...otpDigits]
        newOtp[index - 1] = ''
        setOtpDigits(newOtp)
        inputRefs.current[index - 1]?.focus()
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    setErrorMessage(null)
    const pastedText = e.clipboardData.getData('text/plain')
    const digits = pastedText.replace(/\D/g, '').slice(0, 6)
    if (!digits) return

    const newOtp = [...otpDigits]
    for (let i = 0; i < 6; i++) {
      newOtp[i] = digits[i] || ''
    }
    setOtpDigits(newOtp)

    const focusIdx = Math.min(digits.length, 5)
    inputRefs.current[focusIdx]?.focus()
  }

  const handleVerifySubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setErrorMessage(null)
    setSuccessMessage(null)

    const cleanEmail = email.trim().toLowerCase()
    if (!cleanEmail) {
      setErrorMessage('Please enter your registered email address.')
      setIsEditingEmail(true)
      return
    }

    const code = otpDigits.join('')
    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      setErrorMessage('Please enter the complete 6-digit verification code.')
      return
    }

    setLoading(true)

    try {
      const { data, error, code: errCode } = await verifyOtpApi({
        email: cleanEmail,
        otp: code,
      })

      if (error) {
        setErrorMessage(error)
        setLoading(false)
        if (errCode === 'TOO_MANY_ATTEMPTS' || errCode === 'OTP_EXPIRED') {
          setOtpDigits(['', '', '', '', '', ''])
          inputRefs.current[0]?.focus()
        }
        return
      }

      setSuccessMessage('Email verified successfully! Preparing your dashboard...')

      // Sync any onboarding profile that was queued during registration
      try {
        const onboardingProfileStr = localStorage.getItem('lumina_onboarding_profile')
        if (onboardingProfileStr) {
          const profileData = JSON.parse(onboardingProfileStr)
          await updateProfileApi(profileData)
          localStorage.removeItem('lumina_onboarding_profile')
        }
      } catch {
        // ignore profile sync error
      }

      // Refresh authoritative session
      const session = await getSessionApi()
      const verifiedUser = session?.user || data?.user || { email: cleanEmail, emailVerified: true }

      try {
        localStorage.removeItem('lumina_pending_verification_email')
        const storedUser = localStorage.getItem('lumina_user')
        const current = storedUser ? JSON.parse(storedUser) : {}
        localStorage.setItem(
          'lumina_user',
          JSON.stringify({ ...current, ...verifiedUser, emailVerified: true })
        )
      } catch {
        // ignore storage error
      }

      setTimeout(() => {
        setLoading(false)
        if (onSuccess) {
          onSuccess(verifiedUser)
        } else {
          window.location.hash = 'feed'
        }
      }, 700)
    } catch (err: any) {
      setErrorMessage(err?.message || 'Verification failed. Please try again.')
      setLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (cooldownSeconds > 0 || resending || loading) return
    setErrorMessage(null)
    setSuccessMessage(null)

    const cleanEmail = email.trim().toLowerCase()
    if (!cleanEmail) {
      setErrorMessage('Please enter your email address to receive a new code.')
      setIsEditingEmail(true)
      return
    }

    setResending(true)

    try {
      const { data, error, retryAfter } = await resendOtpApi({ email: cleanEmail })

      if (error) {
        setErrorMessage(error)
        if (retryAfter && retryAfter > 0) {
          setCooldownSeconds(retryAfter)
        }
        setResending(false)
        return
      }

      setSuccessMessage(data?.message || 'Verification code sent.')
      setCooldownSeconds(60)
      setOtpDigits(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to resend code. Please try again.')
    } finally {
      setResending(false)
    }
  }

  const isCodeComplete = otpDigits.join('').length === 6

  return (
    <div className="verify-email-page-root">
      <div className="verify-email-container">
        <span className="crosshair-marker crosshair-top-left">+</span>
        <span className="crosshair-marker crosshair-top-right">+</span>
        <span className="crosshair-marker crosshair-bottom-left">+</span>
        <span className="crosshair-marker crosshair-bottom-right">+</span>
        <div className="verify-email-header">
          <div className="verify-email-brand">Lumina</div>
          <div className="verify-email-icon-wrapper">
            <Mail size={24} />
          </div>
          <h1 className="verify-email-title">Verify your email</h1>
          <p className="verify-email-description">
            We've sent a 6-digit verification code to your email address.
          </p>

          {!isEditingEmail && email ? (
            <div className="verify-email-address-row">
              <span>{email}</span>
              <button
                type="button"
                className="verify-email-change-btn"
                onClick={() => setIsEditingEmail(true)}
              >
                Change
              </button>
            </div>
          ) : null}
        </div>

        {errorMessage && (
          <div className="verify-email-alert error">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="verify-email-alert success">
            <Check size={16} />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleVerifySubmit}>
          {isEditingEmail && (
            <div style={{ marginBottom: 16 }}>
              <label
                htmlFor="verify-email-input"
                style={{ display: 'block', fontSize: 13, color: '#A1A1AA', marginBottom: 6 }}
              >
                Account Email
              </label>
              <input
                id="verify-email-input"
                type="email"
                className="verify-email-email-input"
                placeholder="name@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          )}

          <div className="verify-email-input-group">
            <div className="verify-email-otp-boxes">
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  className={`verify-email-otp-digit ${digit ? 'has-value' : ''}`}
                  value={digit}
                  disabled={loading}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  autoComplete="one-time-code"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="verify-email-submit-btn"
            disabled={!isCodeComplete || loading || !email.trim()}
          >
            {loading ? (
              <>
                <div className="verify-email-spinner" />
                <span>Verifying code...</span>
              </>
            ) : (
              <span>Verify email</span>
            )}
          </button>
        </form>

        <div className="verify-email-resend-row">
          <span>Didn't receive the code?</span>
          <button
            type="button"
            className="verify-email-resend-btn"
            disabled={cooldownSeconds > 0 || resending || loading}
            onClick={handleResendCode}
          >
            {resending ? (
              'Sending...'
            ) : cooldownSeconds > 0 ? (
              `Resend code in ${cooldownSeconds}s`
            ) : (
              'Resend code'
            )}
          </button>
        </div>

        <div className="verify-email-back-row">
          <button
            type="button"
            className="verify-email-back-btn"
            onClick={() => {
              if (onBackToRegister) {
                onBackToRegister()
              } else if (onBackToLogin) {
                onBackToLogin()
              } else {
                window.location.hash = 'login'
              }
            }}
          >
            <ArrowLeft size={14} />
            <span>Back to sign in</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmailPage
