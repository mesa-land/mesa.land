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
import StatusBar from "./StatusBar.tsx";

const Results = () => <span>You win</span>;

export const Table = (
  props: { game: GameState; playerId: string; clientGameFn: GameFunction },
) => {
  return (
    <div
      id="table-component"
      class={tw
        `flex-row rounded-lg text-white border-solid border-1 border-gray-400`}
    >
      <StatusBar
        game={props.game}
        playerId={props.playerId}
        clientGameFn={props.clientGameFn}
      />
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
