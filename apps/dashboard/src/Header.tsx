'use client';

import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
	CustomNavbar,
	CLIPS,
	useFocusTrap,
	type CustomNavbarLink,
	type CustomNavbarSocial,
} from '@/components/ui/immersive-fullscreen-nav';
import {
	type LucideIcon,
	CodeIcon,
	GlobeIcon,
	LayersIcon,
	UserPlusIcon,
	Users,
	Star,
	FileText,
	Shield,
	RotateCcw,
	Handshake,
	Leaf,
	HelpCircle,
	BarChart,
	PlugIcon,
} from 'lucide-react';

type LinkItem = {
	title: string;
	href: string;
	icon: LucideIcon;
	description?: string;
};

export interface HeaderProps {
	onOpenAuth?: (mode: 'login' | 'signup') => void;
	user?: { name?: string; email?: string } | null;
	onOpenDashboard?: () => void;
}

const MOBILE_NAV_LINKS: CustomNavbarLink[] = [
	{ label: 'Overview', href: '#' },
	{ label: 'Features', href: '#features' },
	{ label: 'Solutions', href: '#solutions' },
	{ label: 'Academics', href: '#academics' },
	{ label: 'Pricing', href: '#pricing' },
];

const MOBILE_SOCIALS: CustomNavbarSocial[] = [
	{ type: 'github', href: 'https://github.com' },
	{ type: 'twitter', href: 'https://twitter.com' },
	{ type: 'linkedin', href: 'https://linkedin.com' },
	{ type: 'instagram', href: 'https://instagram.com' },
];

