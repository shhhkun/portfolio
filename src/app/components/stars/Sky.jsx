"use client";

import React from "react";
import NightSky from "./NightSky";
import DaySky from "./DaySky";

/**
 * Theme-aware sky switch: renders the night sky (stars + moon) on dark theme
 * and the day sky (sun) on light theme.
 */
const Sky = ({ theme }) => {
  return theme === "dark" ? <NightSky /> : <DaySky />;
};

export default Sky;
