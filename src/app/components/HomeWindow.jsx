import React from "react";

const HomeWindow = ({ children }) => {
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
        className="text-white px-4 py-2 font-light"
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
        {children}
      </div>
    </div>
  );
};

export default HomeWindow;
