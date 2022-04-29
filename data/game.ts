import { createGame, GameState } from "../std/GameState.ts";
import alphaGameCards from "../x/alpha/mod.ts";

const games = new Map<string, GameState>();

export function getGameById(id: string) {
  let game = games.get(id);
  if (game) {
    return game;
  }
  game = createGame(id, alphaGameCards, 2);
  games.set(id, game!);
  return game;
}
