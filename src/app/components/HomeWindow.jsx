import React from "react";
import {
  CircleIcon,
  RectangleIcon,
  UserCircleIcon,
  LinkIcon,
  BriefcaseIcon,
  EnvelopeSimpleIcon,
  ReadCvLogoIcon,
} from "@phosphor-icons/react";
import { useAudioPlayer } from "./AudioPlayer";
import { TypeAnimation } from "react-type-animation";

const HomeWindow = ({ handleOpen, isMobile }) => {
  const { playAudio1 } = useAudioPlayer();

  if (isMobile) {
    return (
      <div className="mb-42 flex flex-col items-center">
        <h1
          className="font-bold"
          style={{
            fontSize: "clamp(3rem, 3vw + 1rem, 3.75rem)", // was 3.75
          }}
        >
          Hi I'm Serjo
        </h1>
        <h2
          style={{
            fontSize: "1.25rem",
          }}
        >
          <TypeAnimation
            sequence={[
              "Software Engineer",
              2000, // 2sec
              "Full-Stack Developer",
              2000,
              "Web and App Creator",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h2>

        {/* Desktop Icons */}
        <div className="flex flex-col items-center justify-center pt-8">
          <div className="flex max-w-64 flex-wrap justify-center gap-4">
            {/* About Button */}
            <button
              className="flex transform cursor-pointer flex-col items-center transition-transform duration-300 hover:scale-110"
              onClick={() => {
                handleOpen("about");
                playAudio1(0.2);
              }}
            >
              <div className="h-full w-full rounded-lg bg-[var(--card-bg)] p-2">
                <div className="relative h-14 w-14">
                  <UserCircleIcon
                    size={56}
                    color="var(--text)"
                    weight="light"
                    className="absolute top-0 left-0 z-10"
                  />
                </div>
              </div>
              <p className="mt-2 font-bold" style={{ fontSize: "0.75rem" }}>
                about
              </p>
            </button>

            {/* Links Button */}
            {/* <button
              className="flex flex-col items-center cursor-pointer transition-transform duration-300 transform hover:scale-110"
              onClick={() => {
                handleOpen("links");
                playAudio1(0.2);
              }}
            >
              <div className="w-full h-full bg-[var(--card-bg)] p-2 rounded-lg">
                <div className="relative w-14 h-14">
                  <LinkIcon
                    size={56}
                    color="var(--text)"
                    weight="light"
                    className="absolute top-0 left-0 z-10"
                  />
                </div>
              </div>
              <p className="font-bold mt-2" style={{ fontSize: "0.75rem" }}>
                links
              </p>
            </button> */}

            {/* Work Button */}
            <button
              className="flex transform cursor-pointer flex-col items-center transition-transform duration-300 hover:scale-110"
              onClick={() => {
                handleOpen("work");
                playAudio1(0.2);
              }}
            >
              <div className="h-full w-full rounded-lg bg-[var(--card-bg)] p-2">
                <div className="relative h-14 w-14">
                  <BriefcaseIcon
                    size={56}
                    color="var(--text)"
                    weight="light"
                    className="absolute top-0 left-0 z-10"
                  />
                </div>
              </div>
              <p className="mt-2 font-bold" style={{ fontSize: "0.75rem" }}>
                projects
              </p>
            </button>

            {/* Mail/Contact Button */}
            {/* <button
              className="flex flex-col items-center cursor-pointer transition-transform duration-300 transform hover:scale-110"
              onClick={() => {
                handleOpen("contact");
                playAudio1(0.2);
              }}
            >
              <div className="w-full h-full bg-[var(--card-bg)] p-2 rounded-lg">
                <div className="relative w-14 h-14">
                  <EnvelopeSimpleIcon
                    size={56}
                    color="var(--text)"
                    weight="light"
                    className="absolute top-0 left-0 z-10"
                  />
                </div>
              </div>
              <p className="font-bold mt-2" style={{ fontSize: "0.75rem" }}>
                contact
              </p>
            </button> */}

            {/* Resume/CV Button */}
            <button
              className="flex transform cursor-pointer flex-col items-center transition-transform duration-300 hover:scale-110"
              onClick={() => {
                handleOpen("resume");
                playAudio1(0.2);
              }}
            >
              <div className="h-full w-full rounded-lg bg-[var(--card-bg)] p-2">
                <div className="relative h-14 w-14">
                  <ReadCvLogoIcon
                    size={56}
                    color="var(--text)"
                    weight="light"
                    className="absolute top-0 left-0 z-10"
                  />
                </div>
              </div>
              <p className="mt-2 font-bold" style={{ fontSize: "0.75rem" }}>
                resume
              </p>
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="flex w-full flex-col overflow-hidden"
        style={{
          width: "708px",
          height: "560px",
          borderRadius: "10px",
          border: "2px solid var(--border)",
          boxSizing: "border-box",
        }}
      >
        {/* Window Header */}
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{
            fontSize: "1.25rem",
            backgroundColor: "var(--card-header)",
            height: "48px",
            borderBottom: "2px solid var(--border)",
            display: "flex",
            alignItems: "center",
            paddingLeft: "1.5rem",
          }}
        >
          <p className="font-bold" style={{ color: "var(--text-header)" }}>
            home
          </p>
        </div>

        {/* Main Content Area */}
        <div
          className="flex w-full flex-grow flex-col items-center justify-end p-12"
          style={{
            backgroundColor: "var(--card-bg)",
          }}
        >
          <h1
            className="font-bold"
            style={{
              fontSize: "4rem",
            }}
          >
            Hi I'm Serjo
          </h1>
          <h2
            style={{
              fontSize: "1.5rem",
            }}
          >
            <TypeAnimation
              sequence={[
                "Software Engineer",
                2000, // 2sec
                "Full-Stack Developer",
                2000,
                "Web and App Creator",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h2>

          {/* Desktop Icons */}
          <div className="flex flex-row items-center justify-center gap-4 p-8">
            {/* About Button */}
            <button
              className="flex transform cursor-pointer flex-col items-center p-4 transition-transform duration-300 hover:scale-110"
              onClick={() => {
                handleOpen("about");
                playAudio1(0.2);
              }}
            >
              <div className="relative h-16 w-16">
                <CircleIcon
                  size={64}
                  color="var(--bg)"
                  weight="fill"
                  className="absolute top-0 left-0"
                />
                <UserCircleIcon
                  size={64}
                  color="var(--text)"
                  weight="light"
                  className="absolute top-0 left-0 z-10"
                />
              </div>
              <p className="mt-2 font-bold">about</p>
            </button>

            {/* Links Button */}
            {/* <button
              className="flex flex-col items-center p-4 cursor-pointer transition-transform duration-300 transform hover:scale-110"
              onClick={() => {
                handleOpen("links");
                playAudio1(0.2);
              }}
            >
              <div className="relative w-16 h-16">
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    backgroundColor: "var(--bg)",
                    width: "60px",
                    height: "19px",
                    borderRadius: "9999px",
                    transform: "rotate(-42.5deg)",
                  }}
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    backgroundColor: "var(--bg)",
                    width: "32px",
                    height: "19px",
                    borderRadius: "9999px",
                    transform:
                      "rotate(-42.5deg) translateX(-12px) translateY(-4px)",
                  }}
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    backgroundColor: "var(--bg)",
                    width: "32px",
                    height: "19px",
                    borderRadius: "9999px",
                    transform:
                      "rotate(-42.5deg) translateX(12px) translateY(4px)",
                  }}
                />
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <LinkIcon
                    size={64}
                    color="var(--text)"
                    weight="light"
                    className="absolute z-10"
                  />
                </div>
              </div>
              <p className="font-bold mt-2">links</p>
            </button> */}

            {/* Work Button */}
            <button
              className="flex transform cursor-pointer flex-col items-center p-4 transition-transform duration-300 hover:scale-110"
              onClick={() => {
                handleOpen("work");
                playAudio1(0.2);
              }}
            >
              <div className="relative h-16 w-16">
                <RectangleIcon
                  size={64}
                  color="var(--bg)"
                  weight="fill"
                  className="absolute top-0 left-0"
                  style={{
                    transform: "translateY(2px) scaleY(0.8) scaleX(0.9)",
                  }}
                />
                <BriefcaseIcon
                  size={64}
                  color="var(--text)"
                  weight="light"
                  className="absolute top-0 left-0 z-10"
                />
              </div>
              <p className="mt-2 font-bold">projects</p>
            </button>

            {/* Mail/Contact Button */}
            {/* <button
              className="flex flex-col p-4 cursor-pointer transition-transform duration-300 transform hover:scale-110"
              onClick={() => {
                handleOpen("contact");
                playAudio1(0.2);
              }}
            >
              <div className="relative w-16 h-16">
                <RectangleIcon
                  size={64}
                  color="var(--bg)"
                  weight="fill"
                  className="absolute top-0 left-0"
                  style={{
                    transform: "translateY(0px) scaleY(0.9) scaleX(0.9)",
                  }}
                />
                <EnvelopeSimpleIcon
                  size={64}
                  color="var(--text)"
                  weight="light"
                  className="absolute top-0 left-0 z-10"
                />
              </div>
              <p className="font-bold mt-2">contact</p>
            </button> */}

            {/* Resume/CV Button */}
            <button
              className="flex transform cursor-pointer flex-col p-4 transition-transform duration-300 hover:scale-110"
              onClick={() => {
                handleOpen("resume");
                playAudio1(0.2);
              }}
            >
              <div className="relative h-16 w-16">
                <RectangleIcon
                  size={64}
                  color="var(--bg)"
                  weight="fill"
                  className="absolute top-0 left-0"
                  style={{
                    transform:
                      "rotate(10deg) translateY(0px) scaleY(1.1) scaleX(0.7)",
                  }}
                />
                <ReadCvLogoIcon
                  size={64}
                  color="var(--text)"
                  weight="light"
                  className="absolute top-0 left-0 z-10"
                />
              </div>
              <p className="mt-2 font-bold">resume</p>
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default HomeWindow;
