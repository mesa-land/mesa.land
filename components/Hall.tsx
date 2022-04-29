/** @jsx h */

import { h, tw } from "../deps.client.ts";
import { GameFunction, GameState } from "../std/GameState.ts";
import Button from "./Button.tsx";
import NameField from "./NameField.tsx";

export default function Hall(
  props: { game: GameState; playerId: string; clientGameFn: GameFunction },
) {
  return (
    <div id="waiting-hall">
      <span>Players in this mesa:</span>
      <ul class={tw`my-4`} style="padding-inline-start: 1em;">
        {Object.keys(props.game.players).map((pId) => (
          <li>
            {pId === props.playerId
              ? (
                <NameField
                  game={props.game}
                  playerId={pId}
                  editable
                  clientGameFn={props.clientGameFn}
                />
              )
              : <NameField game={props.game} playerId={pId} />}
          </li>
        ))}
      </ul>
      <Button onClick={() => props.clientGameFn.start(props.game)}>
        Start mesa
      </Button>
    </div>
  );
}
