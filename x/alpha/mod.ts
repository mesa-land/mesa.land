import { CoinCard } from "./coin.ts";
import { WinCard } from "./win.ts";
import { ClickFarmBoost } from "./actions/click-farm-boost.ts";
import { SeedRound } from "./actions/seed-round.ts";
import { GameCard } from "../../std/GameCard.ts";

const alphaCardList = [
  CoinCard(1),
  CoinCard(2),
  CoinCard(3),
  WinCard(1),
  WinCard(3),
  WinCard(6),
  ClickFarmBoost,
  SeedRound,
];

const alphaMap = alphaCardList.reduce((map, card) => {
  map[card.id] = card;
  return map;
}, {} as { [id: string]: GameCard });

export default alphaMap;
