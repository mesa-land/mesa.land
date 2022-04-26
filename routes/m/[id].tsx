/** @jsx h */
import { h, PageProps } from "../../deps.client.ts";
import { Handlers } from "../../deps.server.ts";
import Connection from "../../islands/Connection.tsx";
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
  return <Connection {...props} />;
}
