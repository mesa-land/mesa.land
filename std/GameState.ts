import { CardId, draw, GameCard, shuffle } from "./GameCard.ts";
import { createPlayer, GamePlayer, PlayerId } from "./GamePlayer.ts";

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

// Game selectors. Filters and selects game state.
export const GameSel = {
  currentPlayer(game: GameState): GamePlayer {
    return game.players[game.currentPlayerId!];
  },
  connectedPlayer(game: GameState): GamePlayer {
    return game.players[game.connectedPlayerId!];
  },
  playerHasActionsInHand(game: GameState): boolean {
    return GameSel.currentPlayer(game).hand.some((h) =>
      game.supply[h].isAction
    );
  },
  playerCanBuy(game: GameState, cardId: string): boolean {
    const card = game.supply[cardId];
    const player = GameSel.currentPlayer(game);
    const cost = card.cost;
    const coins = GameSel.playerCoins(game);
    return player.buys > 0 && cost <= coins;
  },
  nextPlayerId(game: GameState): string {
    // This is absolutely not safe. And yet...
    const playerIds = Object.keys(game.players);
    if (game.currentPlayerId === undefined) {
      return playerIds[0];
    }
    const i = playerIds.findIndex((pId) => pId === game.currentPlayerId);
    return playerIds[(i + 1) % playerIds.length];
  },
  getCoinsAndWins(game: GameState): Array<GameCard> {
    const coins: Array<GameCard> = [];
    const wins: Array<GameCard> = [];

    Object.keys(game.supply).forEach((cId) => {
      const c = game.supply[cId];
      if (c.coinValue > 0 && !c.isAction) {
        coins.push(c);
      }
      if (c.winValue > 0 && !c.isAction) {
        wins.push(c);
      }
    });

    return coins.concat(wins);
  },
  getActions(game: GameState): Array<GameCard> {
    const actions: Array<GameCard> = [];

    Object.keys(game.supply).forEach((cId) => {
      const c = game.supply[cId];
      if (c.isAction) {
        actions.push(c);
      }
    });

    return actions;
  },
  getInPlay(game: GameState): Array<GameCard> {
    const inPlay: Array<GameCard> = [];

    game.inPlay.forEach((c) => {
      inPlay.push(game.supply[c]);
    });

    return inPlay;
  },
  getDiscard(game: GameState): Array<GameCard> {
    const discard: Array<GameCard> = [];

    GameSel.currentPlayer(game).discard.forEach((c) => {
      discard.push(game.supply[c]);
    });

    return discard;
  },
  getHand(game: GameState): Array<GameCard> {
    const hand: Array<GameCard> = [];

    GameSel.currentPlayer(game).hand.forEach((c) => {
      hand.push(game.supply[c]);
    });

    return hand;
  },
  playerWins(game: GameState) {
    // TODO: count hand and discard
    return GameSel.currentPlayer(game).deck.reduce(
      (acc, val) => (acc + game.supply[val].winValue),
      0,
    );
  },
  playerCoins(game: GameState) {
    return game.inPlay.reduce(
      (acc, val) => (acc + game.supply[val].coinValue),
      0,
    );
  },
};

