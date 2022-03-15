/** @jsxImportSource https://esm.sh/nano-jsx@v0.0.29/lib **/
// import { tw } from "../deps.ts";
import { Table } from "../components/table.tsx";
import { Table as TableState } from "../std/table.ts";

export const TablePage = (props: { table: TableState }) => (
  <div>
    <Table table={props.table} />
  </div>
);
