import type { Metadata } from "next";
import {
  DM_Mono,
  Instrument_Serif,
  Italianno,
  Manrope,
} from "next/font/google";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-interface",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const italianno = Italianno({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Ardian Maulana",
  description: "Digital Portfolio Muhammad Ardian Maulana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${instrumentSerif.variable} ${italianno.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
