/** @jsxImportSource https://esm.sh/nano-jsx@v0.0.29/lib **/
import { tw } from "../deps.ts";
import { Table, TableState } from "./table.tsx";
import { Welcome } from "./welcome.tsx";

export interface State {
  tableState?: TableState
}

export const Layout = (props: State) => (
  <div class={tw`p-4 pb-0`}>
    <div class={tw`text-white flex flex-row align-middle`}>
      <img src="/mesa-logo.png" style={{width: "40px", marginRight: "10px", display: "inline"}}></img>
      <h1 class={tw`m-0 inline`}>Mesa.land</h1>
    </div>
    <hr/>
    {!props.tableState && <Welcome/>}
    {props.tableState && <Table {...props.tableState}/>}
  </div>
);
