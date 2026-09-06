import { Geist, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata = {
  title: "SSIP — Resume Bullet Strategist",
  description:
    "Turn the work you actually do into resume bullets. Describe what you did; get three polished, targeted bullets back.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
