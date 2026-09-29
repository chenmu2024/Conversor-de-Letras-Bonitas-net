import React, { useEffect, useState } from 'react';
import {
  ANALYTICS_CONSENT_EVENT,
  hasAnalyticsConsent,
  trackEvent,
} from '../utils/analytics';

type GoogleAnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  __ga4Initialized?: boolean;
};

export const AnalyticsLoader: React.FC = () => {
  const measurementId =
    typeof import.meta !== 'undefined' && import.meta.env
      ? String(import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim()
      : '';

  const featureEnabled =
    typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_ENABLE_ANALYTICS === 'true' &&
    measurementId.length > 0;

  const [consentGranted, setConsentGranted] = useState(false);

  useEffect(() => {
    if (!featureEnabled || typeof window === 'undefined') return;

    const syncConsent = () => setConsentGranted(hasAnalyticsConsent());
    const handleConsentChange = (event: Event) => {
      const custom = event as CustomEvent<{ enabled?: boolean }>;
      setConsentGranted(custom.detail?.enabled === true);
    };

    syncConsent();
    window.addEventListener(ANALYTICS_CONSENT_EVENT, handleConsentChange);

    return () => {
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, handleConsentChange);
    };
  }, [featureEnabled]);

  useEffect(() => {
    if (!featureEnabled || typeof window === 'undefined') return;

    const analyticsWindow = window as GoogleAnalyticsWindow;
    analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];

    if (!analyticsWindow.gtag) {
      analyticsWindow.gtag = (...args: unknown[]) => {
        analyticsWindow.dataLayer?.push(args);
      };
    }

    if (!consentGranted) {
      if (analyticsWindow.__ga4Initialized) {
        analyticsWindow.gtag('consent', 'update', {
          analytics_storage: 'denied',
        });
      }
      return;
    }

    analyticsWindow.gtag('consent', 'update', {
      analytics_storage: 'granted',
    });

    if (analyticsWindow.__ga4Initialized) return;

    const scriptId = 'ga4-analytics-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
      document.head.appendChild(script);
    }

    analyticsWindow.gtag('js', new Date());
    analyticsWindow.gtag('config', measurementId, {
      send_page_view: false,
    });
    analyticsWindow.gtag('event', 'page_view', {
      page_path: window.location.pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
    analyticsWindow.__ga4Initialized = true;
  }, [consentGranted, featureEnabled, measurementId]);

  return null;
};
