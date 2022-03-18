import { CardState } from "../std/card.ts";
import { Game } from "../std/game.ts";
import { CoinCard } from "../x/alpha/coin.ts";
import { WinCard } from "../x/alpha/win.ts";
import { ClickFarmBoost } from "../x/alpha/actions/click-farm-boost.ts";
import { SeedRound } from "../x/alpha/actions/seed-round.ts";
import { parseMesaEvent } from "../std/events.ts";

const alphaTableCards: Set<CardState> = new Set([
  CoinCard(1),
  CoinCard(2),
  CoinCard(3),
  WinCard(1),
  WinCard(3),
  WinCard(6),
  ClickFarmBoost,
  SeedRound,
]);

const alpha = new Game("alpha", alphaTableCards, 2);

const users = new Map<string, WebSocket>();

export function getTableStateById(id: string) {
  return alpha;
}

interface WSEvent extends Event {
  data?: any;
}

export function handleSocket(ws: WebSocket) {
  // Register user connection
  const userId = crypto.randomUUID();
  users.set(userId, ws);

  // Join game when user connects
  ws.onopen = (e: Event) => {
    console.log("connected to", userId);
    ws.send(`hi, ${userId}`);
    alpha.joinGame(userId);
  };

  ws.onmessage = (e: WSEvent) => {
    console.log("got message from", userId);
    const mesaEvent = parseMesaEvent(e.data);
    alpha.publish(mesaEvent);
  };
}

declare global {
  interface Crypto {
    randomUUID: () => string;
  }
}
