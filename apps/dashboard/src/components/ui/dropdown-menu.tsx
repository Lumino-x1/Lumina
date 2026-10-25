import * as React from 'react'
import { cn } from '@/lib/utils'

interface DropdownMenuContextType {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  menuRef: React.RefObject<HTMLDivElement | null>
}

const DropdownMenuContext = React.createContext<DropdownMenuContextType | null>(null)

export interface DropdownMenuProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function DropdownMenu({ children, open: controlledOpen, onOpenChange }: DropdownMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const menuRef = React.useRef<HTMLDivElement | null>(null)

  const setOpen = React.useCallback<React.Dispatch<React.SetStateAction<boolean>>>(
    (val) => {
      const next = typeof val === 'function' ? val(open) : val
      if (!isControlled) {
        setUncontrolledOpen(next)
      }
      onOpenChange?.(next)
    },
    [isControlled, open, onOpenChange]
  )

  React.useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, setOpen])

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, menuRef }}>
      <div ref={menuRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
}

export interface DropdownMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(({ className, asChild = false, children, onClick, ...props }, ref) => {
  const ctx = React.useContext(DropdownMenuContext)
  if (!ctx) throw new Error('DropdownMenuTrigger must be inside DropdownMenu')

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    ctx.setOpen((prev) => !prev)
  }

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      onClick?: React.MouseEventHandler<any>
      className?: string
    }>
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent<any>) => {
        child.props.onClick?.(e)
        handleClick(e as any)
      },
      className: cn(child.props.className, className),
    })
  }

  return (
    <button
      ref={ref}
      type="button"
      className={cn('inline-flex items-center justify-center cursor-pointer', className)}
      onClick={handleClick}
      aria-expanded={ctx.open}
      {...props}
    >
      {children}
    </button>
  )
})
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger'

export interface DropdownMenuContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  side?: 'top' | 'bottom'
  align?: 'start' | 'end' | 'center'
}

export const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(({ className, side = 'bottom', align = 'start', children, ...props }, ref) => {
  const ctx = React.useContext(DropdownMenuContext)
  if (!ctx || !ctx.open) return null

  const sideClasses =
    side === 'top'
      ? 'bottom-full mb-2'
      : 'top-full mt-2'

  const alignClasses =
    align === 'end'
      ? 'right-0'
      : align === 'center'
      ? 'left-1/2 -translate-x-1/2'
      : 'left-0'

  return (
    <div
      ref={ref}
      className={cn(
        'absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-neutral-800 bg-neutral-900/95 p-1 text-neutral-200 shadow-xl backdrop-blur-md animate-in fade-in-0 zoom-in-95',
        sideClasses,
        alignClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
DropdownMenuContent.displayName = 'DropdownMenuContent'

export const DropdownMenuGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('space-y-0.5', className)} {...props} />
))
DropdownMenuGroup.displayName = 'DropdownMenuGroup'

export const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { disabled?: boolean }
>(({ className, disabled, onClick, children, ...props }, ref) => {
  const ctx = React.useContext(DropdownMenuContext)

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return
    onClick?.(e)
    ctx?.setOpen(false)
  }

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={cn(
        'relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm outline-none transition-colors hover:bg-neutral-800 hover:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
DropdownMenuItem.displayName = 'DropdownMenuItem'

export const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('px-2.5 py-1.5 text-xs font-semibold text-neutral-400 select-none', className)}
    {...props}
  />
))
DropdownMenuLabel.displayName = 'DropdownMenuLabel'

export const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-neutral-800', className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator'
