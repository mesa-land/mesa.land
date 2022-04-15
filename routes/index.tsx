/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, Head, tw } from "../deps.client.ts";
import NavigationBar from "../components/NavigationBar.tsx";
import Footer from "../components/Footer.tsx";

const Body = (props: { children: any }) => (
  <div
    class={tw
      `antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900`}
  >
    {props.children}
  </div>
);

const Hero = () => (
  <div className="hero">
    <h1>Turn your NFT collections into amazing web card games.</h1>
    <p>
      Mesa is an online card game where your NFTs are the action cards.
    </p>
  </div>
);

const Section = (props: { children: any }) => (
  <section className="section">
    {props.children}
  </section>
);

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Mesa - turn any NFT collection into a card game with one click.
        </title>
        <meta
          name="description"
          content="Play infinite games for free. Turn any NFT collection into a card game with one click."
        />
      </Head>
      <Body>
        <p>
          Welcome to Mesa. Join our{"  "}
          <a href="https://discord.gg/7efW797Kfu">Mesa discord server</a>{" "}
          to win the early-bird WAGMesa NFT pack.
        </p>
        <NavigationBar active="/" />
        <Hero />
        <Section>
          <h2>Infinite games</h2>
          <p>Every Mesa game is unique.</p>
        </Section>

        <Section>
          <h2>Infinite games</h2>
          <p>Every Mesa game is unique.</p>
        </Section>
        <Footer />
      </Body>
    </>
  );
}
