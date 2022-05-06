/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, tw } from "../deps.client.ts";
import Card from "./Card.tsx";
import { GameCard } from "../std/GameCard.ts";
import { Game } from "../std/Game.ts";
import CardContainer from "./CardContainer.tsx";

export default function Supply(props: { game: Game }) {
  return (
    <div id="table-supply">
      <CardContainer title="Supply">
        <>
          <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
            {props.game.sel.getCoinsAndWins().map((c: GameCard) => (
              <Card
                card={c}
                showQuantity
                showBuy
                canBuy={props.game.sel.playerCanBuy(c.id)}
                game={props.game}
              />
            ))}
          </div>
          <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
            {props.game.sel.getActions().map((c: GameCard) => (
              <Card
                card={c}
                showQuantity
                showBuy
                canBuy={props.game.sel.playerCanBuy(c.id)}
                game={props.game}
              />
            ))}
          </div>
        </>
      </CardContainer>

      <CardContainer title="In Play">
        <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
          {props.game.sel.getInPlay().map((c: GameCard) => (
            <Card card={c} game={props.game} />
          ))}
        </div>
      </CardContainer>
    </div>
  );
}
