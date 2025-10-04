"use client";

import React, { useState, useEffect } from "react";
import Waves from "./Waves";
import FloatingObject from "./FloatingObject";
import { AudioPlayerProvider } from "./AudioPlayer";
import MuteButton from "./MuteButton";
import ThemeButton from "./ThemeButton";

const Home = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  return (
    <AudioPlayerProvider>
      <div
        className="min-h-dvh relative"
        style={{
          backgroundColor: "var(--bg)",
          overflow: "hidden",
        }}
      >
        <div className="absolute flex flex-row top-4 left-4 z-10">
          <ThemeButton theme={theme} setTheme={setTheme} />
          <MuteButton />
        </div>

        <p
          className="absolute flex w-full justify-center bottom-0 font-light mb-2 z-11"
          style={{ fontSize: "0.875rem" }}
        >
          © 2025 Serjo Barron
        </p>

        <Waves style={theme === "dark" ? "sunset" : "starryNight"} />
        <FloatingObject />

        {children}
      </div>
    </AudioPlayerProvider>
  );
};

export default Home;
