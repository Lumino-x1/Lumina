import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Measuring cache for textarea inputs (like Title)
let mirrorDiv: HTMLDivElement | null = null

const TEXTAREA_STYLE_PROPERTIES = [
  'direction',
  'boxSizing',
  'width',
  'height',
  'overflowX',
  'overflowY',
  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderStyle',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'fontStretch',
  'fontSize',
  'lineHeight',
  'fontFamily',
  'textAlign',
  'textTransform',
  'letterSpacing',
  'wordSpacing',
]

function getTextareaCaret(
  element: HTMLTextAreaElement | HTMLInputElement,
  position: number
): { x: number; y: number; height: number } | null {
  if (typeof document === 'undefined') return null

  if (!mirrorDiv) {
    mirrorDiv = document.createElement('div')
    mirrorDiv.id = 'smooth-caret-textarea-mirror'
    document.body.appendChild(mirrorDiv)
  }

  const style = mirrorDiv.style
  const computed = window.getComputedStyle(element)

  style.whiteSpace = 'pre-wrap'
  if (element.nodeName !== 'INPUT') {
    style.wordWrap = 'break-word'
  }
  style.position = 'absolute'
  style.visibility = 'hidden'
  style.pointerEvents = 'none'
  style.top = '0'
  style.left = '-9999px'

  TEXTAREA_STYLE_PROPERTIES.forEach((prop) => {
    // @ts-ignore
    style[prop] = computed[prop]
  })

  mirrorDiv.textContent = element.value.substring(0, position)

  const span = document.createElement('span')
  span.textContent = element.value.substring(position) || '.'
  mirrorDiv.appendChild(span)

  const elemRect = element.getBoundingClientRect()
  const spanRect = span.getBoundingClientRect()
  const mirrorRect = mirrorDiv.getBoundingClientRect()

  const x = elemRect.left + (spanRect.left - mirrorRect.left) - element.scrollLeft
  const y = elemRect.top + (spanRect.top - mirrorRect.top) - element.scrollTop
  const height = Math.max(16, spanRect.height || parseFloat(computed.lineHeight) || 28)

  return { x, y, height }
}

function getContentEditableCaret(): { x: number; y: number; height: number } | null {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0 || !selection.isCollapsed) return null

  try {
    const range = selection.getRangeAt(0)
    const rects = range.getClientRects()
    if (rects.length > 0) {
      const r = rects[0]
      if (r.width > 0 || r.height > 0) {
        return { x: r.left, y: r.top, height: Math.max(18, r.height) }
      }
    }

    const r = range.getBoundingClientRect()
    if (r.height > 0) {
      return { x: r.left, y: r.top, height: Math.max(18, r.height) }
    }

    // Fallback if at the start of an empty block
    const node = selection.anchorNode
    const elem = node instanceof HTMLElement ? node : node?.parentElement
    if (elem) {
      const rect = elem.getBoundingClientRect()
      const style = window.getComputedStyle(elem)
      const pl = parseFloat(style.paddingLeft) || 0
      const pt = parseFloat(style.paddingTop) || 0
      const fs = parseFloat(style.fontSize) || 19
      return { x: rect.left + pl, y: rect.top + pt, height: Math.round(fs * 1.25) }
    }
  } catch {
    return null
  }

  return null
}

