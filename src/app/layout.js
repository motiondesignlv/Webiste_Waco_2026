import { Manrope, JetBrains_Mono } from "next/font/google";
import { defaultLocale } from "@/lib/i18n";
import GoogleAnalytics from "@/lib/GoogleAnalytics";
import StructuredData from "@/lib/StructuredData";
import { LocaleProvider } from "@/lib/LocaleProvider";
import en from "@/messages/en";
import "./globals.scss";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('https://www.waco3.io'),
  title: en.meta.title,
  description: en.meta.description,
  keywords: ['AI proposals', 'proposal software', 'client analytics', 'freelance tools', 'proposal tracking', 'AI document creation', 'proposal templates', 'client engagement analytics'],
  authors: [{ name: 'Waco3' }],
  creator: 'Waco3',
  publisher: 'Waco3',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_ES'],
    url: 'https://www.waco3.io',
    title: en.meta.title,
    description: en.meta.description,
    siteName: 'Waco3',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Waco3 - AI proposal creation with client analytics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: en.meta.title,
    description: en.meta.description,
    images: ['/og-image.png'],
    creator: '@waco3io',
  },
  alternates: {
    canonical: 'https://www.waco3.io',
    languages: {
      'en-US': 'https://www.waco3.io',
      'es-ES': 'https://www.waco3.io/es',
    },
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang={defaultLocale}>
      <head>
        <StructuredData />
      </head>
      <body className={`${manrope.variable} ${jetBrainsMono.variable}`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <GoogleAnalytics />
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
