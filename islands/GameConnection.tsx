/** @jsx h */
import Body from "../components/Body.tsx";
import { Table } from "../components/Table.tsx";
import { h, IS_BROWSER, PageProps, useState } from "../deps.client.ts";
import { GameFn, GameFunction, GameState } from "../std/GameState.ts";
import { logEvent, logGame } from "../utils/log.ts";

declare global {
  interface Window {
    mesa: any;
  }
}

let ws: WebSocket;

if (IS_BROWSER) {
  ws = connect("alpha");
  window.mesa = window.mesa || {};
  window.mesa.ws = ws;
}

function connect(gameId: string) {
  const address = location.host === "mesa.land"
    ? `wss://mesa.land/ws/${gameId}`
    : "ws://" + location.host + `/ws/${gameId}`;
  ws = new WebSocket(address);

  ws.onopen = () => {
    console.log("mesa: ws connected");
  };

  return ws;
}

function onWebSocketMessage(setState: (state: GameState) => void) {
  return (e: MessageEvent) => {
    console.log("ws:", e);
    const event: { game: GameState; playerId: string } = JSON
      .parse(e.data);

    window.mesa.game = event.game;
    if (event.playerId) {
      window.mesa.playerId = event.playerId;
      document.cookie = `mesaPlayer=${event.playerId};path=/`;
    }

    setState(event.game);
  };
}

function createClientGameFn(ws: WebSocket, game: GameState): GameFunction {
  const clientGameFn: Record<string, Function> = {};
  for (const key in GameFn) {
    clientGameFn[key] = (...args: any[]) => {
      const e = {
        GameFn: key as keyof GameFunction,
        // Remove GameState from args
        GameFnArgs: args.slice(1),
      };
      logEvent(game, e);
      ws.send(JSON.stringify(e));
    };
  }
  return clientGameFn as GameFunction;
}

// For server side rendering, GameFunction need not be available
const noop = (() => {}) as unknown as GameFunction;

export default function Connection(
  props: PageProps<GameState>,
) {
  if (!IS_BROWSER) {
    return (
      <Body>
        <Table
          game={props.data}
          playerId={props.data.connectedPlayerId || ""}
          clientGameFn={noop}
        />
      </Body>
    );
  }

  const [game, setState] = useState<GameState>(props.data);
  ws.onmessage = onWebSocketMessage(setState);
  const clientGameFn = createClientGameFn(ws, game);

  console.log("rendering game");
  logGame(game);

  return (
    <Body>
      <Table
        game={game}
        playerId={game.connectedPlayerId || ""}
        clientGameFn={clientGameFn!}
      />
    </Body>
  );
}
