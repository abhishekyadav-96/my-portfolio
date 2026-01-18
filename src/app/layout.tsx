import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/layout/CustomCursor";
import Background from "@/components/layout/Background";
import ScrollProgress from "@/components/layout/ScrollProgress";
import BackToTop from "@/components/layout/BackToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
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
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE", // Add your Google Search Console verification code here
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Abhinandan",
              "url": "https://abhinandan.dev",
              "jobTitle": "MERN Stack Developer",
              "description": "Senior MERN Stack Developer specializing in building high-performance, scalable full-stack applications.",
              "sameAs": [
                "https://github.com/your-username", // Update with your links
                "https://linkedin.com/in/your-username"
              ]
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[#020617] text-white selection:bg-blue-500/30 selection:text-white`}>
        <CustomCursor />
        <Background />
        <ScrollProgress />
        <BackToTop />
        {children}
      </body>
    </html>
  );
}