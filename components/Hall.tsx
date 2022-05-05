/** @jsx h */

import { h, tw, useState } from "../deps.client.ts";
import { Game } from "../std/Game.ts";
import Button from "./Button.tsx";
import NameField from "./NameField.tsx";
import Show from "./Show.tsx";

export default function Hall(
  props: { game: Game },
) {
  const name = props.game.sel.connectedPlayer()?.name;
  const pId = props.game.sel.connectedPlayer()?.id;
  const [nameInput, setNameInput] = useState(name);
  console.log("nameInput", nameInput);
  const isEmpty = nameInput === "";
  console.log("isEmpty", isEmpty);
  const [isEditing, setEdit] = useState(isEmpty);
  console.log("isEditing", isEditing);

  return (
    <div id="waiting-hall">
      {isEditing
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
                onClick={() =>
                  props.game.fn.rename(pId, nameInput) && setEdit(false)}
              >
                Rename
              </Button>
            </span>
          </div>
        )
        : null}

      <Show when={!isEditing}>
        <span>Players in this mesa:</span>
        <ul class={tw``}>
          {Object.keys(props.game.state.players).map((pId) => (
            <li>
              {pId === props.game.state.connectedPlayerId
                ? (
                  <div>
                    {name} (Me)
                    <span class={tw`ml-2`}>
                      <Button onClick={() => setEdit(true)}>Edit</Button>
                    </span>
                  </div>
                )
                : <NameField game={props.game} playerId={pId} />}
            </li>
          ))}
        </ul>
        <div class={tw`mt-2`}>
          <Button onClick={() => props.game.fn.start()}>
            Start mesa
          </Button>
        </div>
      </Show>
    </div>
  );
}
