// Built using Hyperiux Vault: https://vault.hyperiux.com
"use client";

import gsap from "gsap";
import type { MouseEvent, ReactNode } from "react";
import { useEffect, useRef, useState, type RefObject } from "react";

/* ------------------------------------------------------------------ *
 * Inlined from ./useFocusTrap — keeps keyboard focus inside a container
 * while it's open, restores it to the trigger on close.
 * ------------------------------------------------------------------ */

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const isVisible = (element?: HTMLElement | null): boolean => {
  if (!element || element.hidden) return false;
  const style = window.getComputedStyle(element);
  if (style.visibility === "hidden" || style.visibility === "collapse") return false;
  return element.getClientRects().length > 0;
};

const getFocusableElements = (container?: HTMLElement | null): HTMLElement[] => {
  if (!container) return [];
  return (Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)) as HTMLElement[]).filter(isVisible);
};

export interface UseFocusTrapParams {
  active: boolean;
  containerRef: RefObject<HTMLElement | null>;
  initialFocusRef?: RefObject<HTMLElement | null>;
  onEscape?: () => void;
}

/**
 * Keeps keyboard focus inside `containerRef` while `active` is true.
 *
 * - Captures the element focused before opening and restores focus to it on
 *   close (so the trigger button gets focus back).
 * - Moves focus into the menu on open (to `initialFocusRef` when provided,
 *   otherwise the first focusable element).
 * - Wraps Tab / Shift+Tab around the menu's focusable elements.
 * - Calls `onEscape` when the Escape key is pressed.
 */
