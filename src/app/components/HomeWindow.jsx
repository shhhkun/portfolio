import React from "react";
import {
  CircleIcon,
  UserCircleIcon,
  RectangleIcon,
} from "@phosphor-icons/react";

const HomeWindow = ({ handleOpen }) => {
  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        width: "809px",
        height: "561.9px",
        borderRadius: "10px",
        border: "2px solid ",
        boxSizing: "border-box",
      }}
    >
      {/* Window Header */}
      <div
        className="text-white px-4 py-2"
        style={{
          fontSize: "1.25rem",
          backgroundColor: "#171717",
          height: "48px", // fix visual: should be 56 fixed
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
        className="w-full flex-grow overflow-y-auto"
        style={{
          backgroundColor: "#132135",
        }}
      >
        <div
          className="text-center font-bold pl-12 pt-12 pr-12"
          style={{ color: "#9c1b75ff", fontSize: "4rem" }}
        >
          Big text
        </div>
        {/* Desktop Icons */}
        <div className="flex flex-row items-start justify-start flex-wrap gap-12 p-12">
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

          {/* Test Button */}
          <button
            className="flex flex-col items-center bg-transparent border-none p-4 rounded-xl cursor-pointer transition-transform duration-300 transform hover:scale-110"
            onClick={() => handleOpen("test")}
          >
            <div className="relative w-16 h-16">
              <RectangleIcon
                size={64}
                color="#171717"
                weight="fill"
                className="absolute top-0 left-0"
              />
              <RectangleIcon
                size={64}
                color="#ffffff"
                weight="light"
                className="absolute top-0 left-0 z-10"
              />
            </div>
            <p className="font-bold mt-2">test</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeWindow;
