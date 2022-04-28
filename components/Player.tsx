/** @jsx h */

import { h, tw } from "../deps.client.ts";
import Card from "./Card.tsx";
import { GameCard } from "../std/GameCard.ts";
import { GameSel, GameState } from "../std/GameState.ts";

export default function Player(props: { game: GameState }) {
  return (
    <div id="player-table">
      <h2>In play</h2>
      <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
        {GameSel.getInPlay(props.game).map((c: GameCard) => (
          <Card
            card={c}
          />
        ))}
      </div>
      <h2>Discard</h2>
      <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
        {GameSel.getDiscard(props.game).map((c: GameCard) => (
          <Card
            card={c}
          />
        ))}
      </div>
      <h2>Hand</h2>
      <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
        {GameSel.getHand(props.game).map((c: GameCard) => (
          <Card card={c} showPlay clientGameFn />
        ))}
      </div>
      <span>Deck: {GameSel.connectedPlayer(props.game).deck.length}</span>
    </div>
  );
}
