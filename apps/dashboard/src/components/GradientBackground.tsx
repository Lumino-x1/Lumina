import React, { useRef, useEffect } from 'react'

export interface NoiseProps {
  patternSize?: number
  patternScaleX?: number
  patternScaleY?: number
  patternRefreshInterval?: number
  patternAlpha?: number
  intensity?: number
}

// Noise component integrated into the background
export function Noise({
  patternSize = 100,
  patternScaleX = 1, // How much to scale the noise pattern tiling horizontally
  patternScaleY = 1, // How much to scale the noise pattern tiling vertically
  patternRefreshInterval = 1,
  patternAlpha = 50,
  intensity = 1,
}: NoiseProps) {
  const grainRef = useRef<HTMLCanvasElement | null>(null)
  // Ref to store the CSS dimensions of the canvas to avoid repeated getBoundingClientRect in loop
  const canvasCssSizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 })

  useEffect(() => {
    const canvas = grainRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      console.error('Failed to get 2D context for noise canvas.')
      return
    }

    let frame = 0
    const patternCanvas = document.createElement('canvas')
    patternCanvas.width = patternSize
    patternCanvas.height = patternSize

    const patternCtx = patternCanvas.getContext('2d')
    if (!patternCtx) {
      console.error('Failed to get 2D context for pattern sub-canvas.')
      return
    }
    const patternData = patternCtx.createImageData(patternSize, patternSize)
    const patternPixelDataLength = patternSize * patternSize * 4 // 4 for R, G, B, A

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      let newCssWidth = window.innerWidth // Fallback
      let newCssHeight = window.innerHeight // Fallback

      if (canvas.parentElement) {
        const parentRect = canvas.parentElement.getBoundingClientRect()
        newCssWidth = parentRect.width
        newCssHeight = parentRect.height
      }

      canvasCssSizeRef.current = { width: newCssWidth, height: newCssHeight }

      canvas.width = newCssWidth * dpr
      canvas.height = newCssHeight * dpr

      // Set the transformation matrix to account for DPR.
      // This allows drawing commands to use CSS pixel units.
      // Subsequent ctx.scale for pattern will be relative to this.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const updatePattern = () => {
      for (let i = 0; i < patternPixelDataLength; i += 4) {
        const value = Math.random() * 255 * intensity
        patternData.data[i] = value
        patternData.data[i + 1] = value
        patternData.data[i + 2] = value
        patternData.data[i + 3] = patternAlpha
      }
      patternCtx.putImageData(patternData, 0, 0)
    }

    const drawGrain = () => {
      const { width: cssWidth, height: cssHeight } = canvasCssSizeRef.current
      if (cssWidth === 0 || cssHeight === 0) return // Don't draw if canvas has no dimensions

      // Clear using CSS pixel dimensions (context is already scaled by DPR)
      ctx.clearRect(0, 0, cssWidth, cssHeight)

      ctx.save()

      // Scale the context for tiling the pattern.
      // This affects how the pattern is repeated.
      // Using Math.max to prevent division by zero if scale is 0.
      const safePatternScaleX = Math.max(0.001, patternScaleX)
      const safePatternScaleY = Math.max(0.001, patternScaleY)
      ctx.scale(safePatternScaleX, safePatternScaleY)

      const fillPattern = ctx.createPattern(patternCanvas, 'repeat')
      if (fillPattern) {
        ctx.fillStyle = fillPattern
        // Fill a rectangle that, in the *scaled* coordinate system,
        // corresponds to the original cssWidth/cssHeight.
        ctx.fillRect(0, 0, cssWidth / safePatternScaleX, cssHeight / safePatternScaleY)
      }

      ctx.restore()
    }

    let animationFrameId: number
    const loop = () => {
      // Only update and draw if dimensions are valid
      if (canvasCssSizeRef.current.width > 0 && canvasCssSizeRef.current.height > 0) {
        if (frame % patternRefreshInterval === 0) {
          updatePattern()
          drawGrain()
        }
      }
      frame++
      animationFrameId = window.requestAnimationFrame(loop)
    }

    window.addEventListener('resize', resize)
    resize() // Initial setup: size canvas and draw first frame if needed
    if (patternRefreshInterval > 0) {
      // Start loop only if refresh is meaningful
      loop()
    } else {
      // if refresh interval is 0 or less, draw once
      updatePattern()
      drawGrain()
    }

    return () => {
      window.removeEventListener('resize', resize)
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId)
      }
    }
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha, intensity])

  return <canvas className="absolute inset-0 w-full h-full pointer-events-none" ref={grainRef} />
}

