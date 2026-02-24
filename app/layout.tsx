import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TeamFrame – plánovač směn (8h/12h) a výrobní dashboard",
  description:
    "TeamFrame je modulární systém pro plánování směn, řízení strojů, kvalifikace zaměstnanců a evidenci incidentů pro výrobní provoz. Klient, server a velkoplošný dashboard.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.ico",
  },
  metadataBase: new URL("https://teamframe.cz"),
  openGraph: {
    title: "TeamFrame – plánování směn pro výrobu",
    description:
      "Moderní systém pro plánování směn, dashboard ACTIVE/NEXT, kvalifikace zaměstnanců a incidenty ve výrobě.",
    url: "https://teamframe.cz",
    siteName: "TeamFrame",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="cs">
      <head>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