export function useFocusTrap({ active, containerRef, initialFocusRef, onEscape }: UseFocusTrapParams) {
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusInitial = () => {
      const target = initialFocusRef?.current ?? getFocusableElements(container)[0] ?? container;
      if (!(target instanceof HTMLElement)) return;
      if (target === container && !container.hasAttribute("tabindex")) {
        container.setAttribute("tabindex", "-1");
      }
      target.focus();
    };

    // Defer focus so it lands after the menu has mounted / started animating in.
    const focusFrame = requestAnimationFrame(focusInitial);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onEscapeRef.current?.();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusableElements(container);
      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (activeElement === first || !container.contains(activeElement)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (activeElement === last || !container.contains(activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused && document.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [active, containerRef, initialFocusRef]);
}

/* ------------------------------------------------------------------ *
 * FullscreenNav — the clip-path reveal shell: fixed header (brand + toggle)
 * and a fixed full-screen panel that wipes open from `clipOrigin`. Accepts
 * either a static `links` list or a `children(isOpen, onClose)` render prop
 * for a fully custom panel layout (CustomNavbar below uses this).
 * ------------------------------------------------------------------ */

export const CLIPS = {
  bottom: {
    closedInitial: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    closedFinal: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
  },
  top: {
    closedInitial: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    closedFinal: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  },
  left: {
    closedInitial: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    closedFinal: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
  },
  right: {
    closedInitial: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    closedFinal: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
  },
};

const REDUCED_MOTION_FADE_DURATION = 0.2;

export interface FullscreenNavLink {
  label: string;
  href: string;
}

export interface FullscreenNavProps {
  links?: FullscreenNavLink[];
  /** Brand text or custom element shown in the fixed header, linking to `brandHref`. */
  brand?: ReactNode;
  brandHref?: string;
  clipOrigin?: keyof typeof CLIPS;
  overlayBg?: string;
  linkColor?: string;
  linkHoverColor?: string;
  linkSizeClass?: string;
  headerClassName?: string;
  openDuration?: number;
  closeDuration?: number;
  ease?: string;
  /** Header text/hamburger-bar color while closed. Default '#ffffff'. */
  headerClosedColor?: string;
  /** Header text/hamburger-bar color while the overlay is open. Default '#ffffff'. */
  headerOpenColor?: string;
  /** Action buttons / elements rendered next to the hamburger toggle. */
  headerActions?: ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  children?: (isOpen: boolean, onClose: () => void) => ReactNode;
}

export function FullscreenNav({
  links,
  brand = "Lumina",
  brandHref = "/",
  clipOrigin = "bottom",
  overlayBg = "#191919",
  linkColor = "#ffffff",
  linkHoverColor = "#a3a3a3",
  linkSizeClass = "text-5xl",
  headerClassName = "",
  openDuration = 1.2,
  closeDuration = 1.2,
  ease = "power4.inOut",
  headerClosedColor = "#ffffff",
  headerOpenColor = "#ffffff",
  headerActions,
  onOpen,
  onClose,
  children,
}: FullscreenNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlayRef = useRef<HTMLElement | null>(null);
  const linksWrapperRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);
  const isAnimatingRef = useRef(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const reduceMotion = () =>
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;

  const { closedInitial, open: openClipPath, closedFinal } = CLIPS[clipOrigin] ?? CLIPS.bottom;
  const isReducedMotion = reduceMotion();

  // Scroll detection for sticky header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onOpenMenu = () => {
    setIsOpen(true);
    timelineRef.current?.kill();

    gsap.set(overlayRef.current, { clipPath: closedInitial });
    gsap.set(linksWrapperRef.current, { opacity: 1, scale: 1 });

    if (isReducedMotion) {
      gsap.set(overlayRef.current, { clipPath: openClipPath, autoAlpha: 0 });

      timelineRef.current = gsap.to(overlayRef.current, {
        autoAlpha: 1,
        duration: REDUCED_MOTION_FADE_DURATION,
        ease: "power2.out",
        onStart: () => {
          isAnimatingRef.current = true;
        },
        onComplete: () => {
          isAnimatingRef.current = false;
          onOpen?.();
        },
      });
      return;
    }

    const timeline = gsap.timeline({
      onStart: () => {
        isAnimatingRef.current = true;
      },
      onComplete: () => {
        isAnimatingRef.current = false;
        onOpen?.();
      },
    });

    timelineRef.current = timeline;

    timeline.to(overlayRef.current, {
      clipPath: openClipPath,
      duration: openDuration,
      delay: 0.2,
      ease,
    });
  };

  const onCloseMenu = () => {
    setIsOpen(false);
    timelineRef.current?.kill();

    if (isReducedMotion) {
      gsap.set(linksWrapperRef.current, { scale: 1, opacity: 1 });

      timelineRef.current = gsap.to(overlayRef.current, {
        autoAlpha: 0,
        duration: REDUCED_MOTION_FADE_DURATION,
        ease: "power2.out",
        onStart: () => {
          isAnimatingRef.current = true;
        },
        onComplete: () => {
          isAnimatingRef.current = false;
          gsap.set(overlayRef.current, { clipPath: closedFinal });
          onClose?.();
        },
      });

      gsap.set(overlayRef.current, { clipPath: closedFinal });
      return;
    }

    const timeline = gsap.timeline({
      onStart: () => {
        isAnimatingRef.current = true;
      },
      onComplete: () => {
        isAnimatingRef.current = false;
        onClose?.();
      },
    });

    timelineRef.current = timeline;

    timeline
      .to(linksWrapperRef.current, { scale: 0.9, opacity: 0.5, duration: 0.7, ease: "power2.in" })
      .to(overlayRef.current, { clipPath: closedFinal, duration: closeDuration, ease }, "<");
  };

  const onToggleMenu = () => {
    if (isAnimatingRef.current) return;
    if (isOpen) {
      onCloseMenu();
      return;
    }
    onOpenMenu();
  };

  const onLinkMouseEnter = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.color = linkHoverColor;
  };

  const onLinkMouseLeave = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.color = linkColor;
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Trap focus inside the overlay while open, restore it to the toggle on close.
  useFocusTrap({ active: isOpen, containerRef: rootRef, initialFocusRef: toggleButtonRef, onEscape: onCloseMenu });

  const activeColor = isOpen ? headerOpenColor : headerClosedColor;

  return (
    <div ref={rootRef}>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] flex h-16 sm:h-20 items-center justify-between px-6 sm:px-8 lg:px-12 transition-all duration-300 ${
          scrolled && !isOpen
            ? "bg-[#191919]/90 supports-[backdrop-filter]:bg-[#191919]/80 backdrop-blur-md border-b border-white/10 shadow-sm"
            : "bg-transparent border-b border-transparent"
        } ${headerClassName}`}
      >
        <a
          href={brandHref}
          className="cursor-pointer inline-flex items-center text-lg font-semibold uppercase tracking-[0.15em] transition-colors duration-300 delay-300 motion-reduce:transition-none select-none shrink-0"
          style={{ color: activeColor }}
        >
          {brand}
        </a>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {headerActions}

          <button
            ref={toggleButtonRef}
            onClick={onToggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="flex size-10 cursor-pointer flex-col items-center justify-center gap-1.5 p-2 rounded-md hover:bg-white/10 transition-colors shrink-0"
          >
            <span
              style={{ backgroundColor: activeColor }}
              className={`block h-0.5 w-5 sm:w-6 transition-all duration-500 ease-in-out motion-reduce:transition-none ${
                isOpen ? "translate-y-[8px] rotate-45" : isReducedMotion ? "translate-y-0 rotate-0" : ""
              }`}
            />
            <span
              style={{ backgroundColor: activeColor }}
              className={`block h-0.5 w-5 sm:w-6 transition-all duration-300 motion-reduce:transition-none ${
                isOpen ? "scale-x-0 opacity-0" : isReducedMotion ? "scale-x-100 opacity-100" : ""
              }`}
            />
            <span
              style={{ backgroundColor: activeColor }}
              className={`block h-0.5 w-5 sm:w-6 transition-all duration-500 ease-in-out motion-reduce:transition-none ${
                isOpen ? "-translate-y-[8px] -rotate-45" : isReducedMotion ? "translate-y-0 rotate-0" : ""
              }`}
            />
          </button>
        </div>
      </header>

      <nav
        ref={overlayRef}
        style={{ clipPath: closedInitial, backgroundColor: overlayBg }}
        className={`fixed inset-0 z-[90] flex flex-col items-center justify-center gap-2 overflow-y-auto ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isOpen}
        role="navigation"
      >
        <div ref={linksWrapperRef} className="flex min-h-screen w-screen flex-col items-center justify-center motion-reduce:opacity-100">
          {children
            ? children(isOpen, onCloseMenu)
            : (links as FullscreenNavLink[])?.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={isOpen ? onCloseMenu : undefined}
                  tabIndex={isOpen ? 0 : -1}
                  style={{ color: linkColor }}
                  onMouseEnter={onLinkMouseEnter}
                  onMouseLeave={onLinkMouseLeave}
                  className={`${linkSizeClass} font-normal tracking-tight transition-colors motion-reduce:transition-none`}
                >
                  {label}
                </a>
              ))}
        </div>
      </nav>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * CustomNavbar — a fuller panel layout (links, image row, brand/tagline,
 * socials, location) meant to be passed as FullscreenNav's children render
 * prop. Handles its own reveal animation keyed off `isOpen`.
 * ------------------------------------------------------------------ */

