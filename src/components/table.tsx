/** @jsxImportSource https://esm.sh/nano-jsx@v0.0.29/lib **/
import { tw } from "../deps.ts";
import { Card, CardState } from "./card.tsx";

export type TableState = {
  tableId: string
  cards: CardState[]
}

export const Table = (props: TableState) => (
  <div class={tw`bg-green-50`}>
    <span>Table ID: {props.tableId}</span>
    {props.cards.map((c: CardState) => (
      <Card {...c} />
    ))}
  </div>
)
