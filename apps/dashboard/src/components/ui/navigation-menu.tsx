import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavigationMenuContextType {
  activeItem: string | null
  setActiveItem: (id: string | null) => void
}

const NavigationMenuContext = React.createContext<NavigationMenuContextType>({
  activeItem: null,
  setActiveItem: () => {},
})

interface NavigationMenuItemContextType {
  itemId: string
  isOpen: boolean
}

const NavigationMenuItemContext = React.createContext<NavigationMenuItemContextType>({
  itemId: '',
  isOpen: false,
})

export const NavigationMenu = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => {
  const [activeItem, setActiveItem] = React.useState<string | null>(null)
  const navRef = React.useRef<HTMLElement>(null)

  React.useImperativeHandle(ref, () => navRef.current as HTMLElement)

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveItem(null)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveItem(null)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <NavigationMenuContext.Provider value={{ activeItem, setActiveItem }}>
      <nav
        ref={navRef}
        className={cn('relative z-10 flex max-w-max items-center justify-center', className)}
        {...props}
      >
        {children}
      </nav>
    </NavigationMenuContext.Provider>
  )
})
NavigationMenu.displayName = 'NavigationMenu'

export const NavigationMenuList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('group flex flex-1 list-none items-center justify-center gap-1 m-0 p-0', className)}
    {...props}
  />
))
NavigationMenuList.displayName = 'NavigationMenuList'

export const NavigationMenuItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, children, ...props }, ref) => {
  const generatedId = React.useId()
  const { activeItem, setActiveItem } = React.useContext(NavigationMenuContext)
  const isOpen = activeItem === generatedId
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveItem(generatedId)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveItem(null)
    }, 150)
  }

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <NavigationMenuItemContext.Provider value={{ itemId: generatedId, isOpen }}>
      <li
        ref={ref}
        className={cn('relative flex items-center', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </li>
    </NavigationMenuItemContext.Provider>
  )
})
NavigationMenuItem.displayName = 'NavigationMenuItem'

export const NavigationMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { setActiveItem } = React.useContext(NavigationMenuContext)
  const { itemId, isOpen } = React.useContext(NavigationMenuItemContext)

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'group inline-flex h-9 w-max items-center justify-center rounded-md px-3.5 py-2 text-sm font-medium transition-colors hover:bg-neutral-800/60 hover:text-white focus:bg-neutral-800/60 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer text-neutral-200',
        isOpen ? 'bg-neutral-800/80 text-white' : 'bg-transparent',
        className
      )}
      onClick={() => setActiveItem(isOpen ? null : itemId)}
      aria-expanded={isOpen}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          'relative top-[0.5px] ml-1.5 h-3.5 w-3.5 transition duration-200 opacity-70 group-hover:opacity-100',
          isOpen && 'rotate-180 opacity-100'
        )}
        aria-hidden="true"
      />
    </button>
  )
})
NavigationMenuTrigger.displayName = 'NavigationMenuTrigger'

export const NavigationMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { isOpen } = React.useContext(NavigationMenuItemContext)

  if (!isOpen) return null

  return (
    <div
      ref={ref}
      className={cn(
        'absolute left-0 top-full z-50 mt-1 min-w-[20rem] overflow-hidden rounded-md border border-neutral-800 bg-[#1c1c1c] text-white shadow-2xl backdrop-blur-md animate-in fade-in-0 zoom-in-95',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
NavigationMenuContent.displayName = 'NavigationMenuContent'

export interface NavigationMenuLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
}

export const NavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  NavigationMenuLinkProps
>(({ className, asChild = false, children, ...props }, ref) => {
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>
    return React.cloneElement(child, {
      className: cn(child.props.className, className),
      ...props,
    })
  }

  return (
    <a
      ref={ref}
      className={cn(
        'block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-neutral-800 hover:text-white focus:bg-neutral-800 focus:text-white text-neutral-200 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
})
NavigationMenuLink.displayName = 'NavigationMenuLink'