export const SOCIAL_ICONS: Record<string, ReactNode> = {
  instagram: (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 max-md:h-5 max-md:w-5">
      <path d="M5.87988 0.0556641H15.1201C16.6642 0.0574604 18.1445 0.671867 19.2363 1.76367C20.3281 2.85548 20.9425 4.33584 20.9443 5.87988V15.1201C20.9425 16.6642 20.3281 18.1445 19.2363 19.2363C18.1445 20.3281 16.6642 20.9425 15.1201 20.9443H5.87988C4.33584 20.9425 2.85548 20.3281 1.76367 19.2363C0.671867 18.1445 0.0574604 16.6642 0.0556641 15.1201V5.87988C0.0574603 4.33584 0.671867 2.85548 1.76367 1.76367C2.85548 0.671867 4.33584 0.0574603 5.87988 0.0556641ZM12.4502 5.79199C11.519 5.40629 10.4944 5.30533 9.50586 5.50195C8.51734 5.69858 7.60917 6.1838 6.89648 6.89648C6.1838 7.60917 5.69858 8.51734 5.50195 9.50586C5.30533 10.4944 5.40629 11.519 5.79199 12.4502C6.1777 13.3813 6.83093 14.1774 7.66895 14.7373C8.50694 15.2972 9.49217 15.5957 10.5 15.5957C11.8511 15.5942 13.1462 15.0569 14.1016 14.1016C15.0569 13.1462 15.5942 11.8511 15.5957 10.5C15.5957 9.49217 15.2972 8.50694 14.7373 7.66895C14.1774 6.83093 13.3813 6.1777 12.4502 5.79199ZM10.5 7.19629C11.376 7.19731 12.2156 7.54564 12.835 8.16504C13.4544 8.78444 13.8027 9.62403 13.8037 10.5C13.8037 11.1535 13.6101 11.7926 13.2471 12.3359C12.8841 12.8791 12.3682 13.3027 11.7646 13.5527C11.1609 13.8028 10.4964 13.8677 9.85547 13.7402C9.21456 13.6127 8.62614 13.298 8.16406 12.8359C7.70199 12.3739 7.38725 11.7854 7.25977 11.1445C7.13228 10.5036 7.19719 9.83908 7.44727 9.23535C7.6973 8.63179 8.1209 8.11594 8.66406 7.75293C9.1395 7.43525 9.68836 7.24712 10.2559 7.20508L10.5 7.19629ZM15.7031 3.74902C15.4479 3.79981 15.2133 3.92535 15.0293 4.10938C14.8453 4.29341 14.7197 4.52794 14.6689 4.7832C14.6182 5.03848 14.6445 5.30348 14.7441 5.54395C14.8437 5.78413 15.0124 5.98926 15.2285 6.13379C15.4449 6.27838 15.6997 6.35644 15.96 6.35645C16.309 6.35645 16.6438 6.21747 16.8906 5.9707C17.1374 5.72392 17.2764 5.38905 17.2764 5.04004C17.2764 4.77977 17.1993 4.525 17.0547 4.30859C16.9101 4.09225 16.7042 3.92384 16.4639 3.82422C16.2234 3.72462 15.9584 3.69825 15.7031 3.74902Z" fill="currentColor" />
    </svg>
  ),
  facebook: (
    <svg width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 max-md:h-5 max-md:w-5">
      <path d="M6.38184 0.385742C7.19227 0.274662 7.98805 0.34229 8.85449 0.37793C9.03979 0.385348 9.22788 0.406595 9.4248 0.431641V2.80859C8.97946 2.81236 8.52504 2.81344 8.07422 2.82324L7.51758 2.8418C7.15961 2.85609 6.84471 2.96157 6.59375 3.16797C6.34339 3.37392 6.18263 3.65902 6.09375 3.9873L6.0918 3.99414C6.05287 4.15011 6.02498 4.32615 6.02441 4.49707C6.01276 5.25508 6.0127 6.0129 6.0127 6.76758C6.0127 6.81651 6.02031 6.86155 6.02539 6.88867C6.0298 6.91218 6.0385 6.95323 6.04199 6.9707L6.09375 7.23242H9.27637C9.16172 8.14171 9.04553 9.02094 8.93066 9.92773H6.02441V18.5254H3.20312V9.91602H0.325195V7.20898H3.20312V6.66309C3.20312 5.94768 3.19164 5.24969 3.20312 4.55664C3.21466 4.10654 3.23786 3.67817 3.32422 3.26758L3.3252 3.2627C3.63481 1.67136 4.77561 0.611071 6.38184 0.385742Z" fill="currentColor" />
    </svg>
  ),
  twitter: (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 max-md:h-5 max-md:w-5">
      <path d="M4.64453 0.332031C5.30734 1.29663 5.96769 2.25864 6.62793 3.2207L8.62793 6.13379L8.63574 6.14453C8.64636 6.15869 8.65659 6.17418 8.67773 6.20508C8.6964 6.23236 8.72134 6.26761 8.75098 6.30469L9.00098 6.61719L9.26172 6.31445C9.53339 5.99932 9.80616 5.68366 10.0674 5.37891L10.0664 5.37793C11.5007 3.71546 12.9369 2.05244 14.3613 0.37793L14.3652 0.373047C14.3867 0.346831 14.3985 0.34209 14.4014 0.34082C14.4058 0.338875 14.422 0.332131 14.4658 0.332031C14.6279 0.336411 14.7919 0.335583 14.958 0.334961C13.0974 2.50306 11.2419 4.65276 9.39941 6.80566L9.24414 6.9873L9.36719 7.19238C9.40583 7.25678 9.44481 7.30852 9.47559 7.34961V7.35059C11.5103 10.314 13.5467 13.2887 15.5918 16.2539H11.5674C10.1439 14.2046 8.73002 12.1441 7.31641 10.083C7.29438 10.0506 7.27083 10.0222 7.25781 10.0068C7.24095 9.98691 7.23091 9.97519 7.22168 9.96289L6.99219 9.65723L6.72168 9.92773C6.66017 9.98925 6.61092 10.0497 6.57422 10.0977C5.4223 11.4343 4.26966 12.7719 3.12793 14.1094C2.80736 14.4843 2.48353 14.8625 2.16016 15.2402C1.86982 15.5794 1.57946 15.9186 1.29102 16.2559C1.10207 16.2593 0.914651 16.2616 0.728516 16.2627L1.41504 15.4551C2.25748 14.4768 3.10014 13.4955 3.94238 12.5146C4.78466 11.5338 5.62667 10.5531 6.46875 9.5752L6.47656 9.56641L6.4834 9.55762C6.51689 9.51297 6.5361 9.48735 6.56055 9.46289L6.75586 9.26758L6.59961 9.04004C4.60695 6.14349 2.62417 3.24745 0.623047 0.332031H4.64453ZM1.66895 1.26074C1.68565 1.28582 1.69884 1.30659 1.71094 1.32715C1.72076 1.34385 1.7383 1.375 1.75586 1.40137L1.76074 1.4082C5.07549 6.14667 8.37933 10.8851 11.6943 15.6348V15.6338C11.7435 15.7088 11.8112 15.7817 11.9082 15.832C12.008 15.8837 12.1093 15.8965 12.1953 15.8965H14.0869C14.1314 15.8964 14.1754 15.8914 14.1914 15.8896C14.2124 15.8873 14.2247 15.8858 14.2383 15.8857H14.8838L14.5088 15.3604C14.4852 15.3273 14.4662 15.2989 14.4473 15.2705L14.3848 15.1807C11.9629 11.7054 9.53084 8.22952 7.10938 4.76562H7.1084C6.67392 4.14649 6.23943 3.52457 5.80469 2.90234C5.36995 2.28013 4.935 1.65698 4.5 1.03711L4.49414 1.0293L4.4873 1.02051C4.45603 0.981434 4.41014 0.931071 4.35645 0.886719C4.32957 0.864523 4.294 0.837687 4.25098 0.81543C4.21224 0.795422 4.14624 0.76758 4.06348 0.765625H4.06445C3.36281 0.743701 2.67262 0.744141 1.94531 0.744141H1.3252L1.66895 1.26074Z" fill="currentColor" />
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 max-md:h-5 max-md:w-5">
      <path d="M12.523 5.83716C13.2256 5.77425 13.9204 5.82636 14.5894 6.03149V6.03247C15.6435 6.37056 16.2928 7.09389 16.5748 8.14771V8.14868C16.7248 8.7272 16.773 9.31063 16.8785 9.95532L16.8795 9.96118C16.8975 10.0606 16.9079 10.1631 16.9185 10.2893V16.8831H14.022C14.0223 15.4836 14.0282 14.0864 14.022 12.6858L14.0113 11.2571C14.011 10.886 13.971 10.5122 13.9078 10.1506L13.8375 9.79224C13.761 9.43645 13.613 9.1113 13.3736 8.85083C13.1317 8.58774 12.8116 8.40827 12.4224 8.32251L12.4185 8.32153L12.19 8.28345C12.037 8.26427 11.8831 8.25731 11.73 8.26001L11.5015 8.27075C10.9986 8.30831 10.5548 8.464 10.2047 8.7561C9.85316 9.0494 9.6227 9.45819 9.50934 9.95532V9.95728C9.39316 10.4801 9.33481 11.0356 9.33453 11.5676C9.31371 13.3584 9.3217 15.1407 9.32281 16.926C8.37363 16.9188 7.41182 16.9163 6.44977 16.9163V6.10474H9.19098V8.24146L9.79938 7.52075C10.0645 7.20739 10.2456 6.95483 10.483 6.72778C10.9801 6.25729 11.5695 5.98333 12.2339 5.87427L12.523 5.83716Z" fill="currentColor" />
      <path d="M3.5175 6.104V16.9155H0.632736V6.104H3.5175Z" fill="currentColor" />
      <path d="M2.10547 0.345703C3.06224 0.373859 3.81413 1.15251 3.7959 2.08594C3.77729 3.07221 2.97987 3.83413 2.02539 3.80664H2.02246C1.10984 3.78839 0.327236 2.97556 0.345703 2.0332C0.364056 1.0972 1.16655 0.328815 2.10547 0.345703Z" fill="currentColor" />
    </svg>
  ),
  github: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 sm:h-6 sm:w-6 max-md:h-5 max-md:w-5">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  discord: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 sm:h-6 sm:w-6 max-md:h-5 max-md:w-5">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),
};

