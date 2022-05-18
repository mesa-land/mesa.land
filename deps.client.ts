export * from "https://raw.githubusercontent.com/lucacasonato/fresh/main/runtime.ts";
export type { ThemeConfiguration } from "https://esm.sh/twind@0.16.16";
export * as colors from "https://esm.sh/twind@0.16.16/colors";
export * as Fae from "https://deno.land/x/fae@v1.0.0/mod.ts";

import { IS_BROWSER } from "https://raw.githubusercontent.com/lucacasonato/fresh/main/runtime.ts";
import { apply, setup, tw } from "https://esm.sh/twind@0.16.16";
import { theme } from "./theme.ts";

export { apply, setup, tw };

if (IS_BROWSER) {
  console.log("twind setup", IS_BROWSER);
  setup({ theme });
}
