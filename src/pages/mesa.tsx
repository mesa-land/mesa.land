/** @jsxImportSource https://esm.sh/nano-jsx@v0.0.29/lib **/
import { tw } from "../deps.ts";
import { Card } from "../components/game/card.tsx";
import { CardState } from "../std/card.ts";
import { TableProps } from "../std/table.ts";

export const TableComponent = (table: TableProps) => (
  <div
    class={tw
      `bg-white bg-opacity-50 rounded-lg pt-6 mt-4 p-4 overflow-scroll h-[80vh]`}
  >
    <span>Table ID: {table.id}</span>
    <h2>Supply</h2>
    <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
      {table.cards.map((c: CardState) => <Card {...c} />)}
    </div>
    <h2>My deck: 5 cards</h2>
  </div>
);