const DEFAULT_LINK_Y_OFFSET = 30;
const DEFAULT_LINK_DURATION = 0.8;
const DEFAULT_LINK_STAGGER = 0.07;
const DEFAULT_LINK_CHAR_STAGGER = 0.015;
const IMAGE_INITIAL_SCALE = 0.7;
const DEFAULT_IMAGE_START_SCALE = 0.8;
const DEFAULT_IMAGE_DURATION = 0.9;
const DEFAULT_IMAGE_STAGGER = 0.02;
const DEFAULT_SOCIAL_Y_OFFSET = 14;
const DEFAULT_SOCIAL_DURATION = 0.5;
const DEFAULT_SOCIAL_STAGGER = 0.06;
const HEADER_Y_OFFSET = -12;
const LOCATION_Y_OFFSET = 10;
const DELAY_OFFSET = 0.2;
const TAGLINE_DELAY_OFFSET = 0.08;
const IMAGE_DELAY_OFFSET = 0.1;
const SOCIAL_DELAY_OFFSET = 0.2;
const LOCATION_DELAY_OFFSET = 0.25;

/* Character-split hover reveal for the main nav links — borrowed from
   unfold-navbar's LinkHover: each character sits above its own text-shadow
   duplicate (offset 1.2em down, same color), and on hover/focus every
   character's real copy slides up out of view at a staggered delay,
   revealing the shadow copy sliding into place beneath it. Falls back to
   plain text under prefers-reduced-motion. */
