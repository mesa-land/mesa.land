import { CardState } from "../../../std/card.ts";
import { GameMoves, TargetPlayer } from "../../../std/events.ts";

export const SeedRound = new CardState(
  "sr",
  "Seed Round",
  true,
  0,
  0,
  4,
  10,
  "+2 Cards, +1 Action",
  (moves: GameMoves) => {
    return [
      moves.drawCards(TargetPlayer.CURRENT, 2),
      moves.gainActions(TargetPlayer.CURRENT, 1),
    ];
  },
);
