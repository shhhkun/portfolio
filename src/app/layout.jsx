import React from "react";
import HomeWindow from "./components/HomeWindow";
import Waves from "./components/Waves";
import "./globals.css";

const Layout = ({}) => {
  return (
    <html lang="en">
      <body>
        <div
          className="min-h-screen relative flex flex-col items-center justify-center"
          style={{
            backgroundColor: "#171717",
          }}
        >
          {/* Home Window */}
          <div className="z-10">
            <HomeWindow />
          </div>

          {/* Bottom Wavify Animation */}
          <Waves />
        </div>
      </body>
    </html>
  );
};

export default Layout;
