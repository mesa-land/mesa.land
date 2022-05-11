import { ClickFarmBoost } from "./click-farm-boost.ts";
import { SeedRound } from "./seed-round.ts";
import { CoinCard, FailCard, GameCard, WinCard } from "../../std/GameCard.ts";

const alphaCardList = [
  CoinCard(1),
  CoinCard(2),
  CoinCard(3),
  WinCard(1),
  WinCard(3),
  WinCard(6),
  FailCard,
  ClickFarmBoost,
  SeedRound,
];

const alphaMap = alphaCardList.reduce((map, card) => {
  map[card.id] = card;
  return map;
}, {} as { [id: string]: GameCard });

export default alphaMap;
