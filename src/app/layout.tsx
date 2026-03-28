import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "Arnaud Delerue",
    template: "%s | Arnaud Delerue",
  },
  description:
    "Artiste contemporain. Spectacles, dates de tournée, presse et contact.",
  openGraph: {
    type: "website",
    title: "Arnaud Delerue",
    description:
      "Artiste contemporain. Spectacles, dates de tournée, presse et contact.",
    siteName: "Arnaud Delerue",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arnaud Delerue",
    description:
      "Artiste contemporain. Spectacles, dates de tournée, presse et contact.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${playfair.variable} min-h-screen bg-neutral-950 font-sans text-neutral-100 antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <Script
          src="https://widget.weezevent.com/weez.js"
          strategy="afterInteractive"
        />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
