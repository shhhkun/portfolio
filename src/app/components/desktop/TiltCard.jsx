"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const TiltCard = ({ children, maxTilt = 6 }) => {
  const ref = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const rotateX = useMotionValue(0); // vertical tilt
  const rotateY = useMotionValue(0); // horizontal tilt
  const springX = useSpring(rotateY, { stiffness: 180, damping: 20 });
  const springY = useSpring(rotateX, { stiffness: 180, damping: 20 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePref = () => setReducedMotion(mediaQuery.matches);
    updatePref();
    mediaQuery.addEventListener("change", updatePref);
    return () => mediaQuery.removeEventListener("change", updatePref);
  }, []);

  useEffect(() => {
    if (reducedMotion || !ref.current) return;

    const el = ref.current;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      rotateX.set((0.5 - py) * maxTilt * 2);
      rotateY.set((px - 0.5) * maxTilt * 2);
    };

    const handleMouseLeave = () => {
      rotateX.set(0);
      rotateY.set(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [reducedMotion, maxTilt, rotateX, rotateY]);

  return (
    <div ref={ref} style={{ perspective: "1100px" }}>
      <motion.div
        style={{
          rotateX: springY,
          rotateY: springX,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default TiltCard;
