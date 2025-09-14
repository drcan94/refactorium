"use client";

import { useCookieConsent } from "./use-cookie-consent";

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export function useAnalytics() {
  const { canTrack, consent } = useCookieConsent();

  const track = (event: AnalyticsEvent) => {
    if (!canTrack()) {
      console.log("Analytics tracking disabled:", event);
      return;
    }

    // In a real app, you would send this to your analytics service
    console.log("Analytics event:", event);

    // Example: Send to Google Analytics, Mixpanel, etc.
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }
  };

  const trackPageView = (page: string) => {
    track({
      action: "page_view",
      category: "navigation",
      label: page,
    });
  };

  const trackUserAction = (
    action: string,
    category: string,
    label?: string
  ) => {
    track({
      action,
      category,
      label,
    });
  };

  const trackSettingsChange = (setting: string, value: any) => {
    track({
      action: "settings_change",
      category: "user_preferences",
      label: setting,
      value: typeof value === "boolean" ? (value ? 1 : 0) : undefined,
    });
  };

  const trackCodeSmellInteraction = (smellId: string, action: string) => {
    track({
      action: "code_smell_interaction",
      category: "learning",
      label: `${action}_${smellId}`,
    });
  };

  return {
    track,
    trackPageView,
    trackUserAction,
    trackSettingsChange,
    trackCodeSmellInteraction,
    canTrack: canTrack(),
    hasAnalyticsConsent: consent?.analytics === true,
  };
}
