import React from 'react'
import './AuthLoadingScreen.css'

export interface AuthLoadingScreenProps {
  message?: string
}

export const AuthLoadingScreen: React.FC<AuthLoadingScreenProps> = () => {
  return (
    <div className="lumina-auth-loading-root" role="status" aria-live="polite" aria-label="Loading">
      <div className="lumina-auth-loading-spinner" />
    </div>
  )
}

export default AuthLoadingScreen
