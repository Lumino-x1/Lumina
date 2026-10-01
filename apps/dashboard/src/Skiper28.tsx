import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Skiper48 } from "./Skiper48";
import { TextAnimate } from "@/registry/magicui/text-animate";
import "./Skiper28.css";

const Skiper28 = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0.85, 1, 1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.85], [15, 0, -10]);

  return (
    <section ref={targetRef} className="skiper-section" aria-label="Campus Vision">
      <div className="skiper-container">
        <motion.div
          style={{ opacity, y }}
          className="skiper-content-wrap"
        >
          {/* Left Side: Clean Image Slider Carousel (no border) */}
          <div className="skiper-left-slider">
            <Skiper48 />
          </div>

          {/* Right Side: Architectural Dashed Blueprint Framed Text Component */}
          <div className="skiper-right-text">
            <div className="skiper-text-blueprint-frame">
              <div className="skiper-text-blueprint-box" aria-hidden="true">
                <div className="skiper-blueprint-neon-pip" aria-hidden="true" />
              </div>
              
              <div className="skiper-text-block">
                <TextAnimate animation="blurIn" as="div" delay={0} className="vision-line">
                  <span className="text-white">One verified identity.</span>{" "}
                  <span className="text-muted">One connected campus.</span>
                </TextAnimate>

                <TextAnimate animation="blurIn" as="div" delay={0.12} className="vision-line">
                  <span className="text-body">Discover people, communities,</span>
                </TextAnimate>

                <TextAnimate animation="blurIn" as="div" delay={0.24} className="vision-line">
                  <span className="text-body">opportunities, and everything that makes</span>
                </TextAnimate>

                <TextAnimate animation="blurIn" as="div" delay={0.36} className="vision-line">
                  <span className="text-body">college life connected.</span>
                </TextAnimate>

                {/* White Contact Us Button */}
                <div className="skiper-cta-row">
                  <a href="#contact" className="skiper-contact-btn">
                    <span>Contact us</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { Skiper28 };
export default Skiper28;
