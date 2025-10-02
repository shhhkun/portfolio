import React, { useState } from "react";
import {
  GithubLogoIcon,
  DiscordLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";
import LeetCodeLogo from "../utils/LeetCodeLogo";
import { useAudioPlayer } from "./AudioPlayer";

const LinksTab = ({ isOpen, windowId, handleClose }) => {
  const { playAudio1, playAudio2 } = useAudioPlayer();

  const [toastMessage, setToastMessage] = useState("");

  const handleCopyDiscord = async () => {
    const discordUsername = "shhhkun";

    try {
      await navigator.clipboard.writeText(discordUsername);
      setToastMessage("copied!");
    } catch (err) {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = discordUsername;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setToastMessage("copied!");
    } finally {
      setTimeout(() => {
        setToastMessage("");
      }, 2000);
    }
  };

  // determine the translation state for the sliding animation
  // if the component is not open, it slides down (translate-y-full)
  const transformClass = isOpen ? "translate-y-0" : "translate-y-full";

  // determine the visibility and backdrop state
  // when closed, prevent interaction with the backdrop and modal
  const visibilityClass = isOpen
    ? "pointer-events-auto"
    : "pointer-events-none";
  const backdropOpacityClass = isOpen ? "opacity-75" : "opacity-0";

  const closeModal = () => {
    handleClose(windowId);
  };

  return (
    <>
      {/* Backdrop (handles outside clicks) */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${backdropOpacityClass} ${visibilityClass}`}
        onClick={() => {
          closeModal();
          playAudio2(0.1);
        }}
        aria-hidden={!isOpen}
      />

      {/* Modal Container (Fixed at the bottom, full width) */}
      <div
        className={`fixed bottom-0 left-0 w-full max-h-[85vh] z-50 
                   flex flex-col transition-transform duration-500 ease-in-out ${transformClass} overflow-hidden`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div
          className="flex justify-between relative rounded-t-lg px-6 py-2 flex-shrink-0 "
          style={{
            fontSize: "1.25rem",
            backgroundColor: "var(--card-header)",
            border: "2px solid ",
          }}
        >
          <p className="font-bold" style={{ color: "var(--text-header)" }}>
            {windowId}
          </p>
          <button
            onClick={() => {
              closeModal();
              playAudio2(0.1);
            }}
            className="cursor-pointer font-bold transition-transform hover:scale-110"
            style={{ color: "var(--text-header)" }}
          >
            x
          </button>
        </div>

        {/* Main Content Area */}
        <div
          className="flex flex-col flex-1 p-8 gap-4 overflow-y-auto"
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          <div
            className="flex flex-row items-center p-2 border border-[var(--border2)] rounded-xl"
            style={{ backgroundColor: "var(--card-bg2)" }}
          >
            {/* GitHub Button */}
            <a
              href="https://github.com/shhhkun"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col cursor-pointer transition-transform duration-300 transform hover:scale-110"
              onClick={() => playAudio1(0.2)}
            >
              <div className="relative w-14 h-14">
                <GithubLogoIcon
                  size={56}
                  color="var(--text)"
                  weight="light"
                  className="absolute top-0 left-0 z-10"
                />
              </div>
            </a>
            <p className="font-bold pl-4">github</p>
          </div>

          <div
            className="flex flex-row items-center p-2 border border-[var(--border2)] rounded-xl"
            style={{ backgroundColor: "var(--card-bg2)" }}
          >
            <a
              href="https://leetcode.com/u/shhhkun"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col cursor-pointer transition-transform duration-300 transform hover:scale-110"
              onClick={() => playAudio1(0.2)}
            >
              <div className="relative w-14 h-14">
                <LeetCodeLogo
                  size={56}
                  color="var(--text)"
                  weight="regular"
                  className="absolute top-0 left-0 z-10"
                />
              </div>
            </a>
            <p className="font-bold pl-4">leetcode</p>
          </div>

          <div
            className="flex flex-row items-center p-2 border border-[var(--border2)] rounded-xl"
            style={{ backgroundColor: "var(--card-bg2)" }}
          >
            <a
              href="https://linkedin.com/in/serjobarron"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col cursor-pointer transition-transform duration-300 transform hover:scale-110"
              onClick={() => playAudio1(0.2)}
            >
              <div className="relative w-14 h-14">
                <LinkedinLogoIcon
                  size={56}
                  color="var(--text)"
                  weight="light"
                  className="absolute top-0 left-0 z-10"
                />
              </div>
            </a>
            <p className="font-bold pl-4">linkedin</p>
          </div>

          <div
            className="flex flex-row items-center p-2 border border-[var(--border2)] rounded-xl"
            style={{ backgroundColor: "var(--card-bg2)" }}
          >
            {/* Discord Button */}
            <div className="relative">
              <button
                onClick={() => {
                  handleCopyDiscord();
                  playAudio1(0.2);
                }}
                className="flex flex-col cursor-pointer transition-transform duration-300 transform hover:scale-110"
              >
                <div className="relative w-14 h-14">
                  <DiscordLogoIcon
                    size={56}
                    color="var(--text)"
                    weight="light"
                    className="absolute top-0 left-0 z-10"
                  />
                </div>
              </button>
            </div>
            <p className="font-bold pl-4">discord</p>

            {/* Toast Notification */}
            {toastMessage && (
              <span
                className="bg-black bg-opacity-75 rounded-md px-2 py-1 ml-4"
                style={{ color: "#ffffff", fontSize: "0.75rem" }}
              >
                {toastMessage}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LinksTab;
