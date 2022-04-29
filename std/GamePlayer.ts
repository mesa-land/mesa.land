import { CardId, draw, shuffle, sortHand } from "./GameCard.ts";

export type PlayerId = string;

export type GamePlayer = {
  id: PlayerId;
  actions: number;
  buys: number;
  coins: number;
  wins: number;
  // An array of cardIds representing shuffle order
  deck: Array<CardId>;
  // An array of cardIds representing shuffle order
  discard: Array<CardId>;
  // An array of cardIds representing shuffle order
  hand: Array<CardId>;
  // User-chosen name for this game
  name: string;
};

export const createPlayer = (playerId: PlayerId): GamePlayer => ({
  id: playerId,
  actions: 0,
  buys: 0,
  coins: 0,
  wins: 0,
  deck: [],
  discard: [],
  hand: [],
  name: "",
});
