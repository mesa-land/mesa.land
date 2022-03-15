/** @jsxImportSource https://esm.sh/nano-jsx@v0.0.29/lib **/
import { tw } from "../deps.ts";
import { Card } from "./card.tsx";
import { CardProps } from "../std/card.ts";
import { Table as TableState } from "../std/table.ts";

function filterCards(type: string, cards: Array<CardProps>) {
}

export const Table = (props: { table: TableState }) => {
  console.log("hello from Table", props.table instanceof TableState);
  return (
    <div
      id="table-component"
      class={tw
        `bg-white bg-opacity-50 rounded-lg pt-6 mt-4 p-4 overflow-scroll h-[80vh]`}
    >
      <span>Table ID: {props.table.id}</span>
      <h2>Supply</h2>
      <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
        {props.table.supply.map((c: CardProps) => <Card {...c} />)}
      </div>
      <h2>My hand:</h2>
      <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
        {props.table.player()!.hand.map((c: CardProps) => <Card {...c} />)}
      </div>
    </div>
  );
};
