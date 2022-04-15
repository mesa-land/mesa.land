/** @jsx h */
import { h } from "../deps.client.ts";
import { MesaEvent } from "../std/events.ts";
import { Game } from "../std/game.ts";

export default function GameIsland(
  props: { game: Game; publishEvent: (e: MesaEvent) => void },
) {
  return (
    <span>
      {JSON.stringify(props.game)}
    </span>
  );
}
