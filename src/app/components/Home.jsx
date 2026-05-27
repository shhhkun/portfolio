"use client";

import React, { useState, useEffect } from "react";
import { AudioPlayerProvider } from "./AudioPlayer";
import HomeContent from "./HomeContent";

const Home = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  return (
    <AudioPlayerProvider>
      <HomeContent theme={theme} setTheme={setTheme}>
        {children}
      </HomeContent>
    </AudioPlayerProvider>
  );
};

export default Home;
