/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, Head, PageProps } from "../../deps.client.ts";
import { Handlers } from "../../deps.server.ts";
import GameConnection from "../../islands/GameConnection.tsx";
import { getGameById } from "../../data/game.ts";
import { GameState } from "../../std/GameState.ts";

export const handler: Handlers<GameState> = {
  GET(_, ctx) {
    const { id: gameId } = ctx.params;
    const game = getGameById(gameId);
    return ctx.render(game);
  },
};

export default function GameRoute(props: PageProps<GameState>) {
  const autoplay = Deno.env.get("MESA_AUTOPLAY");
  const windowMesa = JSON.stringify({ env: { MESA_AUTOPLAY: autoplay } });
  return (
    <>
      <Head>
        <title>
          Mesa - playing mesa: {props.params.id}
        </title>
        <meta
          name="description"
          content={`Join the mesa: ${props.params.id}`}
        />
        <script
          dangerouslySetInnerHTML={{ __html: `window.mesa = ${windowMesa}` }}
        >
        </script>
      </Head>
      <GameConnection {...props} />;
    </>
  );
}