export function Header({ onOpenAuth, user, onOpenDashboard }: HeaderProps) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const scrolled = useScroll(10);

	const overlayRef = useRef<HTMLElement | null>(null);
	const linksWrapperRef = useRef<HTMLDivElement | null>(null);
	const timelineRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);
	const isAnimatingRef = useRef(false);
	const rootRef = useRef<HTMLDivElement | null>(null);
	const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

	const reduceMotion = () =>
		typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true;
	const isReducedMotion = reduceMotion();

	const handleSignIn = () => {
		if (mobileOpen) onCloseMenu();
		if (onOpenAuth) onOpenAuth('login');
		else window.location.hash = 'login';
	};

	const handleGetStarted = () => {
		if (mobileOpen) onCloseMenu();
		if (user) {
			if (onOpenDashboard) onOpenDashboard();
			else window.location.hash = 'dashboard';
		} else {
			if (onOpenAuth) onOpenAuth('signup');
			else window.location.hash = 'signup';
		}
	};

	// GSAP Fullscreen Mobile Reveal
	const onOpenMenu = () => {
		setMobileOpen(true);
		timelineRef.current?.kill();

		gsap.set(overlayRef.current, { clipPath: CLIPS.bottom.closedInitial });
		gsap.set(linksWrapperRef.current, { opacity: 1, scale: 1 });

		if (isReducedMotion) {
			gsap.set(overlayRef.current, { clipPath: CLIPS.bottom.open, autoAlpha: 0 });
			timelineRef.current = gsap.to(overlayRef.current, {
				autoAlpha: 1,
				duration: 0.2,
				ease: 'power2.out',
				onStart: () => {
					isAnimatingRef.current = true;
				},
				onComplete: () => {
					isAnimatingRef.current = false;
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
			},
		});

		timelineRef.current = timeline;

		timeline.to(overlayRef.current, {
			clipPath: CLIPS.bottom.open,
			duration: 1.0,
			delay: 0.1,
			ease: 'power4.inOut',
		});
	};

	const onCloseMenu = () => {
		setMobileOpen(false);
		timelineRef.current?.kill();

		if (isReducedMotion) {
			gsap.set(linksWrapperRef.current, { scale: 1, opacity: 1 });
			timelineRef.current = gsap.to(overlayRef.current, {
				autoAlpha: 0,
				duration: 0.2,
				ease: 'power2.out',
				onStart: () => {
					isAnimatingRef.current = true;
				},
				onComplete: () => {
					isAnimatingRef.current = false;
					gsap.set(overlayRef.current, { clipPath: CLIPS.bottom.closedFinal });
				},
			});
			gsap.set(overlayRef.current, { clipPath: CLIPS.bottom.closedFinal });
			return;
		}

		const timeline = gsap.timeline({
			onStart: () => {
				isAnimatingRef.current = true;
			},
			onComplete: () => {
				isAnimatingRef.current = false;
			},
		});

		timelineRef.current = timeline;

		timeline
			.to(linksWrapperRef.current, { scale: 0.9, opacity: 0.5, duration: 0.6, ease: 'power2.in' })
			.to(overlayRef.current, { clipPath: CLIPS.bottom.closedFinal, duration: 0.9, ease: 'power4.inOut' }, '<');
	};

	const onToggleMenu = () => {
		if (isAnimatingRef.current) return;
		if (mobileOpen) {
			onCloseMenu();
			return;
		}
		onOpenMenu();
	};

	// Close mobile menu if resized to desktop
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768 && mobileOpen) {
				onCloseMenu();
			}
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [mobileOpen]);

	// Lock scroll when mobile menu is open
	useEffect(() => {
		document.body.style.overflow = mobileOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [mobileOpen]);

	useFocusTrap({
		active: mobileOpen,
		containerRef: rootRef,
		initialFocusRef: toggleButtonRef,
		onEscape: onCloseMenu,
	});

	// In-menu actions for the mobile overlay
	const mobileAuthActions = (
		<div className="flex flex-wrap items-center gap-3">
			{user ? (
				<Button
					size="lg"
					className="h-11 px-6 bg-white text-neutral-900 hover:bg-neutral-200 font-semibold text-sm rounded-md shadow-md transition-colors"
					onClick={handleGetStarted}
				>
					Go to Dashboard →
				</Button>
			) : (
				<>
					<Button
						variant="outline"
						size="lg"
						className="h-11 w-36 border-neutral-700 hover:bg-neutral-800 text-white font-medium text-sm rounded-md transition-colors justify-center"
						onClick={handleSignIn}
					>
						Sign In
					</Button>
					<Button
						size="lg"
						className="h-11 w-36 bg-white text-neutral-900 hover:bg-neutral-200 font-semibold text-sm rounded-md shadow-md transition-colors justify-center"
						onClick={handleGetStarted}
					>
						Get Started
					</Button>
				</>
			)}
		</div>
	);

	return (
		<header
			ref={rootRef}
			className={cn(
				'sticky top-0 z-50 w-full border-b border-transparent transition-all duration-200',
				{
					'bg-[#191919]/90 supports-[backdrop-filter]:bg-[#191919]/75 border-neutral-800 backdrop-blur-lg shadow-sm':
						scrolled || mobileOpen,
				}
			)}
		>
			<div className="mx-auto flex h-16 w-full max-w-full items-center justify-between px-6 sm:px-8 lg:px-12">
				{/* Left: Brand Logo & Desktop Navigation */}
				<div className="flex items-center gap-10 lg:gap-14">
					<a
						href="#"
						className="inline-flex items-center justify-center h-9 px-2 text-white hover:bg-neutral-800/60 rounded-md transition-colors select-none"
						aria-label="Lumina Home"
					>
						<LuminaLogo />
					</a>

					{/* 1. PREVIOUS NAVBAR: Web View Navigation Menu (Desktop md:flex) */}
					<NavigationMenu className="hidden md:flex">
						<NavigationMenuList className="flex items-center gap-2 lg:gap-3">
							<NavigationMenuItem>
								<NavigationMenuTrigger className="bg-transparent text-neutral-200 hover:text-white hover:bg-neutral-800/60 h-9 px-4 inline-flex items-center justify-center text-sm font-medium rounded-md">
									Product
								</NavigationMenuTrigger>
								<NavigationMenuContent className="bg-[#1c1c1c] p-1.5 border-neutral-800 text-white shadow-2xl rounded-lg">
									<ul className="bg-[#181818] grid w-[32rem] grid-cols-2 gap-2 rounded-md border border-neutral-800/80 p-2 shadow">
										{productLinks.map((item, i) => (
											<li key={i}>
												<ListItem {...item} />
											</li>
										))}
									</ul>
									<div className="p-2.5">
										<p className="text-neutral-400 text-sm">
											Interested?{' '}
											<button
												type="button"
												onClick={handleGetStarted}
												className="text-white font-medium hover:underline bg-transparent border-none cursor-pointer p-0"
											>
												Schedule a demo
											</button>
										</p>
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuTrigger className="bg-transparent text-neutral-200 hover:text-white hover:bg-neutral-800/60 h-9 px-4 inline-flex items-center justify-center text-sm font-medium rounded-md">
									Company
								</NavigationMenuTrigger>
								<NavigationMenuContent className="bg-[#1c1c1c] p-1.5 border-neutral-800 text-white shadow-2xl rounded-lg">
									<div className="grid w-[32rem] grid-cols-2 gap-2">
										<ul className="bg-[#181818] space-y-2 rounded-md border border-neutral-800/80 p-2 shadow">
											{companyLinks.map((item, i) => (
												<li key={i}>
													<ListItem {...item} />
												</li>
											))}
										</ul>
										<ul className="space-y-2 p-2">
											{companyLinks2.map((item, i) => (
												<li key={i}>
													<NavigationMenuLink
														href={item.href}
														className="flex p-2 hover:bg-neutral-800 flex-row rounded-md items-center gap-x-2.5 text-neutral-200 hover:text-white text-sm"
													>
														<item.icon className="text-neutral-300 size-4 shrink-0" />
														<span className="font-medium">{item.title}</span>
													</NavigationMenuLink>
												</li>
											))}
										</ul>
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuLink
									href="#pricing"
									className="h-9 px-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-neutral-800/60 hover:text-white text-neutral-200 no-underline cursor-pointer"
								>
									Pricing
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				{/* 2. PREVIOUS NAVBAR: Web View Auth Action Buttons (Desktop md:flex) */}
				<div className="hidden items-center gap-3.5 md:flex shrink-0">
					{user ? (
						<Button className="h-9 px-4 font-medium" onClick={handleGetStarted}>
							Dashboard
						</Button>
					) : (
						<>
							<Button
								variant="outline"
								className="h-9 w-[116px] border-neutral-700 hover:bg-neutral-800 text-neutral-200 font-medium justify-center text-center"
								onClick={handleSignIn}
							>
								Sign In
							</Button>
							<Button
								className="h-9 w-[116px] bg-white text-neutral-900 hover:bg-neutral-200 font-medium shadow-sm justify-center text-center"
								onClick={handleGetStarted}
							>
								Get Started
							</Button>
						</>
					)}
				</div>

				{/* 3. MOBILE VIEW ONLY: Animated Hamburger Toggle (md:hidden) */}
				<div className="flex md:hidden items-center shrink-0 z-50">
					<button
						ref={toggleButtonRef}
						onClick={onToggleMenu}
						aria-label="Toggle menu"
						aria-expanded={mobileOpen}
						className="flex size-10 cursor-pointer flex-col items-center justify-center gap-1.5 p-2 rounded-md hover:bg-white/10 transition-colors shrink-0"
					>
						<span
							className={cn(
								'block h-0.5 w-5 bg-white transition-all duration-500 ease-in-out',
								mobileOpen ? 'translate-y-[8px] rotate-45' : ''
							)}
						/>
						<span
							className={cn(
								'block h-0.5 w-5 bg-white transition-all duration-300',
								mobileOpen ? 'scale-x-0 opacity-0' : ''
							)}
						/>
						<span
							className={cn(
								'block h-0.5 w-5 bg-white transition-all duration-500 ease-in-out',
								mobileOpen ? '-translate-y-[8px] -rotate-45' : ''
							)}
						/>
					</button>
				</div>
			</div>

			{/* 4. MOBILE VIEW ONLY: GSAP Fullscreen Wipe Panel (Without images, md:hidden) */}
			{typeof window !== 'undefined' &&
				createPortal(
					<nav
						ref={overlayRef}
						style={{ clipPath: CLIPS.bottom.closedInitial, backgroundColor: '#191919' }}
						className={cn(
							'fixed inset-0 z-40 flex flex-col items-center justify-center overflow-y-auto md:hidden',
							mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
						)}
						aria-hidden={!mobileOpen}
						role="navigation"
					>
						<div
							ref={linksWrapperRef}
							className="flex min-h-screen w-screen flex-col items-center justify-center"
						>
							<CustomNavbar
								isOpen={mobileOpen}
								overlayBg="#191919"
								delay={0.9}
								agencyName="Lumina Intelligence"
								tagline="Next-Generation Academic & Collaborative Intelligence"
								location="San Francisco • Global"
								links={MOBILE_NAV_LINKS}
								images={[]}
								socials={MOBILE_SOCIALS}
								authActions={mobileAuthActions}
								onClose={onCloseMenu}
							/>
						</div>
					</nav>,
					document.body
				)}
		</header>
	);
}

