/** @jsx h */
import { h, IS_BROWSER } from "../deps.client.ts";
import { GameState } from "../std/GameState.ts";
import { Table } from "../components/Table.tsx";

export default function GameIsland(
  props: { game: GameState; publishEvent?: (e: any) => void },
) {
  console.log("rendering game island", props.publishEvent, props.game);
  return (
    <span>
      browser: {IS_BROWSER + ""}
      <br />
      <Table game={props.game} playerId={props.game.connectedPlayerId || ""} />
    </span>
  );
}
