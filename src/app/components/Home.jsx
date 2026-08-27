"use client";

import React from "react";
import { AudioPlayerProvider } from "./audio/AudioPlayer";
import { BGMProvider } from "./audio/BGMPlayer";
import { ThemeProvider } from "./ThemeContext";
import HomeContent from "./HomeContent";

const Home = ({ children }) => {
  return (
    <ThemeProvider>
      <AudioPlayerProvider>
        <BGMProvider>
          <HomeContent>{children}</HomeContent>
        </BGMProvider>
      </AudioPlayerProvider>
    </ThemeProvider>
  );
};

export default Home;
