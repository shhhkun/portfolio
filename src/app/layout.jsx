import React from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import Home from "./components/Home";

export const metadata = {
  title: "Serjo's Website",
  description: "My personal website showcasing my latest projects and work.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Serjo's Website",
    description: "My personal website showcasing my latest projects and work.",
    url: "https://serjo.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://serjo.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Serjo's Website Preview",
      },
    ],
  },
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
