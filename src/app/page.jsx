"use client";

import React, { useState } from "react";
import HomeWindow from "./components/HomeWindow";
import AboutWindow from "./components/AboutWindow";
import WorkWindow from "./components/WorkWindow";
import LinksWindow from "./components/LinksWindow";
import ContactWindow from "./components/ContactWindow";
import ResumeWindow from "./components/ResumeWindow";

const initialWindowsState = {
  about: { isOpen: false, zIndex: 100, position: { x: 0, y: 0 } },
  links: { isOpen: false, zIndex: 100, position: { x: 0, y: 0 } },
  work: { isOpen: false, zIndex: 100, position: { x: 0, y: 0 } },
  contact: { isOpen: false, zIndex: 100, position: { x: 0, y: 0 } },
  resume: { isOpen: false, zIndex: 100, position: { x: 0, y: 0 } },
};

// mapping of window IDs to their corresponding React components
const windowComponents = {
  about: AboutWindow,
  links: LinksWindow,
  work: WorkWindow,
  contact: ContactWindow,
  resume: ResumeWindow,
};

const Page = () => {
  const [windows, setWindows] = useState(initialWindowsState);
  const [highestZIndex, setHighestZIndex] = useState(100);

  // handle open window
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

  // handle close window
  const handleClose = (windowId) => {
    setWindows((prevWindows) => ({
      ...prevWindows,
      [windowId]: { ...prevWindows[windowId], isOpen: false },
    }));
  };

  // bring window to front
  const handleFocus = (windowId) => {
    setWindows((prevWindows) => {
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

  // update window position on stop (remember position)
  const handleStop = (windowId, e, ui) => {
    setWindows((prevWindows) => ({
      ...prevWindows,
      [windowId]: { ...prevWindows[windowId], position: { x: ui.x, y: ui.y } },
    }));
  };

  return (
    <main className="text-white text-lg">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="z-10">
          <HomeWindow handleOpen={handleOpen} />
        </div>
      </div>

      {/* dynamically render windows based on their `isOpen` state */}
      {Object.entries(windows).map(([windowId, windowState]) => {
        // get the correct component from our mapping
        const WindowComponent = windowComponents[windowId];

        // only render the component if it's supposed to be open
        if (windowState.isOpen) {
          return (
            <WindowComponent
              key={windowId}
              onClose={() => handleClose(windowId)}
              onFocus={() => handleFocus(windowId)}
              onStop={(e, ui) => handleStop(windowId, e, ui)}
              zIndex={windowState.zIndex}
              position={windowState.position}
            />
          );
        }
        return null;
      })}
    </main>
  );
};

export default Page;