// Game transformations. Apply event to achieve new game state.
export const GameFn = {
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
      GameFn.setupPlayer(game, playerId);
    });

    // Set status to PLAYING
    game.status = GameStatus.PLAYING;

    game.currentPlayerMoves = [
      PlayerMove.BUY,
      PlayerMove.SKIP,
    ];

    return GameFn.newTurn(game);
  },
  play(game: GameState, cardId: CardId) {
    const player = GameSel.currentPlayer(game);
    console.log("Play card", cardId);
    game.inPlay.push(cardId);
    player.hand.splice(player.hand.indexOf(cardId), 1);
    const card = game.supply[cardId];
    if (card.isAction) {
      if (!game.currentPlayerMoves.includes(PlayerMove.PLAY_ACTION)) {
        throw new Error("Player may not play actions now.");
      }
      // TODO card.onPlay()
      console.log("Action played", card.title);
      if (!GameSel.playerHasActionsInHand(game)) {
        // End action phase
        game.currentPlayerMoves = [
          PlayerMove.PLAY_COIN,
          PlayerMove.BUY,
          PlayerMove.SKIP,
        ];
      }
    }
    if (card.coinValue > 0) {
      if (!game.currentPlayerMoves.includes(PlayerMove.PLAY_COIN)) {
        throw new Error("Player may not play coins now.");
      }
      console.log("Coin played", card.title);
      game.currentPlayerMoves = [
        PlayerMove.PLAY_COIN,
        PlayerMove.BUY,
        PlayerMove.SKIP,
      ];
    }
    return game;
  },
  cleanUp(game: GameState) {
    console.log("Clean up turn");
    const player = GameSel.currentPlayer(game);
    // Put hand and in-play into discard
    player.discard.push(...player.hand.splice(0, player.hand.length));
    player.discard.push(...game.inPlay.splice(0, game.inPlay.length));
    // If remaining deck is less than 5, reshuffle discard
    if (player.deck.length < 5) {
      const newDeck = shuffle(player.discard);
      player.deck = [...newDeck, ...player.deck];
      player.discard = [];
    }
    return game;
  },
  drawCard(game: GameState) {
    console.log("Draw card");
    const player = GameSel.currentPlayer(game);
    player.hand.push(player.deck.pop() as CardId);
    return game;
  },
  gainCard(game: GameState, cardId: CardId) {
    const player = GameSel.currentPlayer(game);
    const card = game.supply[cardId];
    console.log("Gain card", cardId);
    player.discard.push(cardId);
    player.hand.splice(player.hand.indexOf(cardId), 1);
    card.inSupply--;
    return game;
  },
  gainAction(game: GameState) {
    const player = GameSel.currentPlayer(game);
    player.actions++;
    return game;
  },
  gainBuy(game: GameState) {
    const player = GameSel.currentPlayer(game);
    player.buys++;
    return game;
  },
  buy(game: GameState, cardId: CardId) {
    console.log("Buy card", cardId);
    const player = GameSel.currentPlayer(game);
    const card = game.supply[cardId];
    const cost = card.coinValue;
    const coins = GameSel.playerCoins(game);
    if (coins >= cost) {
      player.discard.push(...game.inPlay.splice(0, game.inPlay.length));
      GameFn.gainCard(game, cardId);
      player.buys--;
    }
    if (player.buys == 0) {
      // End buy phase, start new turn
      return GameFn.newTurn(game);
    }
    return game;
  },
  skip(game: GameState) {
    console.log("Player skipped move");
    const p = GameSel.currentPlayer(game);
    if (game.currentPlayerMoves.includes(PlayerMove.PLAY_ACTION)) {
      // If player is in action phase, has no buys, and skips, then short-circuit end turn
      if (p.buys > 0) {
        return GameFn.newTurn(game);
      }
      // Else let them buy
      game.currentPlayerMoves = [
        PlayerMove.PLAY_COIN,
        PlayerMove.BUY,
        PlayerMove.SKIP,
      ];
      return game;
    }
    // Player was in buy phase, end turn
    return GameFn.newTurn(game);
  },
  setupPlayer(game: GameState, playerId: string) {
    const p = game.players[playerId];
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

    return game;
  },
  newTurn(game: GameState) {
    GameFn.cleanUp(game);
    const playerId = GameSel.nextPlayerId(game);
    const p = game.players[playerId];
    game.currentPlayerId = playerId;
    game.turn++;

    p.hand = draw(5, p.deck);
    p.actions = 1;
    p.buys = 1;

    game.currentPlayerMoves = [
      PlayerMove.PLAY_ACTION,
      PlayerMove.BUY,
      PlayerMove.SKIP,
    ];
    return game;
  },
  rename(game: GameState, playerId: string, name: string) {
    game.players[playerId].name = name;
    return game;
  },
};

export type GameFunction = typeof GameFn;

export type GameEvent = {
  GameFn: keyof GameFunction;
  GameFnArgs: any[];
};
