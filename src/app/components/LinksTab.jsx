import React, { useState } from "react";
import {
  GithubLogoIcon,
  DiscordLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";
import LeetCodeLogo from "../utils/LeetCodeLogo";
import { useAudioPlayer } from "./AudioPlayer";

const HandleBar = () => (
  <div
    className="mx-auto h-1 w-12 rounded-full"
    style={{ backgroundColor: "var(--text-header)" }}
  />
);

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
        className={`fixed bottom-0 left-0 z-50 flex max-h-[85vh] w-full flex-col transition-transform duration-500 ease-in-out ${transformClass} overflow-hidden`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div
          className="flex flex-shrink-0 flex-row items-center rounded-t-lg px-6 py-2"
          style={{
            fontSize: "1.25rem",
            backgroundColor: "var(--card-header)",
            border: "2px solid",
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
            className="absolute left-1/2 -translate-x-1/2 transform cursor-pointer font-bold transition-transform hover:scale-110"
            style={{ color: "var(--text-header)" }}
          >
            <HandleBar />
          </button>
        </div>

        {/* Main Content Area */}
        <div
          className="flex flex-1 flex-col gap-4 overflow-y-auto p-8"
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          <div
            className="flex flex-row items-center rounded-xl border border-[var(--border2)] p-2"
            style={{ backgroundColor: "var(--card-bg2)" }}
          >
            {/* GitHub Button */}
            <a
              href="https://github.com/shhhkun"
              target="_blank"
              rel="noopener noreferrer"
              className="flex transform cursor-pointer flex-col transition-transform duration-300 hover:scale-110"
              onClick={() => playAudio1(0.2)}
            >
              <div className="relative h-14 w-14">
                <GithubLogoIcon
                  size={56}
                  color="var(--text)"
                  weight="light"
                  className="absolute top-0 left-0 z-10"
                />
              </div>
            </a>
            <p className="pl-4 font-bold">github</p>
          </div>

          <div
            className="flex flex-row items-center rounded-xl border border-[var(--border2)] p-2"
            style={{ backgroundColor: "var(--card-bg2)" }}
          >
            <a
              href="https://leetcode.com/u/shhhkun"
              target="_blank"
              rel="noopener noreferrer"
              className="flex transform cursor-pointer flex-col transition-transform duration-300 hover:scale-110"
              onClick={() => playAudio1(0.2)}
            >
              <div className="relative h-14 w-14">
                <LeetCodeLogo
                  size={56}
                  color="var(--text)"
                  weight="regular"
                  className="absolute top-0 left-0 z-10"
                />
              </div>
            </a>
            <p className="pl-4 font-bold">leetcode</p>
          </div>

          <div
            className="flex flex-row items-center rounded-xl border border-[var(--border2)] p-2"
            style={{ backgroundColor: "var(--card-bg2)" }}
          >
            <a
              href="https://linkedin.com/in/serjobarron"
              target="_blank"
              rel="noopener noreferrer"
              className="flex transform cursor-pointer flex-col transition-transform duration-300 hover:scale-110"
              onClick={() => playAudio1(0.2)}
            >
              <div className="relative h-14 w-14">
                <LinkedinLogoIcon
                  size={56}
                  color="var(--text)"
                  weight="light"
                  className="absolute top-0 left-0 z-10"
                />
              </div>
            </a>
            <p className="pl-4 font-bold">linkedin</p>
          </div>

          <div
            className="flex flex-row items-center rounded-xl border border-[var(--border2)] p-2"
            style={{ backgroundColor: "var(--card-bg2)" }}
          >
            {/* Discord Button */}
            <div className="relative">
              <button
                onClick={() => {
                  handleCopyDiscord();
                  playAudio1(0.2);
                }}
                className="flex transform cursor-pointer flex-col transition-transform duration-300 hover:scale-110"
              >
                <div className="relative h-14 w-14">
                  <DiscordLogoIcon
                    size={56}
                    color="var(--text)"
                    weight="light"
                    className="absolute top-0 left-0 z-10"
                  />
                </div>
              </button>
            </div>
            <p className="pl-4 font-bold">discord</p>

            {/* Toast Notification */}
            {toastMessage && (
              <span
                className="bg-opacity-75 ml-4 rounded-md bg-black px-2 py-1"
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
