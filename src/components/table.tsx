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
    <h1>Supply</h1>
    {props.cards.map((c: CardState) => (
      <Card {...c} />
    ))}
    <h1>My hand</h1>
    {props.cards.map((c: CardState) => (
      <Card {...c} />
    ))}
    <h1>My discard</h1>
    {props.cards.map((c: CardState) => (
      <Card {...c} />
    ))}
    <h1>My deck: X</h1>
  </div>
)
