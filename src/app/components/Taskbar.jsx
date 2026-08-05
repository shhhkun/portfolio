"use client";

import React, { useState, useEffect } from "react";
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  EnvelopeSimpleIcon,
  UserCircleIcon,
  BriefcaseIcon,
  ReadCvLogoIcon,
} from "@phosphor-icons/react";
import { useAudioPlayer } from "./AudioPlayer";

const windowMeta = {
  about: { label: "about", icon: UserCircleIcon },
  work: { label: "projects", icon: BriefcaseIcon },
  resume: { label: "resume", icon: ReadCvLogoIcon },
};

const Taskbar = ({
  windows,
  activeWindowId,
  handleFocus,
  handleMinimize,
  handleRestore,
  isMobile,
}) => {
  const { playAudio1 } = useAudioPlayer();
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isMobile) return null;

  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/shhhkun",
      icon: GithubLogoIcon,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/serjobarron",
      icon: LinkedinLogoIcon,
    },
    {
      label: "Email",
      href: "mailto:serjobarron@gmail.com",
      icon: EnvelopeSimpleIcon,
    },
  ];

  const openWindows = Object.entries(windowMeta).filter(
    ([id]) => windows[id]?.isOpen,
  );

  return (
    <div className="taskbar">
      {/* Socials */}
      <div className="taskbar-section">
        {socials.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="taskbar-button"
            onClick={() => playAudio1(0.2)}
          >
            <Icon size={20} weight="fill" />
            <span>{label}</span>
          </a>
        ))}
      </div>

      {/* Open windows */}
      <div className="taskbar-section">
        {openWindows.map(([id, { label, icon: Icon }]) => {
          const win = windows[id];
          const isActive = id === activeWindowId;
          return (
            <button
              key={id}
              className={`taskbar-button ${
                isActive ? "taskbar-button--active" : ""
              } ${win.isMinimized ? "taskbar-button--minimized" : ""}`}
              onClick={() => {
                playAudio1(0.2);
                if (win.isMinimized) {
                  // restore from taskbar: un-minimize + bring to front
                  handleRestore(id);
                } else if (isActive) {
                  // collapse the active window
                  handleMinimize(id);
                } else {
                  // bring an open window to the front
                  handleFocus(id);
                }
              }}
            >
              <Icon size={20} weight="fill" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Clock + copyright */}
      <div className="taskbar-section">
        <span className="taskbar-copyright">
          © {new Date().getFullYear()} Serjo Barron
        </span>
        <span className="taskbar-clock">{time}</span>
      </div>
    </div>
  );
};

export default Taskbar;
