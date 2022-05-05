/** @jsx h */

import { h } from "../deps.client.ts";
import { Game } from "../std/Game.ts";

export default function NameField(
  props: {
    game: Game;
    playerId: string;
    editable?: boolean;
  },
) {
  return (
    <div>
      <span>
        {props.game.state.players[props.playerId].name ||
          props.game.state.players[props.playerId].id}
      </span>
    </div>
  );
}
