import { CardId, CardState } from "./card.ts";
import { Player } from "./player.ts";
import { MesaEvent, MesaEventType } from "./events.ts";

export type GameProps = {
  id: string;
  supply: Array<CardState>;
  trash: Array<CardState>;
  players: Array<Player>;
  log: Array<MesaEvent>;
};

export enum GameStatus {
  WAITING = "waiting",
  PLAYING = "playing",
  FINISHED = "finished",
}

export class Game {
  public currentPlayerId?: string;
  public turn: number = 0;
  public trash: Array<CardId> = [];
  public inPlay: Array<CardId> = [];
  public players: Array<Player> = [];
  private log: Array<MesaEvent> = [];
  private status: GameStatus = GameStatus.WAITING;
  private cards: Record<CardId, CardState> = {};

  constructor(
    public id: string,
    // TODO: Set of Card URLs, grab code, instantiate dynamically
    public supply: Set<CardState>,
    public numPlayers: number,
  ) {
    supply.forEach((c) => {
      this.cards[c.id] = c;
    });
  }

  public joinGame(playerId: string) {
    if (!this.players.find((p) => p.id === playerId)) {
      this.players.push(new Player(playerId));
    }
  }

  // Start game with current players
  public startGame() {
    if (this.players.length === 0) {
      throw new Error("No players have joined.");
    }

    if (this.status !== GameStatus.WAITING) {
      throw new Error(`Game ${this.id} was already started.`);
    }

    // Distribute initial cards
    this.players.forEach((p) => {
      // 3 wins
      this.publish({
        type: MesaEventType.GAIN_CARD,
        turn: 0,
        playerId: p.id,
        cardId: "1w",
        quantity: 3,
      });

      // 7 coins
      this.publish({
        type: MesaEventType.GAIN_CARD,
        turn: 0,
        playerId: p.id,
        cardId: "1c",
        quantity: 7,
      });
    });

    // Select first player
    this.currentPlayerId =
      this.players[Math.floor(Math.random() * this.players.length)].id;

    // Start first turn
    this.startTurn(1);
  }

  // Adds a new event to the event log and computes state changes
  public publish(event: MesaEvent) {
    this.log.push(event);
    if (event.type === MesaEventType.PLAY) {
      this.inPlay.push(event.cardId as CardId);
    }
    if (event.type === MesaEventType.BUY) {
    }
    this.updatePlayerStats();
  }

  public startTurn(num: number) {
    this.turn = num;
  }

  public player(): Player {
    return this.players.find((p) => p.id === this.currentPlayerId) as Player;
  }

  public getCoinsAndWins(): Array<CardState> {
    const coins: Array<CardState> = [];
    const wins: Array<CardState> = [];

    this.supply.forEach((c) => {
      if (c.coinValue > 0 && !c.isAction) {
        coins.push(c);
      }
      if (c.winValue > 0 && !c.isAction) {
        wins.push(c);
      }
    });

    return coins.concat(wins);
  }

  public getActions(): Array<CardState> {
    const actions: Array<CardState> = [];

    this.supply.forEach((c) => {
      if (c.isAction) {
        actions.push(c);
      }
    });

    return actions;
  }

  private updatePlayerStats() {
    this.player().coins = 0;
    this.inPlay.forEach((cid: CardId) => {
      const card = this.cards[cid];
      if (card.coinValue) {
        this.player().coins++;
      }
    });
  }
}
