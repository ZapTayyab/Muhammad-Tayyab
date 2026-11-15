/**
 * Safe, type-safe Google Analytics 4 (gtag.js) event tracking helper.
 * Fails silently if gtag is not loaded, blocked by adblockers, or running in non-browser environments.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | null | undefined>
): void {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, params ?? {});
    }
  } catch {
    // Fail silently to never disrupt the user experience
  }
}

