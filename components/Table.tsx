/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, tw } from "../deps.client.ts";
import { Game, GameStatus } from "../std/Game.ts";
import Supply from "./Supply.tsx";
import Player from "./Player.tsx";
import Hall from "./Hall.tsx";
import StatusBar from "./StatusBar.tsx";

const Results = () => <span>You win</span>;

export const Table = (
  props: { game: Game },
) => {
  return (
    <div
      id="table-component"
      class={tw`flex-row text-white `}
    >
      <div
        class={tw`pt-2 `}
      >
        {!props.game.sel.connectedPlayer()
          ? "connecting to your mesa..."
          : props.game.state.status === GameStatus.WAITING
          ? <Hall game={props.game} />
          : props.game.state.status === GameStatus.PLAYING
          ? (
            <>
              <Supply game={props.game} />
              <StatusBar game={props.game} />
              <Player game={props.game} />
            </>
          )
          : <Results />}
      </div>
    </div>
  );
};
