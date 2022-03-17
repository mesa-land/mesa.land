import { CardState } from "../../../std/card.ts";
import { GameMoves } from "../../../std/events.ts";

export const ClickFarmBoost = new CardState(
  "cfa",
  "Click Farm Boost",
  true,
  0,
  0,
  3,
  "+2 Actions",
  (moves: GameMoves) => {
    return [
      game.gainActions(game.player()!.id, 2),
    ];
  },
);
