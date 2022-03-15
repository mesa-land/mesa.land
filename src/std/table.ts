import { CardProps } from "./card.ts";
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
  supply: Array<CardProps>;
  players: Array<Player>;
  log: Array<Event>;
};

export class Table {
  constructor(
    public id: string,
    public supply: Array<CardProps>,
    public players: Array<Player>,
    public log: Array<Event>,
  ) {
  }

  public currentPlayerId?: string;
  public turn: number = 0;

  public setup() {
    this.publishEvent({
      type: EventType.GAIN_CARD,
      turn: 0,
      playerId: this.players[0].id,
      data: { card: "win", quantity: 3 },
    });
    this.currentPlayerId = this.players[0].id;
  }

  // Adds a new event to the event log and computes state changes
  public publishEvent(event: Event) {
    this.log.push(event);
    if (event.type === EventType.GAIN_CARD) {
    }
  }

  public gainActions(quantity: number, playerId?: string) {
    this.publishEvent({
      type: EventType.GAIN_ACTION,
      turn: this.turn,
      playerId: playerId || this.player()!.id,
      data: { quantity },
    });
  }

  public drawCards(quantity: number, playerId?: string) {
    this.publishEvent({
      type: EventType.DRAW_CARD,
      turn: this.turn,
      playerId: playerId || this.player()!.id,
      data: { quantity },
    });
  }

  public player() {
    return this.players.find((p) => p.id === this.currentPlayerId);
  }

  private findPlayer(playerId: string): Player | null {
    return null;
  }
}
