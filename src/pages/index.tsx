/** @jsxImportSource https://esm.sh/nano-jsx@v0.0.29/lib **/
import { tw } from "../deps.ts";

export const Home = () => (
  <div class={tw`p-4 rounded-lg pt-6 mt-4 p-12 text-gray-200`}>
    <h2 class={tw`pt-0`}>Welcome to Mesa!</h2>

    <div class={tw`text-lg`}>
      <p>
        mesa.land is a community-driven, extensible card game that's created by
        gamers, for gamers, like you.
      </p>

      <p>
        The mesa.land engine basic set of rules is simple, but the game
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
