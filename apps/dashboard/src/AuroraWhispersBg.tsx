import React from "react";
import { cn } from "./lib/utils";

export interface AuroraWhispersBgProps {
  children?: React.ReactNode;
  className?: string;
}

export const AuroraWhispersBg: React.FC<AuroraWhispersBgProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("relative w-full overflow-hidden bg-black", className)}>
      {/* Aurora Fiery Amber Corner Whispers with Pitch Black Base */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 75% 55% at 86% 12%, rgba(247, 243, 235, 0.12), rgba(247, 243, 235, 0.04) 42%, transparent 70%),
            radial-gradient(ellipse 70% 50% at 10% 32%, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02) 40%, transparent 68%),
            radial-gradient(ellipse 75% 55% at 90% 55%, rgba(247, 243, 235, 0.10), rgba(247, 243, 235, 0.03) 42%, transparent 70%),
            radial-gradient(ellipse 70% 50% at 8% 76%, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02) 40%, transparent 68%),
            radial-gradient(ellipse 72% 52% at 85% 94%, rgba(247, 243, 235, 0.10), rgba(247, 243, 235, 0.03) 40%, transparent 68%),
            #191919
          `,
        }}
      />

      {/* Tactile Film Grain / Noise Overlay matching reference image */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.25] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

export default AuroraWhispersBg;
