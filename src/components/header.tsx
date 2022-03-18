/** @jsxImportSource https://esm.sh/nano-jsx@v0.0.29/lib **/
import { tw } from "../deps.ts";

export const Header = () => (
  <>
    <div class={tw`text-white flex flex-row align-middle`}>
      <img
        src="/mesa-logo.png"
        style={{ width: "40px", marginRight: "10px", display: "inline" }}
      >
      </img>
      <h1 class={tw`m-0 inline`}>Mesa.land</h1>
    </div>
    <hr />
  </>
);
