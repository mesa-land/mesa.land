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

export class Table {
  constructor(
    public id: string,
    public cards: Array<CardState>,
    public players: Array<Player>,
    public log: Array<Event>,
  ) {}
}
