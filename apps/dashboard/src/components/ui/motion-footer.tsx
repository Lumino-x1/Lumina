"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./MotionFooter.css";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    // React strict mode compatible GSAP context cleanup
    const ctx = gsap.context(() => {
      if (wordmarkRef.current) {
        gsap.fromTo(
          wordmarkRef.current,
          { y: "8vh", scale: 0.9, opacity: 0.3 },
          {
            y: "0vh",
            scale: 1,
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 85%",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div ref={wrapperRef} className="cinematic-footer-outer">
      <footer className="cinematic-footer-wrapper">
        {/* Soft Monochromatic Ambient Glow matching #191919 landing page */}
        <div className="footer-aurora" aria-hidden="true" />

        {/* Architectural Grid Pattern */}
        <div className="footer-bg-grid" aria-hidden="true" />

        {/* Clean Center Wordmark with Lumina Logo Emblem */}
        <div className="footer-hero-container">
          <div className="footer-brand-block">
            <svg
              className="footer-brand-logo-icon"
              viewBox="0 0 88 64"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.2 38.6L20.8 13.2L27.6 17.1L13 42.5L6.2 38.6Z" />
              <path d="M18.4 47.8L37.2 9.4L44.4 13.6L25.6 52L18.4 47.8Z" />
              <path d="M32.8 54.4L54.6 5.8L62 10.2L40.2 58.8L32.8 54.4Z" />
              <path d="M48.2 59.6L69.8 11.4L77 15.6L55.4 63.8L48.2 59.6Z" />
            </svg>
            <h2 ref={wordmarkRef} className="footer-hero-wordmark">
              LUMINA
            </h2>
          </div>
        </div>

        {/* Bottom Bar: Rights Reserved & Back to Top */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright-wrapper">
            <svg
              className="footer-mini-logo"
              viewBox="0 0 88 64"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.2 38.6L20.8 13.2L27.6 17.1L13 42.5L6.2 38.6Z" />
              <path d="M18.4 47.8L37.2 9.4L44.4 13.6L25.6 52L18.4 47.8Z" />
              <path d="M32.8 54.4L54.6 5.8L62 10.2L40.2 58.8L32.8 54.4Z" />
              <path d="M48.2 59.6L69.8 11.4L77 15.6L55.4 63.8L48.2 59.6Z" />
            </svg>
            <p className="footer-copyright">
              © 2026 Lumina. All rights reserved.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="footer-back-to-top"
            aria-label="Back to top"
            title="Back to top"
          >
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}

export default CinematicFooter;
