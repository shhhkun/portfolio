"use client";

import React from "react";
import { AudioPlayerProvider } from "./AudioPlayer";
import { ThemeProvider } from "./ThemeContext";
import HomeContent from "./HomeContent";

const Home = ({ children }) => {
  return (
    <ThemeProvider>
      <AudioPlayerProvider>
        <HomeContent>{children}</HomeContent>
      </AudioPlayerProvider>
    </ThemeProvider>
  );
};

export default Home;
