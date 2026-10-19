/**
 * @lumina/design-system - Centralized Semantic Design Tokens
 * Premium Black + White + Blue Design System
 */

export type ThemeMode = 'light' | 'dark'

export interface DesignTokens {
  background: string
  foreground: string
  surface: string
  surfaceSecondary: string
  surfaceTertiary: string
  card: string
  cardForeground: string
  primary: string
  primaryHover: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  muted: string
  mutedForeground: string
  border: string
  borderStrong: string
  input: string
  inputBorder: string
  inputFocus: string
  link: string
  linkHover: string
  ring: string
  popover: string
  popoverForeground: string
  sidebarBackground: string
  sidebarForeground: string
  sidebarBorder: string
  sidebarActive: string
  sidebarActiveForeground: string
  overlay: string
  destructive: string
  destructiveForeground: string
  success: string
  successForeground: string
  warning: string
  warningForeground: string
  info: string
  infoForeground: string
  badge: string
  badgeForeground: string
  skeleton: string
  scrollbarTrack: string
  scrollbarThumb: string
}

export const lightTokens: DesignTokens = {
  background: '#FFFFFF',
  foreground: '#111111',
  surface: '#FFFFFF',
  surfaceSecondary: '#F7F8FA',
  surfaceTertiary: '#F0F2F5',
  card: '#FFFFFF',
  cardForeground: '#111111',
  primary: '#2563EB',
  primaryHover: '#1D4ED8',
  primaryForeground: '#FFFFFF',
  secondary: '#F3F4F6',
  secondaryForeground: '#111827',
  muted: '#F3F4F6',
  mutedForeground: '#6B7280',
  border: '#E5E7EB',
  borderStrong: '#D1D5DB',
  input: '#FFFFFF',
  inputBorder: '#D1D5DB',
  inputFocus: '#2563EB',
  link: '#2563EB',
  linkHover: '#1D4ED8',
  ring: '#2563EB',
  popover: '#FFFFFF',
  popoverForeground: '#111111',
  sidebarBackground: '#FFFFFF',
  sidebarForeground: '#111111',
  sidebarBorder: '#E5E7EB',
  sidebarActive: '#EFF6FF',
  sidebarActiveForeground: '#1D4ED8',
  overlay: 'rgba(0, 0, 0, 0.45)',
  destructive: '#EF4444',
  destructiveForeground: '#FFFFFF',
  success: '#10B981',
  successForeground: '#FFFFFF',
  warning: '#F59E0B',
  warningForeground: '#FFFFFF',
  info: '#2563EB',
  infoForeground: '#FFFFFF',
  badge: '#EFF6FF',
  badgeForeground: '#1D4ED8',
  skeleton: '#E5E7EB',
  scrollbarTrack: 'transparent',
  scrollbarThumb: '#D1D5DB',
}

export const darkTokens: DesignTokens = {
  background: '#09090B',
  foreground: '#FAFAFA',
  surface: '#111113',
  surfaceSecondary: '#18181B',
  surfaceTertiary: '#222225',
  card: '#111113',
  cardForeground: '#FAFAFA',
  primary: '#60A5FA',
  primaryHover: '#93C5FD',
  primaryForeground: '#0B1220',
  secondary: '#202024',
  secondaryForeground: '#F4F4F5',
  muted: '#18181B',
  mutedForeground: '#A1A1AA',
  border: '#27272A',
  borderStrong: '#3F3F46',
  input: '#111113',
  inputBorder: '#3F3F46',
  inputFocus: '#60A5FA',
  link: '#60A5FA',
  linkHover: '#93C5FD',
  ring: '#60A5FA',
  popover: '#18181B',
  popoverForeground: '#FAFAFA',
  sidebarBackground: '#09090B',
  sidebarForeground: '#FAFAFA',
  sidebarBorder: '#27272A',
  sidebarActive: '#172554',
  sidebarActiveForeground: '#93C5FD',
  overlay: 'rgba(0, 0, 0, 0.70)',
  destructive: '#F87171',
  destructiveForeground: '#450A0A',
  success: '#34D399',
  successForeground: '#022C22',
  warning: '#FBBF24',
  warningForeground: '#451A03',
  info: '#60A5FA',
  infoForeground: '#0B1220',
  badge: 'rgba(96, 165, 250, 0.15)',
  badgeForeground: '#93C5FD',
  skeleton: '#27272A',
  scrollbarTrack: 'transparent',
  scrollbarThumb: '#3F3F46',
}

export const tokens = {
  light: lightTokens,
  dark: darkTokens,
} as const
