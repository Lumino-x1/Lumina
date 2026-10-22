/**
 * @lumina/design-system - Centralized Semantic Design Tokens
 * Notion-Inspired Black + White + Warm Cream Design System
 * 
 * Strict 3-Color Palette:
 * - Black: #191919
 * - White: #FFFFFF
 * - Warm Cream: #F7F3EB
 */

export const LUMINA_COLORS = {
  black: '#191919',
  white: '#FFFFFF',
  cream: '#F7F3EB',
} as const

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
  foreground: '#191919',
  surface: '#FFFFFF',
  surfaceSecondary: '#F7F3EB',
  surfaceTertiary: 'rgba(25, 25, 25, 0.04)',
  card: '#FFFFFF',
  cardForeground: '#191919',
  primary: '#191919',
  primaryHover: 'rgba(25, 25, 25, 0.85)',
  primaryForeground: '#FFFFFF',
  secondary: '#F7F3EB',
  secondaryForeground: '#191919',
  muted: '#F7F3EB',
  mutedForeground: 'rgba(25, 25, 25, 0.65)',
  border: 'rgba(25, 25, 25, 0.12)',
  borderStrong: 'rgba(25, 25, 25, 0.22)',
  input: '#FFFFFF',
  inputBorder: 'rgba(25, 25, 25, 0.16)',
  inputFocus: '#191919',
  link: '#191919',
  linkHover: 'rgba(25, 25, 25, 0.70)',
  ring: '#191919',
  popover: '#FFFFFF',
  popoverForeground: '#191919',
  sidebarBackground: '#FFFFFF',
  sidebarForeground: '#191919',
  sidebarBorder: 'rgba(25, 25, 25, 0.08)',
  sidebarActive: '#F7F3EB',
  sidebarActiveForeground: '#191919',
  overlay: 'rgba(25, 25, 25, 0.45)',
  destructive: '#191919',
  destructiveForeground: '#FFFFFF',
  success: '#191919',
  successForeground: '#FFFFFF',
  warning: '#191919',
  warningForeground: '#FFFFFF',
  info: '#191919',
  infoForeground: '#FFFFFF',
  badge: '#F7F3EB',
  badgeForeground: '#191919',
  skeleton: '#F7F3EB',
  scrollbarTrack: 'transparent',
  scrollbarThumb: 'rgba(25, 25, 25, 0.20)',
}

export const darkTokens: DesignTokens = {
  background: '#191919',
  foreground: '#FFFFFF',
  surface: '#191919',
  surfaceSecondary: 'rgba(247, 243, 235, 0.08)',
  surfaceTertiary: 'rgba(255, 255, 255, 0.04)',
  card: '#191919',
  cardForeground: '#FFFFFF',
  primary: '#FFFFFF',
  primaryHover: 'rgba(255, 255, 255, 0.88)',
  primaryForeground: '#191919',
  secondary: 'rgba(247, 243, 235, 0.12)',
  secondaryForeground: '#FFFFFF',
  muted: 'rgba(247, 243, 235, 0.08)',
  mutedForeground: 'rgba(255, 255, 255, 0.65)',
  border: 'rgba(255, 255, 255, 0.12)',
  borderStrong: 'rgba(255, 255, 255, 0.22)',
  input: '#191919',
  inputBorder: 'rgba(255, 255, 255, 0.16)',
  inputFocus: '#FFFFFF',
  link: '#FFFFFF',
  linkHover: 'rgba(255, 255, 255, 0.80)',
  ring: '#FFFFFF',
  popover: '#191919',
  popoverForeground: '#FFFFFF',
  sidebarBackground: '#191919',
  sidebarForeground: '#FFFFFF',
  sidebarBorder: 'rgba(255, 255, 255, 0.08)',
  sidebarActive: 'rgba(247, 243, 235, 0.12)',
  sidebarActiveForeground: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.75)',
  destructive: '#FFFFFF',
  destructiveForeground: '#191919',
  success: '#FFFFFF',
  successForeground: '#191919',
  warning: '#FFFFFF',
  warningForeground: '#191919',
  info: '#FFFFFF',
  infoForeground: '#191919',
  badge: 'rgba(247, 243, 235, 0.12)',
  badgeForeground: '#FFFFFF',
  skeleton: 'rgba(255, 255, 255, 0.08)',
  scrollbarTrack: 'transparent',
  scrollbarThumb: 'rgba(255, 255, 255, 0.20)',
}

export const tokens = {
  light: lightTokens,
  dark: darkTokens,
} as const
