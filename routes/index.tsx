/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, Head, tw } from "../deps.client.ts";
import NavigationBar from "../components/NavigationBar.tsx";
import Body from "../components/Body.tsx";
import Footer from "../components/Footer.tsx";
import Button from "../components/Button.tsx";

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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#212121" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="theme-color" content="#212121"></meta>
      </Head>
      <Body>
        <div class={tw`text-center p-2 bg-gray-400`}>
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
          <div
            class={tw`container w-full md:max-w-3xl mx-auto`}
          >
            <div class={tw`text-lg md:max-w-xl`}>
              <h3 class={tw`text-5xl py-5`}>
                The card game you play<br></br>
                <span class={tw`text-8xl`}>
                  with <em>your</em> NFTs!
                </span>
              </h3>
              <p>
                Connect your apes, zombies or whatever else floats your boat.
              </p>
              <p>
                Mesa is an online card game where your NFTs are the action
                cards.
              </p>
              <p>
                Mesa is a fun, fast, and easy way to play with your NFTs.
              </p>
            </div>

            <div class={tw`w-full flex flex-row justify-center mt-8`}>
              <a href="/m/alpha">
                <Button>
                  Play Alpha
                </Button>
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </Body>
    </>
  );
}
