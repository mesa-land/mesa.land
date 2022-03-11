/** @jsxImportSource https://esm.sh/nano-jsx@v0.0.29/lib **/
import {
  getStyleTag,
  Helmet,
  html,
  renderSSR,
  setup,
  tw,
  virtualSheet,
} from "../deps.ts";
import { isLiveReloadEnabled } from "../config.ts";
import { Layout, State } from "./index.tsx";

const lr = isLiveReloadEnabled();
const sheet = virtualSheet();
setup({ sheet, preflight: false });

export const render = (state: State) => {
  sheet.reset();
  const bodyClass = tw
    `font-sans bg-gradient-to-b from-black to-indigo-900 h-screen`;
  const ssr = renderSSR(<Layout {...state} />);
  const { body, head, footer } = Helmet.SSR(ssr);
  const styleTag = getStyleTag(sheet);

  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta property="og:title" content="Mesa.land">
        <meta name="description" content="Play and create amazing online card games!">
        <meta property="og:description" content="Play and create amazing online card games!">
        <meta property="og:image" content="/mesa-label.png">
        <meta property="og:locale" content="en_US">
        <meta property="og:type" content="website">
        <meta name="twitter:card" content="summary_large_image">
        <meta property="og:url" content="https://mesa.land">
        ${styleTag}
        ${head.join("\n")}
        <script async src="/scripts/ws.js"></script>
        ${lr ? <script async src="/livereload.js"></script> : ""}
      </head>
      <body class="${bodyClass}">
        ${body}
        ${footer.join("\n")}
      </body>
    </html>`;
};
