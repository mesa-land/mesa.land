import { GameMoves, MesaEvent } from "./events.ts";

export type CardId = string;

export class CardState {
  public image?: string;

  constructor(
    public id: CardId,
    public title: string,
    public isAction: boolean,
    public coinValue: number,
    public winValue: number,
    public cost: number,
    public inSupply: number = 10,
    public description?: string,
    public onPlay?: (moves: GameMoves) => Array<MesaEvent>,
  ) {
  }
}
