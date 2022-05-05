/** @jsx h */

import { h, tw, useState } from "../deps.client.ts";
import { Game } from "../std/Game.ts";
import Button from "./Button.tsx";

export default function NameField(
  props: {
    game: Game;
    playerId: string;
    editable?: boolean;
  },
) {
  const name = props.game.sel.connectedPlayer().name;
  const pId = props.game.sel.connectedPlayer().id;
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
                  class={tw`my-2 p-1 text-black text-lg rounded-md shadow-md`}
                />
                <span class={tw`ml-2`}>
                  <Button
                    onClick={() => props.game.fn.rename(pId, nameInput)}
                  >
                    Rename
                  </Button>
                </span>
              </div>
            )
            : (
              <div>
                {props.game.sel.connectedPlayer().name}
                <Button>Edit</Button>
              </div>
            )
        )
        : (
          <span>
            {props.game.state.players[props.playerId].name ||
              props.game.state.players[props.playerId].id}
          </span>
        )}
    </div>
  );
}
