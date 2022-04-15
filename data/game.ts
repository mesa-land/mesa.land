import { Game } from "../std/game.ts";
import alphaGameCards from "../x/alpha/mod.ts";

const games = new Map<string, Game>();

export function getGameById(id: string) {
  let game = games.get(id);
  if (game) {
    return game;
  }
  game = new Game(id, alphaGameCards, 2);
  games.set(id, game);
  return game;
}
