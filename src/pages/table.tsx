/** @jsxImportSource https://esm.sh/nano-jsx@v0.0.29/lib **/
// import { tw } from "../deps.ts";
import { Table } from "../components/table.tsx";
import { Game } from "../std/game.ts";

export const TablePage = (props: { game: Game }) => (
  <div>
    <Table game={props.game} />
  </div>
);
