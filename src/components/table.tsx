/** @jsxImportSource https://esm.sh/nano-jsx@v0.0.29/lib **/
import { tw } from "../deps.ts";
import { Card } from "./card.tsx";
import { CardState } from "../std/card.ts";
import { Game, GameStatus } from "../std/game.ts";
import { Button } from "./button.tsx";

const Hall = (props: { game: Game }) => (
  <div id="waiting-hall">
    <span>Players</span>
    <ul class={tw`my-4`} style="padding-inline-start: 1em;">
      {props.game.players.map((p) => <li>{p.id}</li>)}
    </ul>
    <Button data-event-type="start">Start mesa</Button>
  </div>
);

const Supply = (props: { game: Game }) => (
  <div id="table-supply">
    <h2 class={tw`mt-0`}>Supply</h2>
    <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
      {props.game.getCoinsAndWins().map((c: CardState) => (
        <Card card={c} showQuantity showBuy />
      ))}
    </div>
    <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
      {props.game.getActions().map((c: CardState) => (
        <Card card={c} showQuantity showBuy />
      ))}
    </div>
  </div>
);

const Player = (props: { game: Game }) => (
  <div id="player-table">
    <h2>In play</h2>
    <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
      {props.game.getInPlay().map((c: CardState) => (
        <Card
          card={c}
        />
      ))}
    </div>
    <h2>Discard</h2>
    <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
      {props.game.getDiscard().map((c: CardState) => (
        <Card
          card={c}
          showPlay
        />
      ))}
    </div>
    <h2>Hand</h2>
    <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
      {props.game.getHand().map((c: CardState) => <Card card={c} showPlay />)}
    </div>
    <span>Deck: {props.game.player().deck.length}</span>
  </div>
);

const GameTable = (props: { game: Game }) => (
  <>
    <Supply game={props.game} />
    <Player game={props.game} />
  </>
);

const Results = () => <span>You win</span>;

export const Table = (props: { game: Game }) => {
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
              phase:{" "}
              <strong class={tw`uppercase text-purple-500`}>
                {props.game.phase}
              </strong>
            </span>
          )}
      </div>
      <div
        class={tw`p-6 b1 `}
      >
        {props.game.status === GameStatus.WAITING
          ? <Hall game={props.game} />
          : props.game.status === GameStatus.PLAYING
          ? <GameTable game={props.game} />
          : <Results />}
      </div>
    </div>
  );
};
