"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

/**
 * Provides the app-wide `theme` ("dark" | "light") and `setTheme` to any
 * descendant via useTheme(). Kept at the root so both HomeContent and deeply
 * nested components (e.g. the Taskbar) can read/update it without prop drilling.
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  // respect the OS color-scheme preference on first load
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
};
