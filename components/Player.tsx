/** @jsx h */

import { h, tw } from "../deps.client.ts";
import Card from "./Card.tsx";
import { GameCard } from "../std/GameCard.ts";
import { Game } from "../std/Game.ts";

export default function Player(props: { game: Game }) {
  return (
    <div id="player-table">
      <h2>In play</h2>
      <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
        {props.game.sel.getInPlay().map((c: GameCard) => (
          <Card card={c} game={props.game} />
        ))}
      </div>
      <h2>Discard</h2>
      <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
        {props.game.sel.getDiscard().map((c: GameCard) => (
          <Card card={c} game={props.game} />
        ))}
      </div>
      <h2>Hand</h2>
      <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
        {props.game.sel.getHand().map((c: GameCard) => (
          <Card card={c} showPlay game={props.game} />
        ))}
      </div>
      <span>Deck: {props.game.sel.connectedPlayer().deck.length}</span>
    </div>
  );
}
