import React from "react";
import HomeWindow from "./components/HomeWindow";

const Layout = ({}) => {
  return (
    <html lang="en">
      <body>
        <div
          className="min-h-screen flex flex-col items-center justify-center p-4"
          style={{
            backgroundColor: "#171717",
          }}
        >
          <HomeWindow />
        </div>
      </body>
    </html>
  );
};

export default Layout;
