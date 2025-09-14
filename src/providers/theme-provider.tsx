"use client";
import React from "react";
import {
  MantineProvider,
  localStorageColorSchemeManager,
  createTheme,
} from "@mantine/core";

const colorSchemeManager = localStorageColorSchemeManager({
  key: "refactorium-color-scheme",
});

const theme = createTheme({
  fontFamily:
    "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, sans-serif",
  primaryColor: "blue",
  primaryShade: { light: 6, dark: 8 },
  defaultRadius: "sm",
  focusRing: "auto",
  autoContrast: true,
  headings: {
    fontFamily:
      "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, sans-serif",
    fontWeight: "600",
    textWrap: "balance",
  },
  colors: {
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5c5f66",
      "#373A40",
      "#2C2E33",
      "#25262b",
      "#1A1B23",
      "#141517",
      "#101113",
    ],
  },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="auto"
      colorSchemeManager={colorSchemeManager}
      withGlobalClasses
    >
      {children}
    </MantineProvider>
  );
}
