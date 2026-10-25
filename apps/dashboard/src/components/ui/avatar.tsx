import * as React from 'react'
import { cn } from '@/lib/utils'

export const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-neutral-800/80 bg-neutral-800',
      className
    )}
    {...props}
  />
))
Avatar.displayName = 'Avatar'

export const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, src, alt = '', onError, ...props }, ref) => {
  const [hasError, setHasError] = React.useState(false)

  if (hasError || !src) {
    return null
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      onError={(e) => {
        setHasError(true)
        onError?.(e)
      }}
      className={cn('aspect-square h-full w-full object-cover', className)}
      {...props}
    />
  )
})
AvatarImage.displayName = 'AvatarImage'

export const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-neutral-800 text-xs font-medium text-neutral-300 select-none',
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = 'AvatarFallback'
