import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cartera ONUDI Costa Rica 2026",
  description: "Plataforma interactiva del Programa País ONUDI–Costa Rica",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
