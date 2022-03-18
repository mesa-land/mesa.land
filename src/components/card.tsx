/** @jsxImportSource https://esm.sh/nano-jsx@v0.0.29/lib **/
import { tw } from "../deps.ts";

import { CardState } from "../std/card.ts";

export const Card = (props: { card: CardState; showQuantity?: boolean }) => (
  <div
    class={tw`bg-gray-200 p-2 mb-2 ml-1 mr-1 rounded-lg` +
      " card-c"}
    style="width: 140px;"
  >
    {props.showQuantity && <span>Qty: {props.card.inSupply}</span>}
    <h2>{props.card.title}</h2>
    {/* <img src={props.card.image} /> */}
    <p>{props.card.description}</p>
    <div>
      {props.card.coinValue !== 0 && (
        <span>Worth {props.card.coinValue} coin</span>
      )}
    </div>
    <div>
      {props.card.winValue !== 0 && <span>Worth {props.card.winValue} win
      </span>}
    </div>

    <p>Costs: {props.card.cost}</p>
    <button data-card-title={props.card.title} data-card-event="buy">
      Buy
    </button>
  </div>
);
