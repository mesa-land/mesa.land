import { GameCard } from "../../../std/GameCard.ts";

export const ClickFarmBoost: GameCard = {
  id: "cfa",
  title: "Click Farm Boost",
  isAction: true,
  winValue: 0,
  coinValue: 0,
  cost: 3,
  inSupply: 10,
  description: "+2 Actions",
  effects: [
    { GameFn: "gainAction" },
    { GameFn: "gainAction" },
  ],
};