export function NavLinkHover({
  label,
  href,
  charStagger,
  reduced,
  onClick,
}: {
  label: string;
  href: string;
  charStagger: number;
  reduced: boolean;
  onClick?: () => void;
}) {
  if (reduced) {
    return (
      <a href={href} onClick={onClick} className="text-white hover:text-neutral-300 transition-colors">
        {label}
      </a>
    );
  }

  return (
    <a href={href} onClick={onClick} className="group/link-hover inline-block no-underline text-white hover:text-white/90">
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="relative inline-block overflow-hidden align-middle leading-[1.08]">
        {[...label].map((char, index) => (
          <span
            key={index}
            className="relative inline-block whitespace-pre transition-transform duration-500 ease-[cubic-bezier(0.625,0.05,0,1)] group-hover/link-hover:-translate-y-[1.2em] group-focus-visible/link-hover:-translate-y-[1.2em]"
            style={{ textShadow: "0 1.2em currentColor", transitionDelay: `${index * charStagger}s` }}
          >
            {char === " " ? " " : char}
          </span>
        ))}
      </span>
    </a>
  );
}

export interface CustomNavbarLink {
  label: string;
  href: string;
}

export interface CustomNavbarSocial {
  type: string;
  href: string;
}

export interface CustomNavbarProps {
  links?: CustomNavbarLink[];
  images?: string[];
  agencyName?: string;
  socials?: CustomNavbarSocial[];
  location?: string;
  tagline?: string;
  isOpen?: boolean;
  overlayBg?: string;
  delay?: number;
  linkOffsetY?: number;
  linkDuration?: number;
  linkStagger?: number;
  /** Per-character delay (seconds) on the main links' hover reveal. */
  linkCharStagger?: number;
  imageStartScale?: number;
  imageDuration?: number;
  imageStagger?: number;
  socialOffsetY?: number;
  socialDuration?: number;
  socialStagger?: number;
  /** Action buttons rendered inside the fullscreen menu (e.g. Sign In / Get Started). */
  authActions?: ReactNode;
  onClose?: () => void;
}

