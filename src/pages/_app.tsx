/** @jsxImportSource https://esm.sh/nano-jsx@v0.0.29/lib **/
import {
  getStyleTag,
  getStyleTagProperties,
  Helmet,
  html,
  renderSSR,
  setup,
  tw,
  virtualSheet,
} from "../deps.ts";
import { Game } from "../std/game.ts";
import { Header } from "../components/header.tsx";
import { Home } from "./index.tsx";
import { TablePage } from "./table.tsx";
import { isLiveReloadEnabled } from "../config.ts";

const lr = isLiveReloadEnabled();
const sheet = virtualSheet();
setup({ sheet, preflight: false });

export interface State {
  game?: Game;
}

const Layout = (props: State) => (
  <div class={tw`p-4 pb-0`}>
    <Header />
    {!props.game && <Home />}
    {props.game && <TablePage game={props.game} />}
  </div>
);

export const renderTable = (game: Game) => {
  sheet.reset();
  const html = renderSSR(<TablePage game={game!} />);
  const { textContent } = getStyleTagProperties(sheet);
  const split = textContent.split("}");
  split.pop();
  const css = split.map((r) => r + "}");

  return {
    html,
    css,
  };
};

export const render = (state: State) => {
  sheet.reset();
  const bodyClass = tw
    `font-sans bg-black bg-gradient-to-b from-black to-indigo-900 min-h-full`;
  const ssr = renderSSR(<Layout game={state.game} />);
  const { body, head, footer } = Helmet.SSR(ssr);
  const styleTag = getStyleTag(sheet);

  return html`<!DOCTYPE html>
    <html lang="en" class="${bodyClass}">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta property="og:title" content="mesa.land">
        <meta name="description" content="Play and create amazing online card games!">
        <meta property="og:description" content="Play and create amazing online card games!">
        <meta property="og:image" content="/mesa-label.png">
        <meta property="og:locale" content="en_US">
        <meta property="og:type" content="website">
        <meta name="twitter:card" content="summary_large_image">
        <meta property="og:url" content="https://mesa.land">
        ${styleTag}
        ${head.join("\n")}
        <script async src="/scripts/events.js"></script>
        ${lr ? <script async src="/livereload.js"></script> : ""}
      </head>
      <body>
        ${body}
        ${footer.join("\n")}
      </body>
    </html>`;
};
