import React, { useEffect, useRef } from "react";
import { createGlobe, type COBEOptions } from "./cobe";

interface GlobeProps {
  className?: string;
  config?: Partial<COBEOptions>;
}

export const Globe: React.FC<GlobeProps> = ({ className, config }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const thetaRef = useRef(0.15);

  useEffect(() => {
    let width = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onResize = () => {
      if (canvas) {
        width = canvas.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    let globeInstance: any = null;

    const globeConfig: COBEOptions = {
      width: width || 600,
      height: width || 600,
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      phi: 0,
      theta: 0.15,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      mapBaseBrightness: 0.05,
      baseColor: [0.8, 0.8, 0.85],
      markerColor: [1, 0.38, 0.2],
      glowColor: [0.18, 0.22, 0.28],
      scale: 1,
      offset: [0, 0],
      ...config,
      onRender: (state) => {
        // Auto-rotation when not interacting
        if (!pointerInteracting.current) {
          phiRef.current += 0.0035;
        } else {
          phiRef.current += pointerInteractionMovement.current;
          pointerInteractionMovement.current *= 0.92;
        }
        state.phi = phiRef.current;
        state.theta = thetaRef.current;
        if (config?.onRender) {
          config.onRender(state);
        }
      },
    };

    globeInstance = createGlobe(canvas, globeConfig);

    return () => {
      window.removeEventListener("resize", onResize);
      if (globeInstance) {
        globeInstance.destroy();
      }
    };
  }, [config]);

  return (
    <div
      className={`relative flex aspect-square w-full max-w-[620px] items-center justify-center ${
        className || ""
      }`}
      style={{ touchAction: "none" }}
    >
      {/* Atmosphere radial glow backdrop */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(247, 243, 235, 0.08) 0%, rgba(25, 25, 25, 0.04) 40%, transparent 70%)",
          filter: "blur(24px)",
        }}
        aria-hidden="true"
      />

      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-grab active:cursor-grabbing"
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
          opacity: 1,
          transition: "opacity 0.8s ease",
        }}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grabbing";
          }
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab";
          }
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab";
          }
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.005;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.005;
          }
        }}
      />
    </div>
  );
};

export default Globe;
