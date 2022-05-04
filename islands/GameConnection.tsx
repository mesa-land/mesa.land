/** @jsx h */
import Body from "../components/Body.tsx";
import { Table } from "../components/Table.tsx";
import { h, IS_BROWSER, PageProps, useState } from "../deps.client.ts";
import {
  clientGameFunctions,
  createGameSel,
  GameFunction,
  GameState,
} from "../std/Game.ts";
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
  const address = location.protocol === "https:"
    ? `wss://${location.host}/ws/${gameId}`
    : `ws://${location.host}/ws/${gameId}`;
  ws = new WebSocket(address);

  ws.onopen = () => {
    console.log("mesa: ws connected");
  };

  return ws;
}

function onWebSocketMessage(setState: (state: GameState) => void) {
  return (e: MessageEvent) => {
    const event: { game: GameState; playerId: string } = JSON
      .parse(e.data);

    window.mesa.game = event.game;
    if (event.playerId) {
      window.mesa.playerId = event.game.connectedPlayerId;
      document.cookie = `mesaPlayer=${event.playerId};path=/`;
    }
    logGame(event.game);
    setState(event.game);
  };
}

function createClientGameFn(
  ws: WebSocket,
  game: GameState,
) {
  const fn: GameFunction = {} as any;
  clientGameFunctions.forEach((key: string) => {
    console.log(key);
    fn[key as keyof GameFunction] = (...args: any[]): GameState => {
      const e = {
        GameFn: key as keyof GameFunction,
        GameFnArgs: args,
      };
      logEvent(game, e);
      ws.send(JSON.stringify(e));
      return game;
    };
  });
  return fn;
}

export default function Connection(
  props: PageProps<GameState>,
) {
  if (!IS_BROWSER) {
    return (
      <Body>
        <Table
          game={{
            state: props.data,
            fn: null as any, // Never used in server
            sel: createGameSel(props.data),
          }}
        />
      </Body>
    );
  }

  const [game, setState] = useState<GameState>(props.data);
  ws.onmessage = onWebSocketMessage(setState);
  const fn = createClientGameFn(ws, game);
  const sel = createGameSel(game);

  return (
    <Body>
      <Table
        game={{
          state: game,
          fn,
          sel,
        }}
      />
    </Body>
  );
}
