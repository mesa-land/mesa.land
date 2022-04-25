/** @jsx h */
import { Table } from "../components/table.tsx";
import { h, IS_BROWSER } from "../deps.client.ts";
import { MesaEvent } from "../std/events.ts";
import { Game } from "../std/game.ts";

export default function GameIsland(
  props: { game: Game; publishEvent?: (e: MesaEvent) => void },
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
