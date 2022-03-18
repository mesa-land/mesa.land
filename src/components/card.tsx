/** @jsxImportSource https://esm.sh/nano-jsx@v0.0.29/lib **/
import { tw } from "../deps.ts";

import { CardState } from "../std/card.ts";

export const Card = (props: CardState) => (
  <div
    class={tw`bg-gray-200 p-2 mb-2 ml-1 mr-1 rounded-lg` +
      " card-c"}
    style="width: 140px;"
  >
    <span>Qty: {props.inSupply}</span>
    <h2>{props.title}</h2>
    {/* <img src={props.image} /> */}
    <p>{props.description}</p>
    <div>
      {props.coinValue !== 0 && <span>Worth {props.coinValue} coin</span>}
    </div>
    <div>
      {props.winValue !== 0 && <span>Worth {props.winValue} win</span>}
    </div>

    <p>Costs: {props.cost}</p>
    <button data-card-title={props.title} data-card-event="buy">Buy</button>
  </div>
);
