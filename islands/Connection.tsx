/** @jsx h */
import Body from "../components/Body.tsx";
import { h, IS_BROWSER, PageProps, useState } from "../deps.client.ts";
import { MesaEvent } from "../std/events.ts";
import { Game } from "../std/game.ts";
import GameIsland from "./GameIsland.tsx";

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

function onWebSocketMessage(setState: (state: Game) => void) {
  return (e: MessageEvent) => {
    console.log("ws:", e);
    const event: { game: Game; css: Array<string>; playerId: string } = JSON
      .parse(e.data);

    if (event.playerId) {
      window.mesa.playerId = event.playerId;
      document.cookie = `mesaPlayer=${event.playerId};path=/`;
    }

    setState(event.game);
  };
}

function publishEvent(e: MesaEvent) {
  if (e.type) {
    console.log("publish:", e);

    ws.send(
      JSON.stringify(e),
    );
  }
}

export default function Connection(
  props: PageProps<Game>,
) {
  if (!IS_BROWSER) {
    return (
      <Body>
        <GameIsland game={props.data} />
      </Body>
    );
  }

  const [game, setState] = useState<Game>(props.data);
  ws.onmessage = onWebSocketMessage(setState);

  return (
    <Body>
      <GameIsland game={game} publishEvent={publishEvent} />
    </Body>
  );
}
