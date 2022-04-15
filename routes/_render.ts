// This module adds twind support.

import { setup } from "../deps.client.ts";
import {
  colors,
  RenderContext,
  RenderFn,
  virtualSheet,
} from "../deps.server.ts";

const theme = {
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

const sheet = virtualSheet();
sheet.reset();
setup({ sheet, theme });

export function render(ctx: RenderContext, render: RenderFn) {
  const snapshot = ctx.state.get("twindSnapshot") as unknown[] | null;
  sheet.reset(snapshot || undefined);
  render();
  ctx.styles.splice(0, ctx.styles.length, ...sheet.target);
  const newSnapshot = sheet.reset();
  ctx.state.set("twindSnapshot", newSnapshot);
}
