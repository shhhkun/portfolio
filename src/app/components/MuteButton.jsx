"use client";

import React from "react";
import { useAudioPlayer } from "./AudioPlayer";
import { SpeakerNoneIcon, SpeakerXIcon } from "@phosphor-icons/react";

const MuteButton = () => {
  const { isMuted, toggleMute } = useAudioPlayer();

  return (
    <button
      className="flex transform cursor-pointer flex-col items-center rounded-xl border-none bg-transparent p-4 transition-transform duration-300 hover:scale-110"
      onClick={toggleMute}
    >
      {isMuted ? (
        <div className="relative h-8 w-8">
          <SpeakerXIcon
            size={32}
            color="var(--text)"
            weight="fill"
            className="absolute top-0 left-0"
          />
        </div>
      ) : (
        <div className="relative h-8 w-8">
          <SpeakerNoneIcon
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

export default MuteButton;