function ListItem({
	title,
	description,
	icon: Icon,
	className,
	href,
	onClick,
	...props
}: React.ComponentProps<typeof NavigationMenuLink> & LinkItem & { onClick?: () => void }) {
	return (
		<NavigationMenuLink
			className={cn(
				'w-full flex flex-row gap-x-2.5 hover:bg-neutral-800 hover:text-white rounded-md p-2 text-neutral-200 transition-colors',
				className
			)}
			{...props}
			asChild
		>
			<a href={href} onClick={onClick}>
				<div className="bg-neutral-900/80 flex aspect-square size-10 items-center justify-center rounded-md border border-neutral-800 shadow-sm shrink-0">
					<Icon className="text-neutral-200 size-4.5" />
				</div>
				<div className="flex flex-col items-start justify-center">
					<span className="font-medium text-sm text-neutral-100">{title}</span>
					{description && <span className="text-neutral-400 text-xs line-clamp-1">{description}</span>}
				</div>
			</a>
		</NavigationMenuLink>
	);
}

const productLinks: LinkItem[] = [
	{
		title: 'Website Builder',
		href: '#',
		description: 'Create responsive websites with ease',
		icon: GlobeIcon,
	},
	{
		title: 'Cloud Platform',
		href: '#',
		description: 'Deploy and scale apps in the cloud',
		icon: LayersIcon,
	},
	{
		title: 'Team Collaboration',
		href: '#',
		description: 'Tools to help your teams work better together',
		icon: UserPlusIcon,
	},
	{
		title: 'Analytics',
		href: '#',
		description: 'Track and analyze your website traffic',
		icon: BarChart,
	},
	{
		title: 'Integrations',
		href: '#',
		description: 'Connect your apps and services',
		icon: PlugIcon,
	},
	{
		title: 'API',
		href: '#',
		description: 'Build custom integrations with our API',
		icon: CodeIcon,
	},
];

