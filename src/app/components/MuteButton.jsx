"use client";

import React from "react";
import { useAudioPlayer } from "./AudioPlayer";
import { SpeakerNoneIcon, SpeakerXIcon } from "@phosphor-icons/react";

const MuteButton = () => {
  const { isMuted, toggleMute } = useAudioPlayer();

  return (
    <button
      className="flex flex-col items-center bg-transparent border-none p-4 rounded-xl cursor-pointer transition-transform duration-300 transform hover:scale-110"
      onClick={toggleMute}
    >
      {isMuted ? (
        <div className="relative w-8 h-8">
          <SpeakerXIcon
            size={32}
            color="#ffffff"
            weight="fill"
            className="absolute top-0 left-0"
          />
        </div>
      ) : (
        <div className="relative w-8 h-8">
          <SpeakerNoneIcon
            size={32}
            color="#ffffff"
            weight="fill"
            className="absolute top-0 left-0"
          />
        </div>
      )}
    </button>
  );
};

export default MuteButton;
