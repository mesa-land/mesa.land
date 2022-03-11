import { v4 } from "../deps.ts";
import { CardState } from "../std/card.ts";
import { Table } from "../std/table.ts";
import { CoinCard } from "../x/alpha/coin.tsx";
import { WinCard } from "../x/alpha/win.tsx";
import { ClickFarmBoost } from "../x/alpha/actions/click-farm-boost.tsx";
import { SeedRound } from "../x/alpha/actions/seed-round.tsx";
import { Player } from "../std/player.ts";

const alphaTableCards: Array<CardState> = [
  CoinCard(1),
  CoinCard(2),
  CoinCard(3),
  WinCard(1),
  WinCard(3),
  WinCard(6),
  ClickFarmBoost,
  SeedRound,
];

const alphaPlayer = new Player("user1", 1, 1, 0);

const alphaTable = new Table("alpha", alphaTableCards, [alphaPlayer], []);

const users = new Map<string, WebSocket>();

export function getTableStateById(id: string) {
  return alphaTable;
}

export function handleSocket(ws: WebSocket) {
  // Register user connection
  const userId = crypto.randomUUID();
  users.set(userId, ws);
  console.log("connected to", userId);

  ws.onopen = (e: Event) => {
    console.log("got open from", userId, e);
    ws.send(`hi, ${userId}`);
  };

  ws.onmessage = (e: Event) => {
    console.log("got message from", userId, e);
  };
}

declare global {
  interface Crypto {
    randomUUID: () => string;
  }
}
