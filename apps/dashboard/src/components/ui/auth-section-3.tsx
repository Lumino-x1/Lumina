'use client'
import AuthPage, { type AuthPageProps } from '@/AuthPage'

export type AuthSectionThreeProps = AuthPageProps

export default function AuthSectionThree(props: AuthSectionThreeProps) {
  return <AuthPage {...props} />
}
