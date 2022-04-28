/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, tw } from "../deps.client.ts";
import Card from "./Card.tsx";
import { GameCard } from "../std/GameCard.ts";
import { GameSel, GameState, GameStatus } from "../std/GameState.ts";
import Button from "./Button.tsx";

const NameField = (
  props: { game: GameState; playerId: string; editable?: boolean },
) => {
  const isEditing = GameSel.connectedPlayer(props.game).name === "";
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
                  value={GameSel.connectedPlayer(props.game).name}
                  class={tw`m-2 p-1 text-lg rounded-md shadow-md`}
                />
                <Button data-event-type="rename">Rename</Button>
              </div>
            )
            : (
              <div>
                {GameSel.connectedPlayer(props.game).name}
                <Button>Edit</Button>
              </div>
            )
        )
        : (
          <span>
            {props.game.players[props.playerId].name ||
              props.game.players[props.playerId].id}
          </span>
        )}
    </div>
  );
};

const Hall = (props: { game: GameState; playerId: string }) => (
  <div id="waiting-hall">
    <span>Players in this mesa:</span>
    <ul class={tw`my-4`} style="padding-inline-start: 1em;">
      {Object.keys(props.game.players).map((pId) => (
        <li>
          {pId === props.playerId
            ? <NameField game={props.game} playerId={pId} editable />
            : <NameField game={props.game} playerId={pId} />}
        </li>
      ))}
    </ul>
    <Button data-event-type="start">Start mesa</Button>
  </div>
);

const Supply = (props: { game: GameState }) => (
  <div id="table-supply">
    <h2 class={tw`mt-0`}>Supply</h2>
    <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
      {GameSel.getCoinsAndWins(props.game).map((c: GameCard) => (
        <Card
          card={c}
          showQuantity
          showBuy
          canBuy={GameSel.playerCanBuy(props.game, c.id)}
        />
      ))}
    </div>
    <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
      {GameSel.getActions(props.game).map((c: GameCard) => (
        <Card
          card={c}
          showQuantity
          showBuy
          canBuy={GameSel.playerCanBuy(props.game, c.id)}
        />
      ))}
    </div>
  </div>
);

const Player = (props: { game: GameState }) => (
  <div id="player-table">
    <h2>In play</h2>
    <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
      {GameSel.getInPlay(props.game).map((c: GameCard) => (
        <Card
          card={c}
        />
      ))}
    </div>
    <h2>Discard</h2>
    <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
      {GameSel.getDiscard(props.game).map((c: GameCard) => (
        <Card
          card={c}
        />
      ))}
    </div>
    <h2>Hand</h2>
    <div class={tw`flex flex-row flex-wrap justify-items-stretch`}>
      {GameSel.getHand(props.game).map((c: GameCard) => (
        <Card card={c} showPlay />
      ))}
    </div>
    <span>Deck: {GameSel.connectedPlayer(props.game).deck.length}</span>
  </div>
);

const GameTable = (props: { game: GameState }) => (
  <>
    <Supply game={props.game} />
    <Player game={props.game} />
  </>
);

const Results = () => <span>You win</span>;

export const Table = (props: { game: GameState; playerId: string }) => {
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
              you may:{" "}
              <strong class={tw`uppercase text-purple-500`}>
                {props.game.currentPlayerMoves.join(", ")}
              </strong>
            </span>
          )}
        {props.game.currentPlayerId && (
          <span class={tw`ml-2`}>
            actions: {GameSel.currentPlayer(props.game).actions} buys:{" "}
            {GameSel.currentPlayer(props.game).buys} coins:{" "}
            {GameSel.playerCoins(props.game)}
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