export function CustomNavbar({
  links = [],
  images = [],
  agencyName = "Lumina",
  socials = [
    { type: "github", href: "https://github.com" },
    { type: "twitter", href: "https://twitter.com" },
    { type: "linkedin", href: "https://linkedin.com" },
    { type: "instagram", href: "https://instagram.com" },
  ],
  location = "San Francisco • Global",
  tagline = "Next-Generation Academic & Collaborative Intelligence",
  isOpen = false,
  overlayBg = "#191919",
  delay = 1,
  linkOffsetY = DEFAULT_LINK_Y_OFFSET,
  linkDuration = DEFAULT_LINK_DURATION,
  linkStagger = DEFAULT_LINK_STAGGER,
  linkCharStagger = DEFAULT_LINK_CHAR_STAGGER,
  imageStartScale = DEFAULT_IMAGE_START_SCALE,
  imageDuration = DEFAULT_IMAGE_DURATION,
  imageStagger = DEFAULT_IMAGE_STAGGER,
  socialOffsetY = DEFAULT_SOCIAL_Y_OFFSET,
  socialDuration = DEFAULT_SOCIAL_DURATION,
  socialStagger = DEFAULT_SOCIAL_STAGGER,
  authActions,
  onClose,
}: CustomNavbarProps) {
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const socialsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const agencyRef = useRef<HTMLHeadingElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const locationRef = useRef<HTMLSpanElement | null>(null);
  const authActionsRef = useRef<HTMLDivElement | null>(null);

  const reduceMotion = () =>
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;
  const isReducedMotion = reduceMotion();

  const killAllTweens = () => {
    gsap.killTweensOf([
      ...linksRef.current,
      ...imagesRef.current,
      ...socialsRef.current,
      agencyRef.current,
      taglineRef.current,
      locationRef.current,
      authActionsRef.current,
    ]);
  };

  const resetAnimatedElements = () => {
    gsap.set(linksRef.current, { y: linkOffsetY, opacity: 0 });
    gsap.set(imagesRef.current, { scale: IMAGE_INITIAL_SCALE, opacity: 0 });
    gsap.set(socialsRef.current, { y: socialOffsetY, opacity: 0 });
    gsap.set(agencyRef.current, { y: HEADER_Y_OFFSET, opacity: 0 });
    gsap.set(taglineRef.current, { y: HEADER_Y_OFFSET, opacity: 0 });
    gsap.set(locationRef.current, { y: LOCATION_Y_OFFSET, opacity: 0 });
    if (authActionsRef.current) gsap.set(authActionsRef.current, { y: linkOffsetY, opacity: 0 });
  };

  const setLinkRef = (index: number) => (element: HTMLDivElement | null) => {
    linksRef.current[index] = element;
  };

  const setImageRef = (index: number) => (element: HTMLDivElement | null) => {
    imagesRef.current[index] = element;
  };

  const setSocialRef = (index: number) => (element: HTMLAnchorElement | null) => {
    socialsRef.current[index] = element;
  };

  useEffect(() => {
    killAllTweens();

    if (!isOpen) return;

    resetAnimatedElements();

    if (reduceMotion()) {
      gsap.set(agencyRef.current, { y: 0, opacity: 1 });
      gsap.set(taglineRef.current, { y: 0, opacity: 1 });
      gsap.set(linksRef.current, { y: 0, opacity: 1 });
      gsap.set(imagesRef.current, { scale: 1, opacity: 1 });
      gsap.set(socialsRef.current, { y: 0, opacity: 1 });
      gsap.set(locationRef.current, { y: 0, opacity: 1 });
      if (authActionsRef.current) gsap.set(authActionsRef.current, { y: 0, opacity: 1 });
      return;
    }

    const animationDelay = Math.max(delay - DELAY_OFFSET, 0);

    gsap.fromTo(agencyRef.current, { y: HEADER_Y_OFFSET, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: animationDelay });

    gsap.fromTo(
      taglineRef.current,
      { y: HEADER_Y_OFFSET, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: animationDelay + TAGLINE_DELAY_OFFSET },
    );

    gsap.fromTo(
      linksRef.current,
      { y: linkOffsetY, opacity: 0 },
      { y: 0, opacity: 1, duration: linkDuration, ease: "power2.out", stagger: linkStagger, delay: animationDelay },
    );

    if (authActionsRef.current) {
      gsap.fromTo(
        authActionsRef.current,
        { y: linkOffsetY, opacity: 0 },
        { y: 0, opacity: 1, duration: linkDuration, ease: "power2.out", delay: animationDelay + 0.3 },
      );
    }

    gsap.fromTo(
      imagesRef.current,
      { scale: imageStartScale, opacity: 0 },
      { scale: 1, opacity: 1, duration: imageDuration, ease: "power3.out", stagger: imageStagger, delay: animationDelay + IMAGE_DELAY_OFFSET },
    );

    gsap.fromTo(
      socialsRef.current,
      { y: socialOffsetY, opacity: 0 },
      { y: 0, opacity: 1, duration: socialDuration, ease: "power2.out", stagger: socialStagger, delay: animationDelay + SOCIAL_DELAY_OFFSET },
    );

    gsap.fromTo(
      locationRef.current,
      { y: LOCATION_Y_OFFSET, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: animationDelay + LOCATION_DELAY_OFFSET },
    );
  }, [delay, imageDuration, imageStagger, imageStartScale, isOpen, linkDuration, linkOffsetY, linkStagger, socialDuration, socialOffsetY, socialStagger]);

  return (
    <div
      style={{ backgroundColor: overlayBg }}
      className="flex min-h-screen w-full flex-col justify-between gap-8 px-6 sm:px-12 md:px-20 lg:px-28 py-10 pt-24 sm:pt-28 text-white"
    >
      {(agencyName || tagline) && (
        <div className="flex flex-col gap-1">
          {agencyName && (
            <h2 ref={agencyRef} className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
              {agencyName}
            </h2>
          )}
          {tagline && (
            <p ref={taglineRef} className="text-xs sm:text-sm text-neutral-300/80 max-w-md font-light">
              {tagline}
            </p>
          )}
        </div>
      )}

      <div className="flex items-center justify-between gap-8 max-[1025px]:flex-col max-[1025px]:items-start max-[1025px]:gap-12">
        <div className="flex flex-col gap-1 sm:gap-2">
          {links.map((link, index) => (
            <div
              key={link.label}
              ref={setLinkRef(index)}
              className="z-[95] text-[7.5vw] sm:text-[6vw] max-[1025px]:text-[7vw] font-medium tracking-tight"
              style={{ opacity: 0, transform: `translateY(${linkOffsetY}px)` }}
            >
              <NavLinkHover
                label={link.label}
                href={link.href}
                charStagger={linkCharStagger}
                reduced={isReducedMotion}
                onClick={onClose}
              />
            </div>
          ))}

          {authActions && (
            <div
              ref={authActionsRef}
              className="mt-6 flex flex-wrap items-center gap-3 z-[95]"
              style={{ opacity: 0, transform: `translateY(${linkOffsetY}px)` }}
            >
              {authActions}
            </div>
          )}
        </div>

        {images && images.length > 0 && (
          <div className="flex h-full flex-col items-end justify-center gap-12 py-4 max-[1025px]:w-full max-[1025px]:items-start max-[1025px]:gap-6 max-[1025px]:py-0">
            <div className="flex items-end gap-6 max-[1025px]:w-full max-[1025px]:flex-row max-[1025px]:overflow-x-auto max-[1025px]:pb-2">
              {images.slice(0, 3).map((src, index) => (
                <div
                  key={index}
                  ref={setImageRef(index)}
                  style={{ opacity: 0, transform: `scale(${IMAGE_INITIAL_SCALE})` }}
                  className="relative h-[22vw] w-[30vw] max-w-[360px] max-h-[260px] overflow-hidden rounded-xl border border-white/10 shadow-2xl max-[1025px]:h-[36vw] max-[1025px]:w-[58vw] max-[1025px]:rounded-lg shrink-0 group/card"
                >
                  <img
                    src={src}
                    alt={`Lumina preview ${index + 1}`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 motion-reduce:scale-100 motion-reduce:transition-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-800/80 pt-6">
        <div className="flex items-center gap-5 text-neutral-300">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              ref={setSocialRef(index)}
              className="text-neutral-400 hover:text-white transition-colors duration-200"
              style={{ opacity: 0, transform: `translateY(${socialOffsetY}px)` }}
              aria-label={social.type}
            >
              {SOCIAL_ICONS[social.type] ?? social.type}
            </a>
          ))}
        </div>
        {location && (
          <span ref={locationRef} className="text-xs sm:text-sm text-neutral-400">
            {location}
          </span>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export const NAV_CONFIG: Partial<FullscreenNavProps> = {
  brand: "Lumina",
  brandHref: "/",
  clipOrigin: "bottom",
  overlayBg: "#191919",
  headerClosedColor: "#ffffff",
  headerOpenColor: "#ffffff",
  openDuration: 1.1,
  closeDuration: 1.0,
};

export const NAV_CONTENT: Partial<CustomNavbarProps> = {
  agencyName: "Lumina",
  tagline: "Next-Generation Academic & Collaborative Intelligence",
  location: "San Francisco • Global",
  links: [
    { label: "Overview", href: "#" },
    { label: "Features", href: "#features" },
    { label: "Solutions", href: "#solutions" },
    { label: "Academics", href: "#academics" },
    { label: "Pricing", href: "#pricing" },
  ],
  images: [],
  socials: [
    { type: "github", href: "https://github.com" },
    { type: "twitter", href: "https://twitter.com" },
    { type: "linkedin", href: "https://linkedin.com" },
    { type: "instagram", href: "https://instagram.com" },
  ],
};

export interface ImmersiveFullscreenNavProps {
  navConfig?: Partial<FullscreenNavProps>;
  navContent?: Partial<CustomNavbarProps>;
  overlayBg?: string;
  headerClosedColor?: string;
  headerOpenColor?: string;
  headerActions?: ReactNode;
  brand?: ReactNode;
  brandHref?: string;
  linkColor?: string;
  linkHoverColor?: string;
  ease?: string;
  clipOrigin?: "top" | "bottom" | "left" | "right";
  openDuration?: number;
  closeDuration?: number;
  linkDuration?: number;
  linkStagger?: number;
  linkCharStagger?: number;
  linkOffsetY?: number;
  imageDuration?: number;
  imageStagger?: number;
  imageStartScale?: number;
  socialDuration?: number;
  socialStagger?: number;
  socialOffsetY?: number;
  authActions?: ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

/**
 * A fixed header (brand + hamburger) that wipes a full-screen nav panel open
 * via `clip-path`, animating in a brand block, nav links, an image row, and
 * socials. `navConfig` controls the shell (`FullscreenNav`); `navContent`
 * controls the panel's content (`CustomNavbar`). Respects
 * `prefers-reduced-motion` throughout — the clip-path wipe becomes a plain
 * fade and every staggered reveal becomes an instant set.
 */
export default function ImmersiveFullscreenNav({
  navConfig = NAV_CONFIG,
  navContent = NAV_CONTENT,
  ...props
}: ImmersiveFullscreenNavProps) {
  const {
    overlayBg,
    headerClosedColor,
    headerOpenColor,
    headerActions,
    brand,
    brandHref,
    linkColor,
    linkHoverColor,
    ease,
    clipOrigin,
    openDuration,
    closeDuration,
    linkDuration,
    linkStagger,
    linkCharStagger,
    linkOffsetY,
    imageDuration,
    imageStagger,
    imageStartScale,
    socialDuration,
    socialStagger,
    socialOffsetY,
    authActions,
    onOpen,
    onClose,
  } = props;

  const config: FullscreenNavProps = {
    ...NAV_CONFIG,
    ...navConfig,
    ...(overlayBg !== undefined ? { overlayBg } : {}),
    ...(headerClosedColor !== undefined ? { headerClosedColor } : {}),
    ...(headerOpenColor !== undefined ? { headerOpenColor } : {}),
    ...(headerActions !== undefined ? { headerActions } : {}),
    ...(brand !== undefined ? { brand } : {}),
    ...(brandHref !== undefined ? { brandHref } : {}),
    ...(linkColor !== undefined ? { linkColor } : {}),
    ...(linkHoverColor !== undefined ? { linkHoverColor } : {}),
    ...(ease !== undefined ? { ease } : {}),
    ...(clipOrigin !== undefined ? { clipOrigin } : {}),
    ...(openDuration !== undefined ? { openDuration } : {}),
    ...(closeDuration !== undefined ? { closeDuration } : {}),
    ...(onOpen !== undefined ? { onOpen } : {}),
    ...(onClose !== undefined ? { onClose } : {}),
  };

  const content: CustomNavbarProps = {
    ...NAV_CONTENT,
    ...navContent,
    ...(linkDuration !== undefined ? { linkDuration } : {}),
    ...(linkStagger !== undefined ? { linkStagger } : {}),
    ...(linkCharStagger !== undefined ? { linkCharStagger } : {}),
    ...(linkOffsetY !== undefined ? { linkOffsetY } : {}),
    ...(imageDuration !== undefined ? { imageDuration } : {}),
    ...(imageStagger !== undefined ? { imageStagger } : {}),
    ...(imageStartScale !== undefined ? { imageStartScale } : {}),
    ...(socialDuration !== undefined ? { socialDuration } : {}),
    ...(socialStagger !== undefined ? { socialStagger } : {}),
    ...(socialOffsetY !== undefined ? { socialOffsetY } : {}),
    ...(authActions !== undefined ? { authActions } : {}),
  };

  return (
    <FullscreenNav {...config}>
      {(isOpen, onClosePanel) => (
        <CustomNavbar
          {...content}
          isOpen={isOpen}
          overlayBg={config.overlayBg}
          delay={config.openDuration}
          onClose={onClosePanel}
        />
      )}
    </FullscreenNav>
  );
}