export interface ColorStop {
  color: string
  stop: string
}

export interface GradientBackgroundProps {
  gradientType?: 'radial-gradient' | 'linear-gradient' | 'conic-gradient' | string
  gradientSize?: string
  gradientOrigin?: string
  colors?: ColorStop[]
  enableNoise?: boolean
  noisePatternSize?: number
  noisePatternScaleX?: number
  noisePatternScaleY?: number
  noisePatternRefreshInterval?: number
  noisePatternAlpha?: number
  noiseIntensity?: number
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  customGradient?: string | null
}

// Main gradient background component
export function GradientBackground({
  // Gradient customization
  gradientType = 'radial-gradient',
  gradientSize = '125% 125%',
  gradientOrigin = 'bottom-middle',
  colors = [
    { color: 'rgba(247,243,235,0.08)', stop: '10.5%' },
    { color: 'rgba(247,243,235,0.06)', stop: '16%' },
    { color: 'rgba(247,243,235,0.04)', stop: '25%' },
    { color: 'rgba(255,255,255,0.03)', stop: '40%' },
    { color: 'rgba(25,25,25,0.02)', stop: '65%' },
    { color: 'rgba(25,25,25,0.05)', stop: '100%' },
  ],

  // Noise customization
  enableNoise = true,
  noisePatternSize = 100,
  noisePatternScaleX = 1,
  noisePatternScaleY = 1,
  noisePatternRefreshInterval = 1,
  noisePatternAlpha = 50,
  noiseIntensity = 1,

  // Additional styling
  className = '',
  style = {},
  children,

  // Custom gradient string (overrides other gradient props if provided)
  customGradient = null,
}: GradientBackgroundProps) {
  // Generate gradient string from colors array
  const generateGradient = () => {
    if (customGradient) return customGradient

    const getGradientPosition = (origin: string) => {
      const positions: Record<string, string> = {
        'bottom-middle': '50% 101%',
        'bottom-left': '0% 101%',
        'bottom-right': '100% 101%',
        'top-middle': '50% -1%',
        'top-left': '0% -1%',
        'top-right': '100% -1%',
        'left-middle': '-1% 50%',
        'right-middle': '101% 50%',
        center: '50% 50%',
      }
      return positions[origin] || positions['bottom-middle']
    }

    const position = getGradientPosition(gradientOrigin)
    const colorStops = colors.map(({ color, stop }) => `${color} ${stop}`).join(',')

    if (gradientType === 'radial-gradient') {
      return `radial-gradient(${gradientSize} at ${position},${colorStops})`
    } else if (gradientType === 'linear-gradient') {
      const angleMap: Record<string, string> = {
        'bottom-middle': '0deg', // to top
        'bottom-left': '45deg', // to top-right
        'bottom-right': '315deg', // to top-left
        'top-middle': '180deg', // to bottom
        'top-left': '135deg', // to bottom-right
        'top-right': '225deg', // to bottom-left
        'left-middle': '90deg', // to right
        'right-middle': '270deg', // to left
        center: '0deg', // Default for center, though linear usually implies direction
      }
      const angle = angleMap[gradientOrigin] || angleMap['bottom-middle']
      return `linear-gradient(${angle},${colorStops})`
    } else if (gradientType === 'conic-gradient') {
      // Conic gradients usually need a 'from <angle>' and 'at <position>'
      // For simplicity, we'll use the position and a default 'from' angle.
      return `conic-gradient(from 0deg at ${position},${colorStops})`
    }

    // Fallback for unknown gradient types or simple color stop list
    return `${gradientType}(${colorStops})`
  }

  const gradientStyle: React.CSSProperties = {
    background: generateGradient(),
    ...style,
  }

  return (
    <div
      className={`absolute inset-0 w-full h-full ${className}`}
      style={gradientStyle}
    >
      {enableNoise && (
        <Noise
          patternSize={noisePatternSize}
          patternScaleX={noisePatternScaleX}
          patternScaleY={noisePatternScaleY}
          patternRefreshInterval={noisePatternRefreshInterval}
          patternAlpha={noisePatternAlpha}
          intensity={noiseIntensity}
        />
      )}
      {children}
    </div>
  )
}

export default GradientBackground
