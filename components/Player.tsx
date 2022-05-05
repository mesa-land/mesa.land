/** @jsx h */

import { h, tw } from "../deps.client.ts";
import Card from "./Card.tsx";
import { GameCard } from "../std/GameCard.ts";
import { Game } from "../std/Game.ts";
import CardContainer from "./CardContainer.tsx";

export default function Player(props: { game: Game }) {
  const deck = props.game.sel.connectedPlayer().deck;
  const hand = props.game.sel.getHand();
  const discard = props.game.sel.getDiscard();
  return (
    <div id="player-table">
      <CardContainer title="In Play">
        <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
          {props.game.sel.getInPlay().map((c: GameCard) => (
            <Card card={c} game={props.game} />
          ))}
        </div>
      </CardContainer>
      <div class={tw`flex flex-row justify-between`}>
        <CardContainer title="Hand">
          <div class={tw`flex flex-row`}>
            {hand.map((c: GameCard) => (
              <Card
                card={c}
                showPlay={props.game.sel.playerCanPlay(c.id)}
                game={props.game}
              />
            ))}
          </div>
        </CardContainer>
        <div class={tw`flex flex-row justify-end`}>
          <CardContainer title={`Deck (${deck.length})`}>
            <div class={tw`relative`}>
              {deck.map((_, index: number) => (
                <div class={tw`absolute`} style={`top: ${index * 3}px`}>
                  <Card>
                    <span>{deck.length} cards</span>
                  </Card>
                </div>
              ))}
            </div>
          </CardContainer>
          <CardContainer title={`Discard (${discard.length})`}>
            <div class={tw`relative`}>
              {discard.map((c: GameCard, index: number) => (
                <div class={tw`absolute`} style={`top: ${index * 3}px`}>
                  <Card card={c} game={props.game} />
                </div>
              ))}
            </div>
          </CardContainer>
        </div>
      </div>
    </div>
  );
}
