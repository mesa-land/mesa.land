import { CardProps } from "./card.ts";

export class Player {
  constructor(
    public id: string,
    public actions: number,
    public buys: number,
    public wins: number,
    public deck: Array<CardProps>,
    public discard: Array<CardProps>,
    public hand: Array<CardProps>,
  ) {}
}
