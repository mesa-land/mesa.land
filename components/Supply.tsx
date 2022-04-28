/** @jsx h */

import { h, tw } from "../deps.client.ts";
import Card from "./Card.tsx";
import { GameCard } from "../std/GameCard.ts";
import { GameSel, GameState } from "../std/GameState.ts";

export default function Supply(props: { game: GameState }) {
  return (
    <div id="table-supply">
      <h2 class={tw`mt-0`}>Supply</h2>
      <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
        {GameSel.getCoinsAndWins(props.game).map((c: GameCard) => (
          <Card
            card={c}
            showQuantity
            showBuy
            canBuy={GameSel.playerCanBuy(props.game, c.id)}
          />
        ))}
      </div>
      <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
        {GameSel.getActions(props.game).map((c: GameCard) => (
          <Card
            card={c}
            showQuantity
            showBuy
            canBuy={GameSel.playerCanBuy(props.game, c.id)}
          />
        ))}
      </div>
    </div>
  );
}
