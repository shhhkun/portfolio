"use client";

import React, { useState, useEffect } from "react";
import MuteButton from "./MuteButton";
import ThemeButton from "./ThemeButton";
import Waves from "./Waves";
import NightSky from "./stars/NightSky";

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

      <NightSky theme={theme} />

      <Waves
        style={theme === "dark" ? "sunset" : "starryNight"}
        paused={reducedMotion}
      />

      {children}
    </div>
  );
};

export default HomeContent;
