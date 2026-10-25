import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none border border-transparent shrink-0'

    const variants = {
      default:
        'bg-white text-neutral-900 shadow hover:bg-neutral-200 active:bg-neutral-300 font-medium',
      destructive:
        'bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800',
      outline:
        'border border-neutral-700 bg-transparent text-neutral-200 shadow-sm hover:bg-neutral-800 hover:text-white active:bg-neutral-700',
      secondary:
        'bg-neutral-800 text-neutral-100 shadow-sm hover:bg-neutral-700 active:bg-neutral-600',
      ghost:
        'text-neutral-200 hover:bg-neutral-800 hover:text-white active:bg-neutral-700',
      link: 'text-white underline-offset-4 hover:underline',
    }

    const sizes = {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 rounded-md px-3 text-xs',
      lg: 'h-10 rounded-md px-8 text-base',
      icon: 'h-9 w-9 p-0',
    }

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>
      return React.cloneElement(child, {
        className: cn(baseStyles, variants[variant], sizes[size], child.props.className, className),
        ...props,
      })
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
