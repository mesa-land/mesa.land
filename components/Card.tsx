/** @jsx h */

import { h, tw } from "../deps.client.ts";
import { CardState } from "../std/card.ts";
import Button from "./Button.tsx";

export default function Card(
  props: {
    card: CardState;
    showQuantity?: boolean;
    showBuy?: boolean;
    showPlay?: boolean;
    canBuy?: boolean;
  },
) {
  return (
    <div
      class={tw
        `relative bg-gray-200 p-3 mb-2 ml-0 mr-1 rounded-lg border-solid border-indigo-700 text-gray-800` +
        " card-c"}
      style="width: 130px;"
    >
      {props.showQuantity && (
        <span
          class={tw
            `absolute border-white border-solid rounded-full bg-red-500 text-sm text-white font-bold p-2`}
          style="width: 17px; top: -5px; right: -5px; text-align: center;"
        >
          {props.card.inSupply}
        </span>
      )}
      <h3 class={tw`mt-0`}>{props.card.title}</h3>
      {/* <img src={props.card.image} /> */}
      <p>{props.card.description}</p>
      <div>
        {props.card.coinValue !== 0 && (
          <span>Worth {props.card.coinValue} coin</span>
        )}
      </div>
      <div>
        {props.card.winValue !== 0 && (
          <span>Worth {props.card.winValue} win</span>
        )}
      </div>
      <br />
      {props.showBuy && (
        <Button
          data-card-id={props.card.id}
          data-event-type="buy"
          disabled={!props.canBuy}
        >
          Buy: ${props.card.cost}
        </Button>
      )}
      {props.showPlay && (props.card.isAction || props.card.coinValue !== 0) &&
        (
          <Button data-card-id={props.card.id} data-event-type="play">
            Play
          </Button>
        )}
    </div>
  );
}