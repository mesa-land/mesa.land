import { CardState } from "../../../std/card.ts";
import { GameMoves, TargetPlayer } from "../../../std/events.ts";

export const ClickFarmBoost = new CardState(
  "cfa",
  "Click Farm Boost",
  true,
  0,
  0,
  3,
  10,
  "+2 Actions",
  (moves: GameMoves) => {
    return [
      moves.gainActions(TargetPlayer.CURRENT, 2),
    ];
  },
);
