import { MesaEvent } from "./events.ts";
import { CardId, draw, GameCard, shuffle } from "./GameCard.ts";
import { createPlayer, GamePlayer, PlayerFn, PlayerId } from "./GamePlayer.ts";

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
  END = "END",
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
  log: Array<MesaEvent>;
};

// Game selectors. Filters and selects game state.
export const GameSel = {
  currentPlayer(game: GameState): GamePlayer {
    return game.players[game.currentPlayerId!];
  },
  playerHasActionsInHand(game: GameState): boolean {
    return GameSel.currentPlayer(game).hand.some((h) =>
      game.supply[h].isAction
    );
  },
};

// Game transformations. Apply event to achieve new game state.
export const GameFn: Record<
  string,
  (game: GameState, arg2?: any, arg3?: any) => GameState
> = {
  join(game: GameState, playerId: string) {
    console.log("Join game", playerId);
    if (!game.players[playerId]) {
      game.players[playerId] = createPlayer(playerId);
    }
    game.numPlayers = Object.keys(game.players).length;
    return game;
  },
  // Start game with current players
  start(game: GameState) {
    console.log("Start game");
    if (game.numPlayers === 0) {
      throw new Error("No players have joined.");
    }

    if (game.status !== GameStatus.WAITING) {
      throw new Error(`Game ${game.id} was already started.`);
    }

    // Select first player
    game.currentPlayerId =
      game.players[Math.floor(Math.random() * game.numPlayers)].id;

    // Distribute initial cards
    Object.keys(game.players).forEach((playerId) => {
      game.players[playerId] = PlayerFn.setup(game.players[playerId]);
    });

    game.status = GameStatus.PLAYING;

    game.players[game.currentPlayerId!].actions = 1;
    game.players[game.currentPlayerId!].buys = 1;
    game.currentPlayerMoves = [
      PlayerMove.BUY,
      PlayerMove.END,
    ];

    return game;
  },
  play(game: GameState, cardId: CardId) {
    const player = GameSel.currentPlayer(game);
    game.inPlay.push(cardId);
    player.hand.splice(player.hand.indexOf(cardId), 1);
    const card = game.supply[cardId];
    if (card.isAction) {
      // TODO card.onPlay()
      console.log("Action played", card.title);
      if (!GameSel.playerHasActionsInHand(game)) {
        // End action phase
        game.currentPlayerMoves = [
          PlayerMove.PLAY_COIN,
          PlayerMove.BUY,
          PlayerMove.END,
        ];
      }
    }
    return game;
  },
};
