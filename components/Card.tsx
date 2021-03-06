/** @jsx h */

import { h, tw } from "../deps.client.ts";
import { GameCard } from "../std/GameCard.ts";
import { Game } from "../std/Game.ts";
import Button from "./Button.tsx";

const Container = (props: { children: any }) => (
  <div
    class={tw
      `relative bg-gray-400 p-3 mb-2 ml-0 mr-1 rounded-lg border-solid border-1 border-indigo-700 text-blue-400 flex flex-col justify-between`}
    style="width: 125px; height: 150px;"
  >
    {props.children}
  </div>
);

export default function Card(
  props: {
    card?: GameCard;
    showQuantity?: boolean;
    showBuy?: boolean;
    showPlay?: boolean;
    canBuy?: boolean;
    game?: Game;
    children?: any;
  },
) {
  if (props.children) {
    return <Container>{props.children}</Container>;
  }

  return (
    <Container>
      {props.showQuantity && (
        <span
          class={tw
            `absolute border-white border-solid rounded-full bg-red-500 text-sm text-white font-bold p-2`}
          style="top: -5px; right: -5px; text-align: center;"
        >
          {props.card!!.inSupply}
        </span>
      )}
      <h3 class={tw`mt-0`}>{props.card!!.title}</h3>
      {/* <img src={props.card!.image} /> */}
      <p>{props.card!!.description}</p>

      <div class={tw`mh-100`}>
        {props.showBuy && (
          <Button
            data-card-id={props.card!.id}
            disabled={!props.canBuy}
            onClick={() => props.game!.fn.buy(props.card!.id)}
          >
            Buy: ${props.card!.cost}
          </Button>
        )}
        {props.showPlay &&
          (props.card!.isAction || props.card!.coinValue !== 0) &&
          (
            <Button
              data-card-id={props.card!.id}
              onClick={() => props.game!.fn.play(props.card!.id)}
            >
              Play
            </Button>
          )}
      </div>
    </Container>
  );
}
