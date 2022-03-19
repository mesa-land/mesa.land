/** @jsxImportSource https://esm.sh/nano-jsx@v0.0.29/lib **/
import { tw } from "../deps.ts";

export const Header = () => (
  <a href="/" class={tw`no-underline text-white inline`}>
    <div class={tw`text-white flex flex-row align-middle`}>
      <img
        src="/mesa-logo.png"
        style={{ width: "40px", marginRight: "10px", display: "inline" }}
        class={tw`border-1 border-solid border-white rounded-md`}
      >
      </img>
      <h1 class={tw`m-0 ml-2 inline`}>mesa.land</h1>
    </div>
  </a>
);
