/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, Head, tw } from "../deps.client.ts";
import NavigationBar from "../components/NavigationBar.tsx";
import Body from "../components/Body.tsx";
import Footer from "../components/Footer.tsx";

const Hero = () => (
  <div className="hero">
    <h1>Turn your NFT collections into amazing web card games.</h1>
    <p>
      Mesa is an online card game where your NFTs are the action cards.
    </p>
  </div>
);

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Mesa - play with your NFTs.
        </title>
        <meta
          name="description"
          content="The card game you play with your own NFTs."
        />
      </Head>
      <Body>
        <div class={tw`text-center text-black p-2 bg-slate-200`}>
          <p>
            Welcome to Mesa. Join our{"  "}
            <a
              href="https://discord.gg/7efW797Kfu"
              class={tw`underline cursor-pointer`}
            >
              Mesa discord server
            </a>{" "}
            to win the early-bird WAGMesa NFT pack.
          </p>
        </div>
        <NavigationBar active="/" />
        <div class={tw`p-4 rounded-lg pt-6 mt-4 p-12 text-gray-200`}>
          <Hero />
          <div class={tw`text-lg`}>
            <p>
              Mesa is a community-driven, extensible card game that's created by
              gamers, for gamers.
            </p>

            <p>
              Mesa is easy to learn, but the game possibilities are infinite
              thanks to user-generated cards.
            </p>

            <h3 class={tw`text-5xl py-5`}>Start now</h3>
            <p>
              Play online now or create your own cards. Made a great card? Sell
              it on the Market for fun and profit!
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
        <Footer />
      </Body>
    </>
  );
}
