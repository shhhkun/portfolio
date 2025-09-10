import React, { createContext, useContext, useEffect, useRef } from "react";

const AudioPlayerContext = createContext();

// custom hook
export const useAudioPlayer = () => {
  return useContext(AudioPlayerContext);
};

export const AudioPlayerProvider = ({ children }) => {
  const audioRefs = useRef({});

  useEffect(() => {
    audioRefs.current = {
      audio1: new Audio("/mouseclick.wav"),
      audio2: new Audio(),
      audio3: new Audio(),
    };
  }, []);

  // play a specific audio file
  const playAudio = (audioName, volume = 1.0) => {
    const audio = audioRefs.current[audioName];
    if (audio) {
      // set the volume before playing, ensure it's within the valid range
      audio.volume = Math.max(0, Math.min(1, volume));
      // pause and reset the audio to allow it to play again if it's already playing
      audio.pause();
      audio.currentTime = 0;
      audio.play().catch((error) => {
        console.error(`Error playing audio ${audioName}:`, error);
      });
    }
  };

  const value = {
    playAudio1: (volume) => playAudio("audio1", volume),
    playAudio2: (volume) => playAudio("audio2", volume),
    playAudio3: (volume) => playAudio("audio3", volume),
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
