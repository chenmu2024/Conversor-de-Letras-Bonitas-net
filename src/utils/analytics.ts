export type AnalyticsEventParams = Record<string, string | number | boolean | null | undefined>;

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  plausible?: (eventName: string, options?: { props?: Record<string, string | number | boolean> }) => void;
};

export const ANALYTICS_CONSENT_EVENT = 'analytics-consent-changed';

export const hasAnalyticsConsent = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem('letras_cookies_analytics') === 'true';
  } catch {
    return false;
  }
};

export const emitAnalyticsConsentChanged = (enabled: boolean): void => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(ANALYTICS_CONSENT_EVENT, {
      detail: { enabled },
    })
  );
};

export const trackEvent = (name: string, params: AnalyticsEventParams = {}): void => {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return;

  const analyticsWindow = window as AnalyticsWindow;
  const safeParams = Object.fromEntries(
    Object.entries({
      page_path: window.location.pathname,
      ...params,
    }).filter(([, value]) => value !== undefined && value !== null)
  ) as Record<string, string | number | boolean>;

  if (typeof analyticsWindow.gtag === 'function') {
    analyticsWindow.gtag('event', name, safeParams);
    return;
  }

  if (typeof analyticsWindow.plausible === 'function') {
    analyticsWindow.plausible(name, { props: safeParams });
  }
};
