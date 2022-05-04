/** @jsx h */

import { h, tw } from "../deps.client.ts";
import { Game } from "../std/Game.ts";
import Button from "./Button.tsx";
import NameField from "./NameField.tsx";

export default function Hall(
  props: { game: Game },
) {
  return (
    <div id="waiting-hall">
      <span>Players in this mesa:</span>
      <ul class={tw`my-4`} style="padding-inline-start: 1em;">
        {Object.keys(props.game.state.players).map((pId) => (
          <li>
            {pId === props.game.state.connectedPlayerId
              ? (
                <NameField
                  game={props.game}
                  playerId={pId}
                  editable
                />
              )
              : <NameField game={props.game} playerId={pId} />}
          </li>
        ))}
      </ul>
      <Button onClick={() => props.game.fn.start()}>
        Start mesa
      </Button>
    </div>
  );
}
