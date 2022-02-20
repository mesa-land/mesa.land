/** @jsxImportSource https://esm.sh/nano-jsx@v0.0.29/lib **/
import { tw } from "../deps.ts";

export const Welcome = () => (
  <div class={tw`bg-indigo-50 bg-opacity-50 p-4 rounded-lg`}>
    <h1 class={tw``}>Welcome to Mesa.land!</h1>
    <p>Mesa.land is a community-driven, extensible card game that's created by gamers, for gamers, like you.</p>

    <p>The Mesa.land engine has a simple basic set of rules, but the game possibilities are infinite thanks to user-created cards.</p>

    <p>Play online for free or start creating your own cards.</p>

    <p>Made a great card? Sell it on the Marketplace and...? profit!</p>

    <a href="/t/alpha">  
      <button class={tw`bg-indigo-800 text-white text-bold`}>Play Alpha</button>
    </a>
  </div>
)
