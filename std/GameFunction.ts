import { CardId, draw, shuffle } from "./GameCard.ts";
import { createPlayer } from "./GamePlayer.ts";
import { createGameSel, GameSelector } from "./GameSelector.ts";
import { GameState, GameStatus, PlayerMove } from "./GameState.ts";

// Game transformations. Apply event to achieve new game state.
export const createGameFn = (
  game: GameState,
  sel: GameSelector = createGameSel(game),
) => {
  const fn = {
    join(playerId: string) {
      console.log("Join game", playerId);
      if (!game.players[playerId]) {
        game.players[playerId] = createPlayer(playerId);
      }
      game.numPlayers = Object.keys(game.players).length;
      return game;
    },
    // Start game with current players
    start() {
      console.log("Start game");
      if (game.numPlayers === 0) {
        throw new Error("No players have joined.");
      }

      if (game.status !== GameStatus.WAITING) {
        throw new Error(`Game ${game.id} was already started.`);
      }

      const playerIds = Object.keys(game.players);
      // Select first player
      game.currentPlayerId = playerIds[0];

      // Distribute initial cards
      playerIds.forEach((playerId) => {
        fn.setupPlayer(playerId);
      });

      // Set status to PLAYING
      game.status = GameStatus.PLAYING;

      game.currentPlayerMoves = [
        PlayerMove.BUY,
        PlayerMove.SKIP,
      ];

      return fn.newTurn();
    },
    play(cardId: CardId) {
      const player = sel.currentPlayer();
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
        if (!sel.playerHasActionsInHand()) {
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
    cleanUp() {
      console.log("Clean up turn");
      const player = sel.currentPlayer();
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
    drawCard() {
      console.log("Draw card");
      const player = sel.currentPlayer();
      player.hand.push(player.deck.pop() as CardId);
      return game;
    },
    gainCard(cardId: CardId) {
      const player = sel.currentPlayer();
      const card = game.supply[cardId];
      console.log("Gain card", cardId);
      player.discard.push(cardId);
      player.hand.splice(player.hand.indexOf(cardId), 1);
      card.inSupply--;
      return game;
    },
    gainAction() {
      const player = sel.currentPlayer();
      player.actions++;
      return game;
    },
    gainBuy() {
      const player = sel.currentPlayer();
      player.buys++;
      return game;
    },
    buy(cardId: CardId) {
      console.log("Buy card", cardId);
      const player = sel.currentPlayer();
      const card = game.supply[cardId];
      const cost = card.coinValue;
      const coins = sel.playerCoins();
      if (coins >= cost) {
        player.discard.push(...game.inPlay.splice(0, game.inPlay.length));
        fn.gainCard(cardId);
        player.buys--;
      }
      if (player.buys == 0) {
        // End buy phase, start new turn
        return fn.newTurn();
      }
      return game;
    },
    skip() {
      console.log("Player skipped move");
      const p = sel.currentPlayer();
      if (game.currentPlayerMoves.includes(PlayerMove.PLAY_ACTION)) {
        // If player is in action phase, has no buys, and skips, then short-circuit end turn
        if (p.buys > 0) {
          return fn.newTurn();
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
      return fn.newTurn();
    },
    setupPlayer(playerId: string) {
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
    newTurn() {
      fn.cleanUp();
      const playerId = sel.nextPlayerId();
      const p = game.players[playerId];
      game.currentPlayerId = playerId;
      game.turn++;

      p.hand = draw(5, p.deck);
      p.actions = 1;
      p.buys = 1;

      game.currentPlayerMoves = [
        PlayerMove.PLAY_ACTION,
        PlayerMove.SKIP,
      ];
      if (!sel.playerHasActionsInHand()) {
        game.currentPlayerMoves = [
          PlayerMove.PLAY_COIN,
          PlayerMove.BUY,
          PlayerMove.SKIP,
        ];
      }
      return game;
    },
    rename(playerId: string, name: string) {
      game.players[playerId].name = name;
      return game;
    },
  };
  return fn;
};

export type GameFunction = ReturnType<typeof createGameFn>;
// TODO: Typescript doesn't support reflection, so we have to have this boring filter. see https://github.com/microsoft/TypeScript/issues/3628
export const clientGameFunctions = Object.keys(createGameFn({} as any));
