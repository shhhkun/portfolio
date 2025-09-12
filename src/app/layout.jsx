"use client";

import React, { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

import Waves from "./components/Waves";
import FloatingObject from "./components/FloatingObject";
import { AudioPlayerProvider } from "./components/AudioPlayer";
import MuteButton from "./components/MuteButton";
import ThemeButton from "./components/ThemeButton";

const Layout = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  return (
    <html lang="en">
      <body>
        <Analytics />
        
        <AudioPlayerProvider>
          <div
            className="min-h-screen relative"
            style={{
              backgroundColor: "var(--bg)",
              overflow: "hidden",
            }}
          >
            <div className="absolute flex flex-row top-4 left-4 z-10">
              <ThemeButton theme={theme} setTheme={setTheme} />
              <MuteButton />
            </div>

            <Waves style={theme === "dark" ? "sunset" : "starryNight"} />
            <FloatingObject />
            
            {children}
            
          </div>
        </AudioPlayerProvider>
      </body>
    </html>
  );
};

export default Layout;
