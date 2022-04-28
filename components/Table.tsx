/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, tw, useState } from "../deps.client.ts";
import {
  GameFunction,
  GameSel,
  GameState,
  GameStatus,
} from "../std/GameState.ts";
import Button from "./Button.tsx";
import Supply from "./Supply.tsx";
import Player from "./Player.tsx";

const NameField = (
  props: {
    game: GameState;
    playerId: string;
    editable?: boolean;
    clientGameFn?: GameFunction;
  },
) => {
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
};

const Hall = (
  props: { game: GameState; playerId: string; clientGameFn: GameFunction },
) => (
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

const Results = () => <span>You win</span>;

export const Table = (
  props: { game: GameState; playerId: string; clientGameFn: GameFunction },
) => {
  return (
    <div
      id="table-component"
      class={tw
        `flex-row my-6 rounded-lg text-white border-solid border-1 border-gray-400`}
    >
      <div
        class={tw
          `border-solid border-b border-x-0 border-t-0 border-gray-400 text-gray-400 p-2`}
      >
        <span>
          mesa:{" "}
          <a
            class={tw`underline text-purple-500`}
            href={"/m/" + props.game.id}
          >
            {props.game.id}
          </a>
          {props.game.status === GameStatus.WAITING && (
            <span class={tw`ml-2`}>({props.game.status})</span>
          )}
        </span>
        {props.game.status === GameStatus.PLAYING &&
          (
            <span class={tw`ml-2`}>
              you may:{" "}
              <strong class={tw`uppercase text-purple-500`}>
                {props.game.currentPlayerMoves.join(", ")}
              </strong>
            </span>
          )}
        {props.game.currentPlayerId && (
          <span class={tw`ml-2`}>
            actions: {GameSel.currentPlayer(props.game).actions} buys:{" "}
            {GameSel.currentPlayer(props.game).buys} coins:{" "}
            {GameSel.playerCoins(props.game)}
          </span>
        )}
      </div>
      <div
        class={tw`p-6 `}
      >
        {props.game.status === GameStatus.WAITING
          ? (
            <Hall
              game={props.game}
              playerId={props.playerId}
              clientGameFn={props.clientGameFn}
            />
          )
          : props.game.status === GameStatus.PLAYING
          ? (
            <>
              <Supply game={props.game} />
              <Player game={props.game} />
            </>
          )
          : <Results />}
      </div>
    </div>
  );
};
