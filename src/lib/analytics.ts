// Central mät-config. Johannes byter GTM_ID när kontot skapats.
export const GTM_ID = "GTM-XXXXXXX";

export const CONSENT_STORAGE_KEY = "sk_consent_v1";
export const ATTRIBUTION_STORAGE_KEY = "sk_attribution_v1";
const CONSENT_MAX_AGE_DAYS = 180; // ~6 månader

export type ConsentCategory = "analytics" | "ads";
export type ConsentState = {
  analytics: boolean;
  ads: boolean;
  ts: number; // unix ms
};

type GtagConsentUpdate = {
  ad_storage: "granted" | "denied";
  analytics_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function pushGtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/** Kör en gång, så tidigt som möjligt, före GTM laddas. */
export function initConsentDefaults() {
  if (typeof window === "undefined") return;
  if ((window as unknown as { __sk_consent_init?: boolean }).__sk_consent_init) return;
  (window as unknown as { __sk_consent_init?: boolean }).__sk_consent_init = true;
  window.dataLayer = window.dataLayer || [];
  pushGtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });
}

function toGtagUpdate(state: ConsentState): GtagConsentUpdate {
  const a = state.analytics ? "granted" : "denied";
  const ad = state.ads ? "granted" : "denied";
  return {
    analytics_storage: a,
    ad_storage: ad,
    ad_user_data: ad,
    ad_personalization: ad,
  };
}

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    const ageDays = (Date.now() - parsed.ts) / (1000 * 60 * 60 * 24);
    if (ageDays > CONSENT_MAX_AGE_DAYS) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(state: Omit<ConsentState, "ts">) {
  const full: ConsentState = { ...state, ts: Date.now() };
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(full));
  } catch {
    /* ignore */
  }
  pushGtag("consent", "update", toGtagUpdate(full));
  return full;
}

/** Push ett event till dataLayer. Safe on SSR. */
export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

// ---------- Attribution ----------
export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  fbp?: string;
  landing_page?: string;
  referrer?: string;
  captured_at?: number;
};

const ATTR_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"] as const;

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const m = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : undefined;
}

/** Läs UTM/gclid/fbclid från URL vid landning och lagra i sessionStorage (första vinner). */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    const existing = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    const url = new URL(window.location.href);
    const fresh: Attribution = {};
    let hasNew = false;
    for (const k of ATTR_KEYS) {
      const v = url.searchParams.get(k);
      if (v) {
        (fresh as Record<string, string>)[k] = v;
        hasNew = true;
      }
    }
    const fbp = readCookie("_fbp");
    if (fbp) fresh.fbp = fbp;

    if (existing && !hasNew) {
      // uppdatera bara _fbp om det saknas
      if (fbp) {
        const prev = JSON.parse(existing) as Attribution;
        if (!prev.fbp) {
          prev.fbp = fbp;
          sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(prev));
        }
      }
      return;
    }
    fresh.landing_page = window.location.pathname + window.location.search;
    fresh.referrer = document.referrer || undefined;
    fresh.captured_at = Date.now();
    sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(fresh));
  } catch {
    /* ignore */
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    const base: Attribution = raw ? (JSON.parse(raw) as Attribution) : {};
    const fbp = readCookie("_fbp");
    if (fbp && !base.fbp) base.fbp = fbp;
    return base;
  } catch {
    return {};
  }
}
