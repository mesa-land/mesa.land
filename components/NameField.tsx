/** @jsx h */

import { h, tw, useState } from "../deps.client.ts";
import { GameFunction, GameSel, GameState } from "../std/GameState.ts";
import Button from "./Button.tsx";

export default function NameField(
  props: {
    game: GameState;
    playerId: string;
    editable?: boolean;
    clientGameFn?: GameFunction;
  },
) {
  const name = GameSel.connectedPlayer(props.game).name;
  const pId = GameSel.connectedPlayer(props.game).id;
  const isEmpty = name === "";
  const [nameInput, setNameInput] = useState(name);
  return (
    <div>
      {props.editable
        ? (
          isEmpty
            ? (
              <div>
                <input
                  type="text"
                  id="mesa-name"
                  placeholder="Choose your name..."
                  value={nameInput}
                  onInput={(e) => {
                    setNameInput(
                      (e!.target as HTMLInputElement).value,
                    );
                  }}
                  class={tw`m-2 p-1 text-black text-lg rounded-md shadow-md`}
                />
                <Button
                  onClick={() =>
                    props.clientGameFn!.rename(props.game, pId, nameInput)}
                >
                  Rename
                </Button>
              </div>
            )
            : (
              <div>
                {GameSel.connectedPlayer(props.game).name}
                <Button>Edit</Button>
              </div>
            )
        )
        : (
          <span>
            {props.game.players[props.playerId].name ||
              props.game.players[props.playerId].id}
          </span>
        )}
    </div>
  );
}
