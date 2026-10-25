import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-y-auto overflow-x-hidden [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.15)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-800 hover:[&::-webkit-scrollbar-thumb]:bg-neutral-700',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ScrollArea.displayName = 'ScrollArea'
