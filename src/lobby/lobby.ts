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

const alphaPlayer = new Player("user1", 1);

const alphaTable = new Table("alpha", alphaTableCards, [alphaPlayer], []);

export function getTableStateById(id: string) {
  return alphaTable;
}
