import { GameCard } from "./GameCard.ts";
import { GamePlayer } from "./GamePlayer.ts";
import { GameState, PlayerMove } from "./GameState.ts";

// Game selectors. Filters and selects game state.
export const createGameSel = (game: GameState) => {
  const sel = {
    currentPlayer(): GamePlayer {
      return game.players[game.currentPlayerId!];
    },
    connectedPlayer(): GamePlayer {
      return game.players[game.connectedPlayerId!];
    },
    playerHasActionsInHand(): boolean {
      return sel.currentPlayer().hand.some((h) => game.supply[h].isAction);
    },
    playerCanBuy(cardId: string): boolean {
      if (game.supply[cardId].inSupply === 0) {
        return false;
      }
      if (!game.currentPlayerMoves.includes(PlayerMove.BUY)) {
        return false;
      }
      const card = game.supply[cardId];
      const player = sel.currentPlayer();
      const cost = card.cost;
      const coins = sel.playerCoins();
      return player.buys > 0 && cost <= coins;
    },
    playerCanPlay(cardId: string): boolean {
      const card = game.supply[cardId];
      if (
        card.isAction &&
        !game.currentPlayerMoves.includes(PlayerMove.PLAY_ACTION)
      ) {
        return false;
      }
      if (
        card.coinValue > 0 &&
        !game.currentPlayerMoves.includes(PlayerMove.PLAY_COIN)
      ) {
        return false;
      }
      return true;
    },
    nextPlayerId(): string {
      // This is absolutely not safe. And yet...
      const playerIds = Object.keys(game.players);
      if (game.currentPlayerId === undefined) {
        return playerIds[0];
      }
      const i = playerIds.findIndex((pId) => pId === game.currentPlayerId);
      return playerIds[(i + 1) % playerIds.length];
    },
    getCoinsAndWinsAndFails(): Array<GameCard> {
      const coins: Array<GameCard> = [];
      const wins: Array<GameCard> = [];
      const fails: Array<GameCard> = [];

      Object.keys(game.supply).forEach((cId) => {
        const c = game.supply[cId];
        if (c.coinValue > 0 && !c.isAction) {
          coins.push(c);
        }
        if (c.winValue > 0 && !c.isAction) {
          wins.push(c);
        }
        if (c.winValue < 0 && !c.isAction) {
          fails.push(c);
        }
      });

      return [...coins, ...wins, ...fails];
    },
    getActions(): Array<GameCard> {
      const actions: Array<GameCard> = [];

      Object.keys(game.supply).forEach((cId) => {
        const c = game.supply[cId];
        if (c.isAction) {
          actions.push(c);
        }
      });

      return actions;
    },
    getInPlay(): Array<GameCard> {
      const inPlay: Array<GameCard> = [];

      game.inPlay.forEach((c) => {
        inPlay.push(game.supply[c]);
      });

      return inPlay;
    },
    getDiscard(): Array<GameCard> {
      const discard: Array<GameCard> = [];

      sel.currentPlayer().discard.forEach((c) => {
        discard.push(game.supply[c]);
      });

      return discard;
    },
    getHand(): Array<GameCard> {
      const hand: Array<GameCard> = [];

      sel.currentPlayer().hand.forEach((c) => {
        hand.push(game.supply[c]);
      });

      return hand;
    },
    playerWins() {
      // TODO: count hand and discard
      return (sel.currentPlayer().deck).reduce<number>(
        (acc, val) => (acc + game.supply[val].winValue),
        0,
      );
    },
    playerCoins() {
      return game.inPlay.reduce(
        (acc, val) => (acc + game.supply[val].coinValue),
        0,
      );
    },
  };
  return sel;
};

export type GameSelector = ReturnType<typeof createGameSel>;
