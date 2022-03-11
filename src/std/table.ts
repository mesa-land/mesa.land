import { CardState } from "./card.ts";
import { Player } from "./player.ts";

export enum EventType {
  PLAY_ACTION = "playAction",
  PLAY_COIN = "playCoin",
  BUY_CARD = "buyCard",
  DRAW_CARD = "drawCard",
  GAIN_ACTION = "gainAction",
  GAIN_BUY = "gainBuy",
  GAIN_CARD = "gainCard",
}

export type Event = {
  type: EventType;
  turn: number;
  playerId: string;
  data: any;
};

export type TableProps = {
  id: string;
  cards: Array<CardState>;
  players: Array<Player>;
  log: Array<Event>;
};

export class Table {
  constructor(
    public id: string,
    public cards: Array<CardState>,
    public players: Array<Player>,
    public log: Array<Event>,
  ) {
    this.publishEvent({
      type: EventType.GAIN_CARD,
      turn: 0,
      playerId: players[0].id,
      data: { cards: "win", quantity: 3 },
    });
    this.currentPlayerId = players[0].id;
  }

  public currentPlayerId?: string;
  public turn: number = 0;

  // Adds a new event to the event log and computes state changes
  public publishEvent(event: Event) {
  }

  public addActions(quantity: number) {
    this.publishEvent({
      type: EventType.GAIN_CARD,
      turn: this.turn,
      playerId: this.currentPlayer()!.id,
      data: { cards: "win", quantity },
    });
  }

  private currentPlayer() {
    return this.players.find((p) => p.id === this.currentPlayerId);
  }

  private findPlayer(playerId: string): Player | null {
    return null;
  }
}
