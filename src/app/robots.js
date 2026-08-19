export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://serjo.vercel.app/sitemap.xml",
  };
}
