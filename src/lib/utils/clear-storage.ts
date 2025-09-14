"use client";

/**
 * Clears all localStorage data related to the application
 */
export function clearAllStorage() {
  if (typeof window === "undefined") return;

  try {
    // Clear all localStorage items
    localStorage.clear();

    // Clear specific items that might not be cleared by clear()
    const keysToRemove = [
      "refactorium-cookie-consent",
      "next-auth.session-token",
      "next-auth.csrf-token",
      "next-auth.callback-url",
      "mantine-color-scheme",
      "mantine-primary-color",
      "mantine-primary-shade",
      "mantine-white-color",
      "mantine-black-color",
      "mantine-default-radius",
      "mantine-default-shadow",
      "mantine-default-spacing",
      "mantine-default-font-family",
      "mantine-default-font-size",
      "mantine-default-line-height",
    ];

    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });

    // Clear sessionStorage as well
    sessionStorage.clear();

    // Clear all cookies (client-side)
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${
        window.location.hostname
      }`;
      document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${
        window.location.hostname
      }`;
    });

    console.log("✅ All storage and cookies cleared successfully");
  } catch (error) {
    console.error("❌ Error clearing storage:", error);
  }
}

/**
 * Clears only application-specific data (keeps system preferences)
 */
export function clearAppData() {
  if (typeof window === "undefined") return;

  try {
    // Clear only app-specific items
    const appKeys = [
      "refactorium-cookie-consent",
      "next-auth.session-token",
      "next-auth.csrf-token",
      "next-auth.callback-url",
    ];

    appKeys.forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });

    console.log("✅ App data cleared successfully");
  } catch (error) {
    console.error("❌ Error clearing app data:", error);
  }
}
