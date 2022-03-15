import { CardProps } from "../std/card.ts";
import { Table } from "../std/table.ts";
import { CoinCard } from "../x/alpha/coin.ts";
import { WinCard } from "../x/alpha/win.ts";
import { ClickFarmBoost } from "../x/alpha/actions/click-farm-boost.ts";
import { SeedRound } from "../x/alpha/actions/seed-round.ts";
import { Player } from "../std/player.ts";

const alphaTableCards: Array<CardProps> = [
  CoinCard(1),
  CoinCard(2),
  CoinCard(3),
  WinCard(1),
  WinCard(3),
  WinCard(6),
  ClickFarmBoost,
  SeedRound,
];

const alphaPlayer = new Player("user1", 1, 1, 0, [], [], []);

const alphaTable = new Table("alpha", alphaTableCards, [alphaPlayer], []);
alphaTable.setup();

const users = new Map<string, WebSocket>();

export function getTableStateById(id: string) {
  return alphaTable;
}

interface WSEvent extends Event {
  data?: any;
}

export function handleSocket(ws: WebSocket) {
  // Register user connection
  const userId = crypto.randomUUID();
  users.set(userId, ws);

  ws.onopen = (e: Event) => {
    console.log("connected to", userId);
    ws.send(`hi, ${userId}`);
  };

  ws.onmessage = (e: WSEvent) => {
    console.log("got message from", userId, e.data);
  };
}

declare global {
  interface Crypto {
    randomUUID: () => string;
  }
}
