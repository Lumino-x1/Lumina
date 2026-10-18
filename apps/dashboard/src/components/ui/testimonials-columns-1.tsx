"use client";
import React from "react";
import { motion } from "framer-motion";

export const testimonials = [
  {
    text: "Lumina turned our chaotic campus Discord and WhatsApp groups into one unified ecosystem. Finding team members for projects has never been easier.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    name: "Aarav Patel",
    role: "CS Student & Hackathon Lead",
  },
  {
    text: "The speed and responsiveness are incredible. Our student organization moved all announcements and events here, and engagement jumped 300%.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    name: "Sophia Chen",
    role: "Design Club President",
  },
  {
    text: "Being able to publish markdown notes, research breakdowns, and interactive code snippets in one feed completely transformed how we study.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    name: "Marcus Vance",
    role: "Engineering Senior",
  },
  {
    text: "Lumina is the campus hub we've wanted for years. Everything from campus events to lost & found items is finally in one beautiful place.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    name: "Elena Rostova",
    role: "Student Council VP",
  },
  {
    text: "The sleek dark theme makes writing and reading long technical threads an absolute joy. It feels like Notion meets Twitter for universities.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    name: "Devin Kothari",
    role: "AI Research Fellow",
  },
  {
    text: "Graduating seniors stay deeply connected with current juniors for mentorship, mock interviews, and career guidance. A genuine game-changer.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    name: "Mira Al-Mansoor",
    role: "Alumni Relations Lead",
  },
];

export type TestimonialItem = (typeof testimonials)[number];

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={`w-[250px] sm:w-[280px] shrink-0 ${props.className || ""}`}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 18,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-3.5 pb-3.5 bg-transparent"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="aspect-square p-5 sm:p-6 rounded-xl border border-white/[0.08] bg-[#0c0c0e] text-white shadow-xl shadow-black/80 w-full flex flex-col justify-between backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-[#141417]"
                  style={{ fontFamily: "var(--font-sans, 'Plus Jakarta Sans', sans-serif)" }}
                  key={i}
                >
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-[13px] sm:text-[13.5px] leading-relaxed text-zinc-300 font-normal tracking-[-0.015em]">
                      "{text}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-3.5 border-t border-white/[0.06] shrink-0">
                    <img
                      width={36}
                      height={36}
                      src={image}
                      alt={name}
                      loading="lazy"
                      className="h-9 w-9 rounded-full object-cover border border-white/15 shrink-0"
                    />
                    <div className="flex flex-col text-left min-w-0">
                      <div className="font-medium text-white tracking-tight leading-snug text-[13px] truncate">
                        {name}
                      </div>
                      <div className="leading-snug text-zinc-400 text-[11px] tracking-tight truncate font-normal">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
