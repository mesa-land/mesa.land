import { Fae } from "../deps.client.ts";
import { GameEvent, GameState } from "../std/GameState.ts";

export function logGame(game: GameState): void {
  console.log("<<<", game.id);
  console.log(
    Fae.assoc("supply", "[...supply]", game),
  );
}

export function logEvent(game: GameState, event: GameEvent): void {
  console.log(">>>", game.id, "/", game.connectedPlayerId);
  console.log(event);
}
