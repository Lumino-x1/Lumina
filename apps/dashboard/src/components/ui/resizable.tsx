import * as React from 'react'
import { cn } from '@/lib/utils'

interface ResizableContextType {
  direction: 'horizontal' | 'vertical'
  sizes: number[]
  setPanelSize: (index: number, newSize: number) => void
  registerPanel: (index: number, defaultSize: number, minSize?: number, maxSize?: number) => void
  startDragging: (handleIndex: number, e: React.MouseEvent | React.TouchEvent) => void
}

const ResizableContext = React.createContext<ResizableContextType | null>(null)

export interface ResizablePanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical'
  children: React.ReactNode
}

export function ResizablePanelGroup({
  direction = 'horizontal',
  className,
  children,
  ...props
}: ResizablePanelGroupProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [panelConfigs, setPanelConfigs] = React.useState<
    Array<{ defaultSize: number; minSize?: number; maxSize?: number }>
  >([])
  const [sizes, setSizes] = React.useState<number[]>([30, 70])

  const registerPanel = React.useCallback(
    (index: number, defaultSize: number, minSize?: number, maxSize?: number) => {
      setPanelConfigs((prev) => {
        const next = [...prev]
        next[index] = { defaultSize, minSize, maxSize }
        return next
      })
      setSizes((prev) => {
        const next = [...prev]
        if (next[index] === undefined) {
          next[index] = defaultSize
        }
        return next
      })
    },
    []
  )

  const setPanelSize = React.useCallback((index: number, newSize: number) => {
    setSizes((prev) => {
      const next = [...prev]
      next[index] = newSize
      return next
    })
  }, [])

  const startDragging = React.useCallback(
    (handleIndex: number, startEvent: React.MouseEvent | React.TouchEvent) => {
      const container = containerRef.current
      if (!container) return

      const isHorizontal = direction === 'horizontal'
      const rect = container.getBoundingClientRect()
      const totalDimension = isHorizontal ? rect.width : rect.height

      const initialCoord =
        'touches' in startEvent
          ? isHorizontal
            ? startEvent.touches[0].clientX
            : startEvent.touches[0].clientY
          : isHorizontal
          ? startEvent.clientX
          : startEvent.clientY

      const initialSize0 = sizes[handleIndex] || 30
      const initialSize1 = sizes[handleIndex + 1] || 70
      const totalTwo = initialSize0 + initialSize1

      const min0 = panelConfigs[handleIndex]?.minSize ?? 18
      const max0 = panelConfigs[handleIndex]?.maxSize ?? 55

      const handleMove = (e: MouseEvent | TouchEvent) => {
        const currentCoord =
          'touches' in e
            ? isHorizontal
              ? e.touches[0].clientX
              : e.touches[0].clientY
            : isHorizontal
            ? e.clientX
            : e.clientY

        const deltaPx = currentCoord - initialCoord
        const deltaPct = (deltaPx / totalDimension) * 100

        let newSize0 = initialSize0 + deltaPct
        newSize0 = Math.max(min0, Math.min(max0, newSize0))
        const newSize1 = totalTwo - newSize0

        setSizes((prev) => {
          const next = [...prev]
          next[handleIndex] = newSize0
          next[handleIndex + 1] = newSize1
          return next
        })
      }

      const handleUp = () => {
        document.removeEventListener('mousemove', handleMove)
        document.removeEventListener('mouseup', handleUp)
        document.removeEventListener('touchmove', handleMove)
        document.removeEventListener('touchend', handleUp)
      }

      document.addEventListener('mousemove', handleMove)
      document.addEventListener('mouseup', handleUp)
      document.addEventListener('touchmove', handleMove)
      document.addEventListener('touchend', handleUp)
    },
    [direction, sizes, panelConfigs]
  )

  let panelIdx = 0
  const mappedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && (child.type as any)?.displayName === 'ResizablePanel') {
      const idx = panelIdx++
      return React.cloneElement(child, { panelIndex: idx } as any)
    }
    return child
  })

  return (
    <ResizableContext.Provider
      value={{
        direction,
        sizes,
        setPanelSize,
        registerPanel,
        startDragging,
      }}
    >
      <div
        ref={containerRef}
        className={cn(
          'flex h-full w-full overflow-hidden',
          direction === 'horizontal' ? 'flex-row' : 'flex-col',
          className
        )}
        {...props}
      >
        {mappedChildren}
      </div>
    </ResizableContext.Provider>
  )
}

export interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultSize?: number
  minSize?: number
  maxSize?: number
  panelIndex?: number
}

export const ResizablePanel = React.forwardRef<HTMLDivElement, ResizablePanelProps>(
  (
    {
      defaultSize = 50,
      minSize = 15,
      maxSize = 85,
      panelIndex = 0,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const ctx = React.useContext(ResizableContext)
    const index = panelIndex

    React.useEffect(() => {
      ctx?.registerPanel(index, defaultSize, minSize, maxSize)
    }, [ctx, index, defaultSize, minSize, maxSize])

    const size = ctx?.sizes[index] ?? defaultSize
    const isHorizontal = !ctx || ctx.direction === 'horizontal'

    return (
      <div
        ref={ref}
        className={cn('relative overflow-hidden flex flex-col', className)}
        style={{
          ...(isHorizontal
            ? { flex: `0 0 ${size}%`, width: `${size}%`, minWidth: 0, maxWidth: `${size}%` }
            : { flex: `0 0 ${size}%`, height: `${size}%`, minHeight: 0, maxHeight: `${size}%` }),
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ResizablePanel.displayName = 'ResizablePanel'

export interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  handleIndex?: number
  withHandle?: boolean
}

export const ResizableHandle = React.forwardRef<HTMLDivElement, ResizableHandleProps>(
  ({ handleIndex = 0, withHandle, className, ...props }, ref) => {
    const ctx = React.useContext(ResizableContext)
    const isHorizontal = !ctx || ctx.direction === 'horizontal'

    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault()
      ctx?.startDragging(handleIndex, e)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
      ctx?.startDragging(handleIndex, e)
    }

    return (
      <div
        ref={ref}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className={cn(
          'relative flex items-center justify-center bg-neutral-800 transition-colors hover:bg-neutral-600 active:bg-neutral-500 select-none z-10 shrink-0',
          isHorizontal
            ? 'w-1 cursor-col-resize hover:w-1.5'
            : 'h-1 cursor-row-resize hover:h-1.5',
          className
        )}
        {...props}
      >
        {withHandle && (
          <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border border-neutral-700 bg-neutral-800">
            <div className="h-2 w-0.5 bg-neutral-400" />
          </div>
        )}
      </div>
    )
  }
)
ResizableHandle.displayName = 'ResizableHandle'
