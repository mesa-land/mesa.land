import { colors, ThemeConfiguration } from "./deps.client.ts";

export const theme: ThemeConfiguration = {
  extend: {
    colors: {
      ...colors,
      gray: {
        400: "#212121",
      },
      blue: {
        400: "#03FFFF",
      },
      slate: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
      },
    },
  },
};
