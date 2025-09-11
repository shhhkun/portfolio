"use client";

import React, { useEffect } from "react";
import { useAudioPlayer } from "./AudioPlayer";
import { SunIcon, MoonIcon } from "@phosphor-icons/react";

const ThemeButton = ({ theme, setTheme }) => {
  const { playAudio4, playAudio5 } = useAudioPlayer();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.documentElement.className = theme; // apply the theme class to the HTML element
  }, [theme]);

  return (
    <button
      className="flex flex-col items-center bg-transparent border-none p-4 rounded-xl cursor-pointer transition-transform duration-300 transform hover:scale-110"
      onClick={() => {
        toggleTheme();
        theme === "dark" ? playAudio4(0.1) : playAudio5(0.1);
      }}
    >
      {theme === "dark" ? (
        <div className="relative w-8 h-8">
          <SunIcon
            size={32}
            color="var(--text)"
            weight="fill"
            className="absolute top-0 left-0"
          />
        </div>
      ) : (
        <div className="relative w-8 h-8">
          <MoonIcon
            size={32}
            color="var(--text)"
            weight="fill"
            className="absolute top-0 left-0"
          />
        </div>
      )}
    </button>
  );
};

export default ThemeButton;
