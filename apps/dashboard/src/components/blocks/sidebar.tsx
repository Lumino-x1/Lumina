import * as React from 'react'
import { cn } from '@/lib/utils'

interface SidebarContextType {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  toggleSidebar: () => void
  isMobile: boolean
}

const SidebarContext = React.createContext<SidebarContextType>({
  open: false,
  setOpen: () => {},
  toggleSidebar: () => {},
  isMobile: false,
})

export function useSidebar() {
  return React.useContext(SidebarContext)
}

export interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean
}

export function SidebarProvider({
  defaultOpen = false,
  className,
  children,
  ...props
}: SidebarProviderProps) {
  const [open, setOpen] = React.useState(defaultOpen)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleSidebar = React.useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  return (
    <SidebarContext.Provider value={{ open, setOpen, toggleSidebar, isMobile }}>
      <div
        className={cn(
          'flex h-screen w-full overflow-hidden bg-[#121212] text-neutral-200 antialiased',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'floating' | 'inset'
  collapsible?: 'offcanvas' | 'icon' | 'none'
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ variant = 'floating', collapsible = 'icon', className, children, ...props }, ref) => {
    const { open } = useSidebar()

    const isCollapsed = collapsible === 'icon' && !open

    return (
      <aside
        ref={ref}
        data-state={open ? 'expanded' : 'collapsed'}
        data-collapsible={collapsible}
        className={cn(
          'relative flex h-full flex-col border-r border-neutral-800 bg-[#161616] transition-all duration-200 select-none z-20 shrink-0 overflow-hidden',
          isCollapsed ? 'w-16' : 'w-56',
          variant === 'floating' && 'shadow-lg',
          className
        )}
        {...props}
      >
        {children}
      </aside>
    )
  }
)
Sidebar.displayName = 'Sidebar'

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden p-2', className)}
    {...props}
  />
))
SidebarContent.displayName = 'SidebarContent'

export const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('relative flex w-full min-w-0 flex-col', className)} {...props} />
))
SidebarGroup.displayName = 'SidebarGroup'

export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { open } = useSidebar()
  if (!open) return null

  return (
    <div
      ref={ref}
      className={cn(
        'px-2 py-1.5 text-xs font-medium text-neutral-400 tracking-wider uppercase truncate',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
SidebarGroupLabel.displayName = 'SidebarGroupLabel'

export const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('w-full text-sm', className)} {...props} />
))
SidebarGroupContent.displayName = 'SidebarGroupContent'

export const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex w-full min-w-0 flex-col gap-1.5 list-none p-0 m-0', className)}
    {...props}
  />
))
SidebarMenu.displayName = 'SidebarMenu'

export const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('relative w-full flex justify-center', className)} {...props} />
))
SidebarMenuItem.displayName = 'SidebarMenuItem'

export interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  isActive?: boolean
}

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ className, asChild = false, isActive, children, ...props }, ref) => {
  const { open } = useSidebar()

  const buttonClasses = cn(
    'flex items-center rounded-lg text-sm font-medium text-neutral-400 transition-colors hover:bg-neutral-800/80 hover:text-white cursor-pointer select-none overflow-hidden',
    !open
      ? 'w-10 h-10 justify-center p-0 [&>span]:hidden [&>svg.ml-auto]:hidden shrink-0'
      : 'w-full gap-3 px-3 py-2',
    isActive && 'bg-neutral-800 text-white font-semibold',
    className
  )

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string; children?: React.ReactNode }>

    return React.cloneElement(child, {
      className: cn(buttonClasses, child.props.className),
      ...props,
    })
  }

  return (
    <button ref={ref} className={buttonClasses} {...props}>
      {children}
    </button>
  )
})
SidebarMenuButton.displayName = 'SidebarMenuButton'

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col gap-2 p-2 border-t border-neutral-800 bg-[#161616] overflow-hidden', className)}
    {...props}
  />
))
SidebarFooter.displayName = 'SidebarFooter'

export const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <main
    ref={ref}
    className={cn('relative flex flex-1 flex-col min-w-0 h-screen overflow-hidden bg-[#191919]', className)}
    {...props}
  />
))
SidebarInset.displayName = 'SidebarInset'
