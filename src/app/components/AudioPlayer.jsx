"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const AudioPlayerContext = createContext();

// custom hook
export const useAudioPlayer = () => {
  return useContext(AudioPlayerContext);
};

export const AudioPlayerProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRefs = useRef({});

  useEffect(() => {
    audioRefs.current = {
      audio1: new Audio("/mouseclick.wav"),
      audio2: new Audio("/pop.mp3"),
      audio3: new Audio("/unmute.mp3"),
      audio4: new Audio("/sun.mp3"),
      audio5: new Audio("/moon.mp3"),
    };
  }, []);

  // play a specific audio file
  const playAudio = (audioName, volume = 1.0) => {
    const isToggleSound = audioName === "audio3"; // sound for muted toggle
    if (isMuted && !isToggleSound) {
      // allow toggle sound to play when going from muted to unmuted
      return;
    }

    const audio = audioRefs.current[audioName];
    if (audio) {
      // set the volume before playing, ensure it's within the valid range
      audio.volume = Math.max(0, Math.min(1, volume));
      // pause and reset the audio to allow it to play again if it's already playing
      audio.currentTime = 0;
      audio.play().catch((error) => {
        console.error(`Error playing audio ${audioName}:`, error);
      });
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newMuteState = !prev;
      if (!newMuteState) {
        playAudio("audio3", 0.1);
      }
      return newMuteState;
    });
  };

  const value = {
    playAudio1: (volume) => playAudio("audio1", volume),
    playAudio2: (volume) => playAudio("audio2", volume),
    playAudio3: (volume) => playAudio("audio3", volume),
    playAudio4: (volume) => playAudio("audio4", volume),
    playAudio5: (volume) => playAudio("audio5", volume),
    isMuted,
    toggleMute,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
