export * from "https://raw.githubusercontent.com/lucacasonato/fresh/main/runtime.ts";

import { IS_BROWSER } from "https://raw.githubusercontent.com/lucacasonato/fresh/main/runtime.ts";
import { apply, setup, tw } from "https://esm.sh/twind@0.16.16";
import * as colors from "https://esm.sh/twind@0.16.16/colors";
export * as colors from "https://esm.sh/twind@0.16.16/colors";
export * as Fae from "https://deno.land/x/fae@v1.0.0/mod.ts";

export { apply, setup, tw };

export const theme = {
  extend: {
    colors: {
      ...colors,
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

if (IS_BROWSER) {
  console.log("twind setup", IS_BROWSER);
  setup({ theme });
}
