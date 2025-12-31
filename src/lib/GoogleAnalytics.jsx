'use client';

import { useEffect } from 'react';
import Script from 'next/script';

/**
 * Google Analytics 4 Component
 * 
 * Loads the GA4 tracking script and initializes gtag.
 * Only loads in production to prevent tracking during development.
 */
export default function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    // Only load in production and if measurement ID is set
    if (process.env.NODE_ENV !== 'production' || !GA_MEASUREMENT_ID) {
      console.log('Google Analytics disabled in development mode');
      return;
    }
  }, [GA_MEASUREMENT_ID]);

  // Don't render in development or if no measurement ID
  if (process.env.NODE_ENV !== 'production' || !GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      {/* Google Analytics gtag.js script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      
      {/* Initialize gtag */}
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              // Anonymize IP for privacy
              anonymize_ip: true,
              // Don't send page view on load (we'll track it manually if needed)
              send_page_view: true
            });
          `,
        }}
      />
    </>
  );
}
