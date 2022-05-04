import { CardId, GameCard } from "./GameCard.ts";
import { GameFunction } from "./GameFunction.ts";
import { GameSelector } from "./GameSelector.ts";
import { GameState, GameStatus } from "./GameState.ts";

export const createGame = (
  id: string,
  supply: Record<CardId, GameCard>,
  numPlayers: number,
): GameState => ({
  id,
  supply,
  turn: 1,
  trash: [],
  inPlay: [],
  players: {},
  status: GameStatus.WAITING,
  numPlayers,
  log: [],
  currentPlayerMoves: [],
});

export type GameEvent = {
  GameFn: keyof GameFunction;
  GameFnArgs: any[];
};

export type Game = {
  state: GameState;
  fn: GameFunction;
  sel: GameSelector;
};

export * from "./GameFunction.ts";
export * from "./GameSelector.ts";
export * from "./GameState.ts";
