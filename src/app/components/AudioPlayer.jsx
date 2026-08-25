"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const assetBase = process.env.NEXT_PUBLIC_ASSET_BASE_URL;

const AudioPlayerContext = createContext();

// custom hook
export const useAudioPlayer = () => {
  return useContext(AudioPlayerContext);
};

export const AudioPlayerProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRefs = useRef({});
  // browsers block audio until the user interacts with the document;
  // hover events don't count, so track activation ourselves
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    audioRefs.current = {
      audio1: new Audio(`${assetBase}/audio/mouseclick.wav`),
      audio2: new Audio(`${assetBase}/audio/pop.mp3`),
      audio3: new Audio(`${assetBase}/audio/unmute.mp3`),
      audio4: new Audio(`${assetBase}/audio/sun.mp3`),
      audio5: new Audio(`${assetBase}/audio/moon.mp3`),
      audio6: new Audio(`${assetBase}/audio/windchime.mp3`),
    };

    const markInteracted = () => {
      hasInteractedRef.current = true;
    };
    // any of these count as user activation for autoplay policies
    const events = ["pointerdown", "keydown", "touchstart", "click"];
    events.forEach((e) =>
      window.addEventListener(e, markInteracted, { once: true }),
    );
    return () =>
      events.forEach((e) => window.removeEventListener(e, markInteracted));
  }, []);

  // play a specific audio file
  const playAudio = (audioName, volume = 1.0) => {
    const isToggleSound = audioName === "audio3"; // sound for muted toggle
    if (isMuted && !isToggleSound) {
      // allow toggle sound to play when going from muted to unmuted
      return;
    }

    // skip silently before first interaction — play() would just be rejected
    if (!hasInteractedRef.current) {
      return;
    }

    const audio = audioRefs.current[audioName];
    if (audio) {
      // set the volume before playing, ensure it's within the valid range
      audio.volume = Math.max(0, Math.min(1, volume));
      // pause and reset the audio to allow it to play again if it's already playing
      audio.currentTime = 0;
      audio.play().catch((error) => {
        // NotAllowedError here is benign (activation expired, etc.) — stay quiet
        if (error?.name !== "NotAllowedError") {
          console.error(`Error playing audio ${audioName}:`, error);
        }
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
    playAudio6: (volume) => playAudio("audio6", volume),
    isMuted,
    toggleMute,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
