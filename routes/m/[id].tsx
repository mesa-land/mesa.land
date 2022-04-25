/** @jsx h */
import { h, PageProps } from "../../deps.client.ts";
import { Handlers } from "../../deps.server.ts";
import Connection from "../../islands/Connection.tsx";
import { getGameById } from "../../data/game.ts";
import { Game } from "../../std/game.ts";

export const handler: Handlers<Game> = {
  GET(_, ctx) {
    const { id: gameId } = ctx.params;
    const game = getGameById(gameId);
    return ctx.render(game);
  },
};

export default function GameRoute(props: PageProps<Game>) {
  return <Connection {...props} />;
}