function getCanvasCaret(): { x: number; y: number; height: number } | null {
  const activeEl = document.activeElement
  if (!activeEl) return null

  // Verify focus is within editor canvas
  const isInsideCanvas =
    activeEl.closest('.lumina-canvas-viewport') ||
    activeEl.classList.contains('notion-title-input') ||
    activeEl.classList.contains('lumina-paragraph')

  if (!isInsideCanvas) return null

  // If the action bar / plus menu is open on any block, do not show the cursor
  const isAnyActionBarOpen =
    activeEl.closest('.lumina-block-wrapper.is-bar-open') ||
    activeEl.closest('.lumina-block-wrapper')?.querySelector('.medium-action-bar-container.is-open') ||
    document.querySelector('.medium-action-bar-container.is-open') ||
    document.querySelector('.lumina-block-wrapper.is-bar-open')

  if (isAnyActionBarOpen) return null

  // 1. Textarea / Input (Title)
  if (activeEl instanceof HTMLTextAreaElement || activeEl instanceof HTMLInputElement) {
    const start = activeEl.selectionStart ?? 0
    const end = activeEl.selectionEnd ?? 0
    if (start !== end) return null // Hide when text is highlighted
    return getTextareaCaret(activeEl, start)
  }

  // 2. ContentEditable (Paragraph, Heading, Blockquote, etc.)
  if (activeEl.getAttribute('contenteditable') === 'true' || (activeEl as HTMLElement).isContentEditable) {
    // Inside code snippet area: use normal native typing animation/caret, not the fancy spring caret
    if (
      activeEl.closest('.lumina-code-block-wrap') ||
      activeEl.closest('.lumina-code-pre') ||
      activeEl.tagName === 'CODE'
    ) {
      return null
    }

    return getContentEditableCaret()
  }

  return null
}

export const SmoothCanvasCaret: React.FC = () => {
  const caretX = useMotionValue(-100)
  const caretY = useMotionValue(-100)
  const caretHeight = useMotionValue(24)
  const caretOpacity = useMotionValue(0)

  const [isVisible, setIsVisible] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)
  const blinkTimerRef = useRef<any>(null)
  const hasInitialized = useRef(false)

  // Spring physics from Skiper / SmoothInput: stiffness 500, damping 30, mass 0.5
  const springX = useSpring(caretX, {
    stiffness: 500,
    damping: 30,
    mass: 0.5,
  })

  const springY = useSpring(caretY, {
    stiffness: 500,
    damping: 30,
    mass: 0.5,
  })

  const springHeight = useSpring(caretHeight, {
    stiffness: 600,
    damping: 35,
    mass: 0.5,
  })

  const wakeCaret = () => {
    setIsBlinking(false)
    caretOpacity.set(1)

    if (blinkTimerRef.current) {
      clearTimeout(blinkTimerRef.current)
    }

    // Start idle blink after 600ms of inactivity
    blinkTimerRef.current = setTimeout(() => {
      setIsBlinking(true)
    }, 600)
  }

  const updateCaret = () => {
    const coords = getCanvasCaret()

    if (!coords) {
      setIsVisible(false)
      setIsBlinking(false)
      caretOpacity.set(0)
      if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current)
      return
    }

    setIsVisible(true)
    caretX.set(coords.x)
    caretY.set(coords.y)
    caretHeight.set(coords.height)
    if (!hasInitialized.current) {
      hasInitialized.current = true
    }

    wakeCaret()
  }

  useEffect(() => {
    const handleEvent = () => {
      requestAnimationFrame(updateCaret)
    }

    document.addEventListener('selectionchange', handleEvent)
    document.addEventListener('input', handleEvent)
    document.addEventListener('keydown', handleEvent)
    document.addEventListener('keyup', handleEvent)
    document.addEventListener('pointerup', handleEvent)
    document.addEventListener('pointerdown', handleEvent)
    document.addEventListener('click', handleEvent)
    window.addEventListener('resize', handleEvent)
    window.addEventListener('scroll', handleEvent, true)

    return () => {
      document.removeEventListener('selectionchange', handleEvent)
      document.removeEventListener('input', handleEvent)
      document.removeEventListener('keydown', handleEvent)
      document.removeEventListener('keyup', handleEvent)
      document.removeEventListener('pointerup', handleEvent)
      document.removeEventListener('pointerdown', handleEvent)
      document.removeEventListener('click', handleEvent)
      window.removeEventListener('resize', handleEvent)
      window.removeEventListener('scroll', handleEvent, true)
      if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current)
    }
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className={`lumina-smooth-caret ${isBlinking ? 'is-blinking' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x: springX,
        y: springY,
        height: springHeight,
        opacity: caretOpacity,
        pointerEvents: 'none',
        zIndex: 9998,
      }}
    />
  )
}
