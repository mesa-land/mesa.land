import { CoinCard } from "./coin.ts";
import { WinCard } from "./win.ts";
import { ClickFarmBoost } from "./actions/click-farm-boost.ts";
import { SeedRound } from "./actions/seed-round.ts";

export default new Set([
  CoinCard(1),
  CoinCard(2),
  CoinCard(3),
  WinCard(1),
  WinCard(3),
  WinCard(6),
  ClickFarmBoost,
  SeedRound,
]);
