/** @jsx h */

import { h, tw } from "../deps.client.ts";
import { Game, GameStatus } from "../std/Game.ts";

export default function StatusBar(
  props: { game: Game },
) {
  return (
    <div
      class={tw
        `border-solid border-b border-x-0 border-t-0 border-gray-400 text-gray-400 p-2`}
    >
      <span>
        mesa:{" "}
        <a
          class={tw`underline text-purple-500`}
          href={"/m/" + props.game.state.id}
        >
          {props.game.state.id}
        </a>
        {props.game.state.status === GameStatus.WAITING && (
          <span class={tw`ml-2`}>({props.game.state.status})</span>
        )}
      </span>
      {props.game.state.status === GameStatus.PLAYING &&
        (
          <span class={tw`ml-2`}>
            you may:{" "}
            <strong class={tw`uppercase text-purple-500`}>
              {props.game.state.currentPlayerMoves.join(", ")}
            </strong>
          </span>
        )}
      {props.game.state.currentPlayerId && (
        <span class={tw`ml-2`}>
          actions: {props.game.sel.currentPlayer().actions} buys:{" "}
          {props.game.sel.currentPlayer().buys} coins:{" "}
          {props.game.sel.playerCoins()}
        </span>
      )}
    </div>
  );
}
