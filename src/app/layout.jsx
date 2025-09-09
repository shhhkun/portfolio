"use client";

import React, { useState } from "react";
import HomeWindow from "./components/HomeWindow";
import Waves from "./components/Waves";
import "./globals.css";

import AboutWindow from "./components/AboutWindow";
import WorkWindow from "./components/WorkWindow";
import LinksWindow from "./components/LinksWindow";
import ContactWindow from "./components/ContactWindow";

const initialWindowsState = {
  about: { isOpen: false, zIndex: 100, position: { x: 0, y: 0 } },
  links: { isOpen: false, zIndex: 100, position: { x: 0, y: 0 } },
  work: { isOpen: false, zIndex: 100, position: { x: 0, y: 0 } },
  contact: { isOpen: false, zIndex: 100, position: { x: 0, y: 0 } },
  resume: { isOpen: false, zIndex: 100, position: { x: 0, y: 0 } },
};

const Layout = ({ children }) => {
  const [windows, setWindows] = useState(initialWindowsState);
  const [highestZIndex, setHighestZIndex] = useState(100);

  const handleOpen = (windowId) => {
    setWindows((prevWindows) => {
      const newZIndex = highestZIndex + 1;
      setHighestZIndex(newZIndex);
      return {
        ...prevWindows,
        [windowId]: {
          ...prevWindows[windowId],
          isOpen: true,
          zIndex: newZIndex,
        },
      };
    });
  };

  const handleClose = (windowId) => {
    setWindows((prevWindows) => ({
      ...prevWindows,
      [windowId]: { ...prevWindows[windowId], isOpen: false },
    }));
  };

  const handleFocus = (windowId) => {
    setWindows((prevWindows) => {
      // update zIndex if it isn't already the top-most window
      if (prevWindows[windowId].zIndex === highestZIndex) {
        return prevWindows;
      }
      const newZIndex = highestZIndex + 1;
      setHighestZIndex(newZIndex);
      return {
        ...prevWindows,
        [windowId]: { ...prevWindows[windowId], zIndex: newZIndex },
      };
    });
  };

  const handleStop = (windowId, e, ui) => {
    setWindows((prevWindows) => ({
      ...prevWindows,
      [windowId]: { ...prevWindows[windowId], position: { x: ui.x, y: ui.y } },
    }));
  };

  return (
    <html lang="en">
      <body>
        <div
          className="min-h-screen relative"
          style={{
            backgroundColor: "#171717",
            overflow: "hidden",
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Home Window */}
            <div className="z-10">
              <HomeWindow handleOpen={handleOpen} />
            </div>

            {/* Bottom Wavify Animation */}
            <Waves theme="sunset" />
          </div>

          {/* Window Renders */}
          {windows.about.isOpen && (
            <AboutWindow
              onClose={() => handleClose("about")}
              onFocus={() => handleFocus("about")}
              onStop={(e, ui) => handleStop("about", e, ui)}
              zIndex={windows.about.zIndex}
              position={windows.about.position}
            />
          )}
          {windows.links.isOpen && (
            <LinksWindow
              onClose={() => handleClose("links")}
              onFocus={() => handleFocus("links")}
              onStop={(e, ui) => handleStop("links", e, ui)}
              zIndex={windows.links.zIndex}
              position={windows.links.position}
            />
          )}
          {windows.work.isOpen && (
            <WorkWindow
              onClose={() => handleClose("work")}
              onFocus={() => handleFocus("work")}
              onStop={(e, ui) => handleStop("work", e, ui)}
              zIndex={windows.work.zIndex}
              position={windows.work.position}
            />
          )}
          {windows.contact.isOpen && (
            <ContactWindow
              onClose={() => handleClose("contact")}
              onFocus={() => handleFocus("contact")}
              onStop={(e, ui) => handleStop("contact", e, ui)}
              zIndex={windows.contact.zIndex}
              position={windows.contact.position}
            />
          )}
        </div>
      </body>
    </html>
  );
};

export default Layout;
