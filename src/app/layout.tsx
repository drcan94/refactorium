// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "./globals.css";
import { ThemeProvider, QueryProvider, AuthProvider } from "@/providers";
import { AppShellLayout } from "@/components";
import { CookieConsentBanner } from "@/components/cookie-consent/CookieConsentBanner";

export const metadata = {
  title: "Refactorium - Code Smell Playground",
  description:
    "Learn-by-doing: transform small code snippets from problem to refactor with side-by-side context.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <AuthProvider>
          <QueryProvider>
            <ThemeProvider>
              <AppShellLayout>{children}</AppShellLayout>
              <Notifications />
              <CookieConsentBanner />
            </ThemeProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
