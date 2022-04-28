/** @jsx h */
import { h, IS_BROWSER } from "../deps.client.ts";
import { GameFunction, GameState } from "../std/GameState.ts";
import { Table } from "../components/Table.tsx";
import { logGame } from "../utils/log.ts";

export default function GameIsland(
  props: { game: GameState; clientGameFn?: GameFunction },
) {
  console.log(
    "rendering game island on " + (IS_BROWSER ? "browser" : "server"),
  );
  logGame(props.game);
  return (
    <span>
      browser: {IS_BROWSER + ""}
      <br />
      <Table
        game={props.game}
        playerId={props.game.connectedPlayerId || ""}
        clientGameFn={props.clientGameFn!}
      />
    </span>
  );
}
