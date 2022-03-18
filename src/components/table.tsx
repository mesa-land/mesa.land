/** @jsxImportSource https://esm.sh/nano-jsx@v0.0.29/lib **/
import { tw } from "../deps.ts";
import { Card } from "./card.tsx";
import { CardState } from "../std/card.ts";
import { Game, GameStatus } from "../std/game.ts";

const Hall = (props: { game: Game }) => (
  <div id="waiting-hall">
    <span>Players:</span>
    <ul>
      {props.game.players.map((p) => <li>{p.id}</li>)}
    </ul>
    <button data-event-type="start">Start</button>
  </div>
);

const Supply = (props: { game: Game }) => (
  <div id="table-supply">
    <h2>Supply</h2>
    <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
      {props.game.getCoinsAndWins().map((c: CardState) => (
        <Card card={c} showQuantity />
      ))}
    </div>
    <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
      {props.game.getActions().map((c: CardState) => (
        <Card card={c} showQuantity />
      ))}
    </div>
  </div>
);

const Player = (props: { game: Game }) => (
  <div id="player-table">
    <h2>My discard:</h2>
    <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
      {props.game.getDiscard().map((c: CardState) => <Card card={c} />)}
    </div>
    <h2>My hand:</h2>
    <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
      {props.game.getHand().map((c: CardState) => <Card card={c} />)}
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
        `bg-white bg-opacity-50 rounded-lg pt-6 mt-4 p-4 overflow-scroll h-[80vh]`}
    >
      <span>Table ID: {props.game.id}</span>
      <span>Status: {props.game.status}</span>
      {props.game.status === GameStatus.WAITING
        ? <Hall game={props.game} />
        : props.game.status === GameStatus.PLAYING
        ? <GameTable game={props.game} />
        : <Results />}
    </div>
  );
};
