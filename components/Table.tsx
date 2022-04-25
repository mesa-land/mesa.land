/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, tw } from "../deps.client.ts";
import Card from "./Card.tsx";
import { CardState } from "../std/card.ts";
import { Game, GameStatus } from "../std/game.ts";
import Button from "./Button.tsx";

const NameField = (
  props: { game: Game; playerId: string; editable?: boolean },
) => {
  const isEditing = props.game.player(props.playerId).name === "";
  return (
    <div>
      {props.editable
        ? (
          isEditing
            ? (
              <div>
                <input
                  type="text"
                  id="mesa-name"
                  placeholder="Choose your name..."
                  value={props.game.player(props.playerId).name}
                  class={tw`m-2 p-1 text-lg rounded-md shadow-md`}
                />
                <Button data-event-type="rename">Rename</Button>
              </div>
            )
            : (
              <div>
                {props.game.player(props.playerId).name}
                <Button>Edit</Button>
              </div>
            )
        )
        : (
          <span>
            {props.game.player(props.playerId).name ||
              props.game.player(props.playerId).id}
          </span>
        )}
    </div>
  );
};

const Hall = (props: { game: Game; playerId: string }) => (
  <div id="waiting-hall">
    <span>Players in this mesa:</span>
    <ul class={tw`my-4`} style="padding-inline-start: 1em;">
      {props.game.players.map((p) => (
        <li>
          {p.id === props.playerId
            ? <NameField game={props.game} playerId={p.id} editable />
            : <NameField game={props.game} playerId={p.id} />}
        </li>
      ))}
    </ul>
    <Button data-event-type="start">Start mesa</Button>
  </div>
);

const Supply = (props: { game: Game }) => (
  <div id="table-supply">
    <h2 class={tw`mt-0`}>Supply</h2>
    <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
      {props.game.getCoinsAndWins().map((c: CardState) => (
        <Card
          card={c}
          showQuantity
          showBuy
          canBuy={props.game.playerCanBuy(c.id)}
        />
      ))}
    </div>
    <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
      {props.game.getActions().map((c: CardState) => (
        <Card
          card={c}
          showQuantity
          showBuy
          canBuy={props.game.playerCanBuy(c.id)}
        />
      ))}
    </div>
  </div>
);

const Player = (props: { game: Game }) => (
  <div id="player-table">
    <h2>In play</h2>
    <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
      {props.game.getInPlay().map((c: CardState) => (
        <Card
          card={c}
        />
      ))}
    </div>
    <h2>Discard</h2>
    <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
      {props.game.getDiscard().map((c: CardState) => (
        <Card
          card={c}
        />
      ))}
    </div>
    <h2>Hand</h2>
    <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
      {props.game.getHand().map((c: CardState) => <Card card={c} showPlay />)}
    </div>
    <span>Deck: {props.game.player().deck.length}</span>
  </div>
);

const GameTable = (props: { game: Game }) => (
  <>
    <Supply game={props.game} />
    <Player game={props.game} />
  </>
);

const Results = () => <span>You win</span>;

export const Table = (props: { game: Game; playerId: string }) => {
  console.log(props.game.players);
  return (
    <div
      id="table-component"
      class={tw
        `flex-row my-6 rounded-lg text-white border-solid border-1 border-gray-400`}
    >
      <div
        class={tw
          `border-solid border-b border-x-0 border-t-0 border-gray-400 text-gray-400 p-2`}
      >
        <span>
          mesa:{" "}
          <a
            class={tw`underline text-purple-500`}
            href={"/m/" + props.game.id}
          >
            {props.game.id}
          </a>
          {props.game.status === GameStatus.WAITING && (
            <span class={tw`ml-2`}>({props.game.status})</span>
          )}
        </span>
        {props.game.status === GameStatus.PLAYING &&
          (
            <span class={tw`ml-2`}>
              phase:{" "}
              <strong class={tw`uppercase text-purple-500`}>
                {props.game.phase}
              </strong>
            </span>
          )}
        {props.game.currentPlayerId && (
          <span class={tw`ml-2`}>
            actions: {props.game.player().actions} buys:{" "}
            {props.game.player().buys} coins: {props.game.playerCoins()}
          </span>
        )}
      </div>
      <div
        class={tw`p-6 b1 `}
      >
        {props.game.status === GameStatus.WAITING
          ? <Hall game={props.game} playerId={props.playerId} />
          : props.game.status === GameStatus.PLAYING
          ? <GameTable game={props.game} />
          : <Results />}
      </div>
    </div>
  );
};
