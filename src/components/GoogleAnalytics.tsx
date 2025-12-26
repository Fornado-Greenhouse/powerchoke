'use client';

import Script from 'next/script';
import { useConsentStatus } from './CookieConsent';

const GA_MEASUREMENT_ID = 'G-X562S16Z09';

export function GoogleAnalytics() {
  const consentStatus = useConsentStatus();

  // Don't render anything until user has consented
  if (consentStatus !== 'accepted') return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            // GDPR-friendly settings
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false
          });
        `}
      </Script>
    </>
  );
}
