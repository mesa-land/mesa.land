import { CardId, draw, shuffle } from "./GameCard.ts";

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

export const PlayerFn: Record<string, (player: GamePlayer) => GamePlayer> = {
  setup(p: GamePlayer) {
    // 3 wins, 7 coins
    p.deck = shuffle([
      "1w",
      "1w",
      "1w",
      "1c",
      "1c",
      "1c",
      "1c",
      "1c",
      "1c",
      "1c",
    ]);
    return PlayerFn.newTurn(p);
  },
  newTurn(p: GamePlayer) {
    p.hand = draw(5, p.deck);
    p.actions = 1;
    p.buys = 1;
    return p;
  },
};
