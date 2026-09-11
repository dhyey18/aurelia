import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aurelia — Midnight Velvet",
    short_name: "Aurelia",
    description: "A nocturnal, cinematic listening room.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#17141b",
    theme_color: "#17141b",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
