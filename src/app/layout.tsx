import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import Background from "@/components/Background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#020617",
};

export const metadata: Metadata = {
  title: {
    default: "Abhinandan | MERN Stack Developer",
    template: "%s | Abhinandan"
  },
  description: "Senior MERN Stack Developer specializing in building high-performance, scalable full-stack applications with MongoDB, Express, React, and Node.js.",
  keywords: [
    "Abhinandan",
    "MERN Stack Developer",
    "Full Stack Developer",
    "React Specialist",
    "Node.js Expert",
    "Scalable Web Apps",
    "Portfolio"
  ],
  authors: [{ name: "Abhinandan" }],
  creator: "Abhinandan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abhinandan.dev",
    siteName: "Abhinandan Portfolio",
    title: "Abhinandan | MERN Stack Developer",
    description: "Building scalable full-stack applications with the MERN stack.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abhinandan Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhinandan | MERN Stack Developer",
    description: "Building scalable full-stack applications with the MERN stack.",
    creator: "@abhinandan",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Abhinandan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Background />
        <Cursor />
        {children}
      </body>
    </html>
  );
}