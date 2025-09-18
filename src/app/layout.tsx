import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Play.Smarlify.co - Gaming Hub",
  description: "Experience the ultimate gaming hub with Traffic Run, Crossy Road, Space Shooter, and more. Play amazing games built with cutting-edge web technologies.",
  keywords: ["gaming", "games", "web games", "Traffic Run", "Crossy Road", "Space Shooter", "Three.js", "WebGL", "Smarlify"],
  authors: [{ name: "David Nekovar", url: "https://github.com/davidnekovarcz" }],
  creator: "David Nekovar",
  publisher: "Smarlify",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://play.smarlify.co",
    siteName: "Play.Smarlify.co",
    title: "Play.Smarlify.co - Gaming Hub",
    description: "Experience the ultimate gaming hub with Traffic Run, Crossy Road, Space Shooter, and more.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Play.Smarlify.co Gaming Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Play.Smarlify.co - Gaming Hub",
    description: "Experience the ultimate gaming hub with Traffic Run, Crossy Road, Space Shooter, and more.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Umami Analytics */}
        <Script
          src="https://umami.smarlify.co/script.js"
          data-website-id="your-website-id"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased gaming-bg`}
      >
        {children}
      </body>
    </html>
  );
}
