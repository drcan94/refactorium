"use client";

import { useState, useEffect, useLayoutEffect } from "react";

export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const COOKIE_CONSENT_KEY = "refactorium-cookie-consent";

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(() => {
    // Initialize with saved consent if available (SSR-safe)
    if (typeof window !== "undefined") {
      try {
        const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (savedConsent) {
          return JSON.parse(savedConsent);
        }
      } catch (error) {
        console.error("Failed to parse saved cookie consent:", error);
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Load consent from localStorage
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (savedConsent) {
      try {
        setConsent(JSON.parse(savedConsent));
      } catch (error) {
        console.error("Failed to parse saved cookie consent:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const updateConsent = (newConsent: Partial<CookieConsent>) => {
    const updatedConsent = {
      necessary: true, // Always true
      analytics: false,
      marketing: false,
      preferences: false,
      ...consent,
      ...newConsent,
    };

    setConsent(updatedConsent);
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(updatedConsent));

    // Update analytics tracking based on consent
    if (typeof window !== "undefined") {
      if (updatedConsent.analytics) {
        // Enable analytics tracking
        console.log("Analytics tracking enabled");
      } else {
        // Disable analytics tracking
        console.log("Analytics tracking disabled");
      }
    }
  };

  const acceptAll = () => {
    updateConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    });
  };

  const rejectAll = () => {
    updateConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
  };

  const clearConsent = () => {
    setConsent(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
    }
  };

  const hasConsent = () => {
    return consent !== null;
  };

  const canTrack = () => {
    return consent?.analytics === true;
  };

  return {
    consent,
    isLoading,
    updateConsent,
    acceptAll,
    rejectAll,
    clearConsent,
    hasConsent,
    canTrack,
  };
}
