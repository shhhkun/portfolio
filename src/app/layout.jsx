import React from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import Home from "./components/Home";

export const metadata = {
  title: "Serjo's Website",
  description: "My personal website showcasing my latest projects and work.",
};

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body className="m-0 p-0 overflow-x-hidden">
        <Analytics />
        <Home children={children} />
      </body>
    </html>
  );
};

export default Layout;
