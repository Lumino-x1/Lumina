import React from 'react'
import { CinematicFooter } from './components/ui/motion-footer'

export interface FooterProps {
  onOpenAuth?: (mode: 'login' | 'signup') => void
}

export const Footer: React.FC<FooterProps> = () => {
  return <CinematicFooter />
}

export { CinematicFooter }
export default Footer
