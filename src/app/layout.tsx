import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ardian Maulana | Portfolio",
  description:
    "Personal portfolio of Muhammad Ardian Maulana — Software Development, Backend, DevOps, and AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
