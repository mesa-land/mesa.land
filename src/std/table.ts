import { CardState } from "./card.ts";
import { Player } from "./player.ts";

export class Table {
  constructor(
    public id: string,
    public cards: Array<CardState>,
    public players: Array<Player>,
  ) {}
}
