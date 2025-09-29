import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ParticleBackground from '@/components/ParticleBackground';
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Playful by Smarlify - Ultimate Gaming Hub",
  description: "Experience the ultimate gaming hub with Traffic Run, Crossy Road, Space Shooter, and more. Play amazing games built with cutting-edge web technologies like Three.js, WebGL, and Unity 3D.",
  keywords: ["gaming", "games", "web games", "Traffic Run", "Crossy Road", "Space Shooter", "Three.js", "WebGL", "Unity 3D", "Smarlify", "Playful", "online games", "browser games", "free games"],
  authors: [{ name: "Smarlify", url: "https://github.com/smarlify" }],
  creator: "Smarlify",
  publisher: "Smarlify",
  metadataBase: new URL("https://playful.smarlify.co"),
  alternates: {
    canonical: "https://playful.smarlify.co",
  },
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
    url: "https://playful.smarlify.co",
    siteName: "Playful by Smarlify",
    title: "Playful by Smarlify - Ultimate Gaming Hub",
    description: "Experience the ultimate gaming hub with Traffic Run, Crossy Road, Space Shooter, and more. Play amazing games built with cutting-edge web technologies.",
    images: [
      {
        url: "/game-assets/crossy-road.png",
        width: 1200,
        height: 630,
        alt: "Crossy Road - Playful by Smarlify Gaming Hub",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@smarlify",
    creator: "@smarlify",
    title: "Playful by Smarlify - Ultimate Gaming Hub",
    description: "Experience the ultimate gaming hub with Traffic Run, Crossy Road, Space Shooter, and more. Play amazing games built with cutting-edge web technologies.",
    images: ["/game-assets/crossy-road.png"],
  },
  verification: {
    google: "your-google-verification-code",
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
    <html lang="en">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Playful by Smarlify",
              "description": "Experience the ultimate gaming hub with Traffic Run, Crossy Road, Space Shooter, and more. Play amazing games built with cutting-edge web technologies.",
              "url": "https://playful.smarlify.co",
              "publisher": {
                "@type": "Organization",
                "name": "Smarlify",
                "url": "https://smarlify.co"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://playful.smarlify.co?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "sameAs": [
                "https://github.com/smarlify"
              ]
            })
          }}
        />
        {/* Umami Analytics */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="83e255ad-387c-4a7d-90af-8b5787fc38bb"
          strategy="afterInteractive"
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C4NNL9P9S8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C4NNL9P9S8');
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} font-sans antialiased gaming-bg`}
      >
        <ParticleBackground />
        {children}
      </body>
    </html>
  );
}
