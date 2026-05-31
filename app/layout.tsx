import type { Metadata } from "next";
import { Rajdhani, JetBrains_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-rajdhani"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains"
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dmsans"
});

export const metadata: Metadata = {
  title: "Scrybe // Scribd to PDF, the NuRichter Workspace way",
  description:
    "Paste a link, get a PDF. No login, no account, no drama. Scrybe pulls Scribd documents down clean. A NuRichter Workspace tool.",
  metadataBase: new URL("https://scrybe.vercel.app"),
  openGraph: {
    title: "Scrybe // Scribd to PDF",
    description: "Paste a link, get a PDF. No login, no drama.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
