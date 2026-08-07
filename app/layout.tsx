import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quantix",
  description: "Platform web cerdas untuk analisis saham.",
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