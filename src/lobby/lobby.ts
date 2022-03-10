import { CardState } from "../std/card.ts";
import { Table } from "../std/table.ts";
import { CoinCard } from "../x/alpha/coin.tsx";
import { WinCard } from "../x/alpha/win.tsx";

const alphaTableCards: Array<CardState> = [
  CoinCard(1),
  CoinCard(2),
  CoinCard(3),
  WinCard(1),
  WinCard(3),
  WinCard(6),
];

const alphaTable = new Table("alpha", alphaTableCards);

export function getTableStateById(id: string) {
  return alphaTable;
}
