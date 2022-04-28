/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, tw } from "../deps.client.ts";
import {
  GameFunction,
  GameSel,
  GameState,
  GameStatus,
} from "../std/GameState.ts";
import Supply from "./Supply.tsx";
import Player from "./Player.tsx";
import Hall from "./Hall.tsx";

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
