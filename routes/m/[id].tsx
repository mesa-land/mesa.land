/** @jsx h */
import { h, PageProps } from "../../deps.client.ts";
import { Handlers } from "../../deps.server.ts";
import Connection from "../../islands/Connection.tsx";
import GameIsland from "../../islands/Game.tsx";
import { MesaEvent } from "../../std/events.ts";
import { getGameById } from "../../data/game.ts";
import { Game } from "../../std/game.ts";

export const handler: Handlers<Game> = {
  GET(_, ctx) {
    const { id: gameId } = ctx.params;
    const game = getGameById(gameId);
    return ctx.render(game);
  },
};

export default function GameRoute(game: PageProps<Game>) {
  return (
    <Connection game={game}>
      {(game: Game, publishEvent: (e: MesaEvent) => void) => (
        // TODO: new Game(gameState)
        <GameIsland game={game} publishEvent={publishEvent} />
      )}
    </Connection>
  );
}
