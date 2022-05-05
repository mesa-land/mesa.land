/** @jsx h */

import { h, tw } from "../deps.client.ts";
import Card from "./Card.tsx";
import { GameCard } from "../std/GameCard.ts";
import { Game } from "../std/Game.ts";
import CardContainer from "./CardContainer.tsx";

export default function Player(props: { game: Game }) {
  return (
    <div id="player-table">
      <CardContainer title="In Play">
        <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
          {props.game.sel.getInPlay().map((c: GameCard) => (
            <Card card={c} game={props.game} />
          ))}
        </div>
      </CardContainer>
      <CardContainer title="Hand">
        <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
          {props.game.sel.getHand().map((c: GameCard) => (
            <Card
              card={c}
              showPlay={props.game.sel.playerCanPlay(c.id)}
              game={props.game}
            />
          ))}
        </div>
      </CardContainer>
      <CardContainer title="Discard">
        <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
          {props.game.sel.getDiscard().map((c: GameCard) => (
            <Card card={c} game={props.game} />
          ))}
        </div>
      </CardContainer>
      <span>Deck: {props.game.sel.connectedPlayer().deck.length}</span>
    </div>
  );
}
