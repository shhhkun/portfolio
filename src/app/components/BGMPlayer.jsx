"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAudioPlayer } from "./AudioPlayer";

const assetBase = process.env.NEXT_PUBLIC_ASSET_BASE_URL;

// Background-music track player
// Sun/Moon are themed toggles for this one track:
//   - "start" resumes playback from where it last paused (fade-in)
//   - "pause" fades out, keeps position, suspends playback
const TRACK_URL = `${assetBase}/audio/bgm-1.wav`;

const BGMContext = createContext();

export const useBGM = () => useContext(BGMContext);

export const BGMProvider = ({ children }) => {
  const { isMuted } = useAudioPlayer(); // global mute also silences BGM
  //steady listening level the track settles at after its fade-in
  const BASE_VOLUME = 0.5;
  const FADE_IN_MS = 2500;
  const FADE_OUT_MS = 1500;

  const audioRef = useRef(null);
  const fadeTimerRef = useRef(0);
  // idle | fadingIn | playing | fadingOut
  const phaseRef = useRef("idle");
  const mutedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // what the steady level actually is right now (mute zeroes it out)
  const targetBase = () => (mutedRef.current ? 0 : BASE_VOLUME);

  useEffect(() => {
    mutedRef.current = isMuted;
    // react to mute/unmute mid-playback: ride the volume to the new target
    const audio = audioRef.current;
    if (!audio || !audio.src) return;
    if (phaseRef.current !== "playing" && phaseRef.current !== "fadingIn") {
      return; // paused/idle/fading-out: nothing audible to adjust
    }
    rampVolume(audio, audio.volume, isMuted ? 0 : BASE_VOLUME, 600, () => {
      phaseRef.current = "playing";
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMuted]);

  useEffect(() => {
    const audio = new Audio(TRACK_URL);
    audio.preload = "auto";
    audio.loop = false; // looping handled manually for smooth seam
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      clearInterval(fadeTimerRef.current);
      audio.pause();
      audio.src = ""; // release the network connection
      audioRef.current = null;
    };
  }, []);

  // cancellable linear volume ramp; returns via onComplete callback.
  // uses setInterval (NOT rAF): rAF is frozen in hidden tabs, which would
  // leave fades mid-flight while backgrounded; intervals keep ticking
  // (throttled to >=1s by browsers) and the wall-clock step below lands
  // each tick exactly where the envelope should be regardless of spacing.
  const rampVolume = (audio, from, to, durationMs, onDone) => {
    clearInterval(fadeTimerRef.current);
    const startedAt = performance.now();
    const TICK_MS = 50;
    const step = () => {
      const t = Math.min(1, (performance.now() - startedAt) / durationMs);
      audio.volume = Math.max(0, Math.min(1, from + (to - from) * t));
      if (t < 1) return; // next tick continues the ramp
      clearInterval(fadeTimerRef.current);
      if (onDone) onDone();
    };
    fadeTimerRef.current = setInterval(step, TICK_MS);
    step(); // apply the first increment immediately
  };

  // pause: fade toward silence, then suspend at current position
  const fadeOutAndPause = () => {
    const audio = audioRef.current;
    if (!audio || phaseRef.current === "fadingOut") return;
    phaseRef.current = "fadingOut";
    rampVolume(audio, audio.volume, 0, FADE_OUT_MS, () => {
      audio.pause();
      phaseRef.current = "idle";
      setIsPlaying(false);
    });
  };

  // start/resume: unpause (position preserved), then fade up
  const resumeWithFadeIn = () => {
    const audio = audioRef.current;
    if (!audio) return;
    phaseRef.current = "fadingIn";
    audio.play().catch((error) => {
      if (error?.name !== "NotAllowedError") {
        console.error("BGMPlayer play error:", error);
      }
      phaseRef.current = "idle";
      setIsPlaying(false);
    });
    rampVolume(audio, audio.volume, targetBase(), FADE_IN_MS, () => {
      phaseRef.current = "playing";
    });
    setIsPlaying(true);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // loop-seam smoothing: near the end of the track, ride the volume
    // down so the wrap point is silent; `ended` restarts with a fade-in
    const handleTimeUpdate = () => {
      if (!audio.duration || phaseRef.current === "fadingOut") return;
      const remainingMs = (audio.duration - audio.currentTime) * 1000;
      if (remainingMs < FADE_OUT_MS) {
        const t = remainingMs / FADE_OUT_MS;
        const base = mutedRef.current ? 0 : BASE_VOLUME;
        // quadratic = gentler tail
        audio.volume = Math.max(0, base * t * t);
      }
    };

    const handleEnded = () => {
      audio.currentTime = 0;
      resumeWithFadeIn();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // one entry point for both sun & moon
  const toggleBGM = () => {
    if (phaseRef.current === "fadingIn" || phaseRef.current === "playing") {
      fadeOutAndPause();
    } else {
      resumeWithFadeIn();
    }
  };

  const value = { isPlaying, toggleBGM };

  return <BGMContext.Provider value={value}>{children}</BGMContext.Provider>;
};
