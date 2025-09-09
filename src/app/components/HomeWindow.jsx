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

const HomeWindow = ({ handleOpen }) => {
  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        width: "800px",
        height: "560px",
        borderRadius: "10px",
        border: "2px solid ",
        boxSizing: "border-box",
      }}
    >
      {/* Window Header */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{
          fontSize: "1.25rem",
          backgroundColor: "#171717",
          height: "48px",
          borderBottom: "2px solid white",
          display: "flex",
          alignItems: "center",
          paddingLeft: "1.5rem",
        }}
      >
        <p className="font-bold">home</p>
      </div>

      {/* Main Content Area */}
      <div
        className="w-full justify-center items-center flex flex-grow flex-col"
        style={{
          backgroundColor: "#132135",
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
          Full-stack developer, web and app creator.
        </h2>

        {/* Desktop Icons */}
        <div className="flex flex-row items-center justify-center flex-wrap gap-8 p-8">
          {/* About Button */}
          <button
            className="flex flex-col items-center bg-transparent border-none p-4 rounded-xl cursor-pointer transition-transform duration-300 transform hover:scale-110"
            onClick={() => handleOpen("about")}
          >
            <div className="relative w-16 h-16">
              <CircleIcon
                size={64}
                color="#171717"
                weight="fill"
                className="absolute top-0 left-0"
              />
              <UserCircleIcon
                size={64}
                color="#ffffff"
                weight="light"
                className="absolute top-0 left-0 z-10"
              />
            </div>
            <p className="font-bold mt-2">about</p>
          </button>

          {/* Links Button */}
          <button
            className="flex flex-col items-center bg-transparent border-none p-4 rounded-xl cursor-pointer transition-transform duration-300 transform hover:scale-110"
            onClick={() => handleOpen("links")}
          >
            <div className="relative w-16 h-16">
              {/* Center filler */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  backgroundColor: "#171717",
                  width: "60px",
                  height: "19px",
                  borderRadius: "9999px",
                  transform: "rotate(-42.5deg)",
                }}
              />
              {/* Bottom-left filler */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  backgroundColor: "#171717",
                  width: "32px",
                  height: "19px",
                  borderRadius: "9999px",
                  transform:
                    "rotate(-42.5deg) translateX(-12px) translateY(-4px)",
                }}
              />
              {/* Top-right filler. */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  backgroundColor: "#171717",
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
                  color="#ffffff"
                  weight="light"
                  className="absolute z-10"
                />
              </div>
            </div>
            <p className="font-bold mt-2">links</p>
          </button>

          {/* Work Button */}
          <button
            className="flex flex-col items-center bg-transparent border-none p-4 rounded-xl cursor-pointer transition-transform duration-300 transform hover:scale-110"
            onClick={() => handleOpen("work")}
          >
            <div className="relative w-16 h-16">
              <RectangleIcon
                size={64}
                color="#171717"
                weight="fill"
                className="absolute top-0 left-0"
                style={{ transform: "translateY(2px) scaleY(0.8) scaleX(0.9)" }}
              />
              <BriefcaseIcon
                size={64}
                color="#ffffff"
                weight="light"
                className="absolute top-0 left-0 z-10"
              />
            </div>
            <p className="font-bold mt-2">work</p>
          </button>

          {/* Mail/Contact Button */}
          <button
            className="flex flex-col items-center bg-transparent border-none p-4 rounded-xl cursor-pointer transition-transform duration-300 transform hover:scale-110"
            onClick={() => handleOpen("contact")}
          >
            <div className="relative w-16 h-16">
              <RectangleIcon
                size={64}
                color="#171717"
                weight="fill"
                className="absolute top-0 left-0"
                style={{ transform: "translateY(0px) scaleY(0.9) scaleX(0.9)" }}
              />
              <EnvelopeSimpleIcon
                size={64}
                color="#ffffff"
                weight="light"
                className="absolute top-0 left-0 z-10"
              />
            </div>
            <p className="font-bold mt-2">contact</p>
          </button>

          {/* Resume/CV Button */}
          <button
            className="flex flex-col items-center bg-transparent border-none p-4 rounded-xl cursor-pointer transition-transform duration-300 transform hover:scale-110"
            onClick={() => handleOpen("")}
          >
            <div className="relative w-16 h-16">
              <RectangleIcon
                size={64}
                color="#171717"
                weight="fill"
                className="absolute top-0 left-0"
                style={{
                  transform:
                    "rotate(10deg) translateY(0px) scaleY(1.1) scaleX(0.7)",
                }}
              />
              <ReadCvLogoIcon
                size={64}
                color="#ffffff"
                weight="light"
                className="absolute top-0 left-0 z-10"
              />
            </div>
            <p className="font-bold mt-2">resume</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeWindow;
