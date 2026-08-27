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
import ThumbnailTooltip from "./ThumbnailTooltip";

const assetBase = process.env.NEXT_PUBLIC_ASSET_BASE_URL;

const previewImage = {
  "about-dark": `${assetBase}/images/about-preview-dark.webp`,
  "work-dark": `${assetBase}/images/projects-preview-dark.webp`,
  "resume-dark": `${assetBase}/images/resume-preview-dark.webp`,

  "about-light": `${assetBase}/images/about-preview-light.webp`,
  "work-light": `${assetBase}/images/projects-preview-light.webp`,
  "resume-light": `${assetBase}/images/resume-preview-light.webp`,
};

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
  theme,
}) => {
  const { playAudio1 } = useAudioPlayer();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      );
      setDate(
        now.toLocaleDateString([], {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        }),
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
      {/* Socials (left) */}
      <div className="taskbar-section taskbar-section--left">
        {socials.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="taskbar-button"
            onClick={() => playAudio1()}
          >
            <Icon size={20} weight="fill" />
            <span>{label}</span>
          </a>
        ))}
      </div>

      {/* Open windows (center) */}
      <div className="taskbar-section taskbar-section--center">
        {openWindows.map(([id, { label, icon: Icon }]) => {
          const win = windows[id];
          const isActive = id === activeWindowId;
          return (
            <ThumbnailTooltip
              key={id}
              title={label}
              image={previewImage[`${id}-${theme}`]}
              offsetY={-200}
            >
              <button
                className={`taskbar-button ${
                  isActive ? "taskbar-button--active" : ""
                } ${win.isMinimized ? "taskbar-button--minimized" : ""}`}
                onClick={() => {
                  playAudio1();
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
            </ThumbnailTooltip>
          );
        })}
      </div>

      {/* Clock + copyright (right) */}
      <div className="taskbar-section taskbar-section--right">
        <span className="taskbar-copyright">
          © {new Date().getFullYear()} Serjo Barron
        </span>
        <div className="taskbar-clock">
          <span className="taskbar-clock-time">{time}</span>
          <span className="taskbar-clock-date">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
