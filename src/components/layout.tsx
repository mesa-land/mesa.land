/** @jsxImportSource https://esm.sh/nano-jsx@v0.0.29/lib **/
import { tw } from "../deps.ts";
import { Table, TableState } from "./table.tsx";
import { Welcome } from "./welcome.tsx";

export interface State {
  tableState?: TableState
}

export const Layout = (props: State) => (
  <div class={tw`bg-green-50 bg-opacity-50 p-4 rounded-lg border-solid border-2 border-purple-100 border-opacity-50 visited:text-green-600`}>
    <h1>Mesa.land</h1>
    <hr/>
    {!props.tableState && <Welcome/>}
    {props.tableState && <Table {...props.tableState}/>}
  </div>
);