const companyLinks: LinkItem[] = [
	{
		title: 'About Us',
		href: '#',
		description: 'Learn more about our story and team',
		icon: Users,
	},
	{
		title: 'Customer Stories',
		href: '#',
		description: 'See how we’ve helped our clients succeed',
		icon: Star,
	},
	{
		title: 'Partnerships',
		href: '#',
		icon: Handshake,
		description: 'Collaborate with us for mutual growth',
	},
];

const companyLinks2: LinkItem[] = [
	{
		title: 'Terms of Service',
		href: '#',
		icon: FileText,
	},
	{
		title: 'Privacy Policy',
		href: '#',
		icon: Shield,
	},
	{
		title: 'Refund Policy',
		href: '#',
		icon: RotateCcw,
	},
	{
		title: 'Blog',
		href: '#',
		icon: Leaf,
	},
	{
		title: 'Help Center',
		href: '#',
		icon: HelpCircle,
	},
];

function useScroll(threshold: number) {
	const [scrolled, setScrolled] = React.useState(false);

	const onScroll = React.useCallback(() => {
		setScrolled(window.scrollY > threshold);
	}, [threshold]);

	React.useEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [onScroll]);

	React.useEffect(() => {
		onScroll();
	}, [onScroll]);

	return scrolled;
}

export const LuminaLogo = () => (
	<span
		className="text-[26px] italic font-normal tracking-[-0.02em] text-white leading-none select-none"
		style={{ fontFamily: "'Instrument Serif', 'Times New Roman', serif" }}
	>
		Lumina
	</span>
);

export default Header;
