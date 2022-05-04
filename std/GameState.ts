import { CardId, GameCard } from "./GameCard.ts";
import { GamePlayer, PlayerId } from "./GamePlayer.ts";

export enum GameStatus {
  WAITING = "WAITING",
  PLAYING = "PLAYING",
  FINISHED = "FINISHED",
}

export enum PlayerMove {
  PLAY_ACTION = "PLAY_ACTION",
  PLAY_COIN = "PLAY_COIN",
  BUY = "BUY",
  TRASH = "TRASH",
  DISCARD = "DISCARD",
  SKIP = "SKIP",
}

export type GameState = {
  // Game ID
  id: string;
  // The id of the player who is taking their turn
  currentPlayerId?: PlayerId;
  // Moves available to the player who is taking their turn
  currentPlayerMoves: Array<PlayerMove>;
  // The id of the player receiving this state
  connectedPlayerId?: PlayerId;
  // Turn number, starting at 1
  turn: number;
  // An array of cardIds representing shuffle order
  trash: Array<CardId>;
  // An array of cardIds representing shuffle order
  inPlay: Array<CardId>;
  // Nested state of each player
  players: Record<PlayerId, GamePlayer>;
  // Status of the game
  status: GameStatus;
  // TODO: Record of Card URLs, grab code, instantiate dynamically
  supply: Record<CardId, GameCard>;
  // Number of players in this game
  numPlayers: number;
  // Event log
  log: Array<string>;
};
