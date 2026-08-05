"use client";

import React, { useState, useEffect } from "react";
import MuteButton from "./MuteButton";
import ThemeButton from "./ThemeButton";
import Waves from "./Waves";

const HomeContent = ({ children, theme, setTheme }) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePref = () => setReducedMotion(mediaQuery.matches);
    updatePref();
    mediaQuery.addEventListener("change", updatePref);
    return () => mediaQuery.removeEventListener("change", updatePref);
  }, []);

  return (
    <div
      className="relative min-h-dvh"
      style={{
        backgroundColor: "var(--bg)",
        overflow: "hidden",
      }}
    >
      <div className="absolute top-4 left-4 z-10 flex flex-row">
        <ThemeButton theme={theme} setTheme={setTheme} />
        <MuteButton />
      </div>

      {/* Subtle radial glow behind the hero card — helps the 3D tilt read */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 42%, var(--hero-glow) 0%, transparent 70%)",
          opacity: reducedMotion ? 0.35 : 1,
          transition: "opacity 0.6s ease",
        }}
      />

      <Waves
        style={theme === "dark" ? "sunset" : "starryNight"}
        paused={reducedMotion}
      />

      {children}
    </div>
  );
};

export default HomeContent;
