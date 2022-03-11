/** @jsxImportSource https://esm.sh/nano-jsx@v0.0.29/lib **/
import { tw } from "../deps.ts";
import { Table } from "../std/table.ts";
import { TableComponent } from "./mesa.tsx";

export interface State {
  table?: Table;
}

const Home = () => (
  <div class={tw`bg-white bg-opacity-50 p-4 rounded-lg pt-6 mt-4 p-12`}>
    <h2 class={tw`pt-0`}>Welcome to Mesa!</h2>

    <div class={tw`text-lg`}>
      <p>
        Mesa.land is a community-driven, extensible card game that's created by
        gamers, for gamers, like you.
      </p>

      <p>
        The Mesa.land engine basic set of rules is simple, but the game
        possibilities are infinite thanks to user-created cards.
      </p>

      <h3>Start now</h3>
      <p>
        Play online now or create your own cards. Made a great card? Sell it on
        the Market for fun and profit!
      </p>
    </div>

    <div class={tw`w-full flex flex-row justify-center mt-8`}>
      <a href="/m/alpha">
        <button
          class={tw
            `bg-purple-800 border-white border-opacity-50 rounded-lg p-4 text-white font-bold text-2xl `}
        >
          Play Alpha
        </button>
      </a>
    </div>
  </div>
);

export const Layout = (props: State) => (
  <div class={tw`p-4 pb-0`}>
    <div class={tw`text-white flex flex-row align-middle`}>
      <img
        src="/mesa-logo.png"
        style={{ width: "40px", marginRight: "10px", display: "inline" }}
      >
      </img>
      <h1 class={tw`m-0 inline`}>Mesa.land</h1>
    </div>
    <hr />
    {!props.table && <Home />}
    {props.table && <TableComponent {...props.table} />}
  </div>
);
