import type { Metadata } from "next";
import { Archivo, DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Aurelia — Midnight Velvet",
  description: "A nocturnal, cinematic listening room.",
};

const THEME_INIT_SCRIPT = `
  try {
    var t = localStorage.getItem("aurelia-theme");
    if (t === "warm") document.documentElement.setAttribute("data-aurelia-theme", "warm");
  } catch (e) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${instrumentSerif.variable} ${archivo.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--aurelia-bg)] text-[var(--aurelia-ink-2)] font-sans">
        {children}
      </body>
    </html>
  );
}
