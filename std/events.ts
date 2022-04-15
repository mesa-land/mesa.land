import { CardId } from "./card.ts";

export enum MesaEventType {
  START = "start",
  PLAY = "play",
  BUY = "buy",
  DRAW = "draw",
  GAIN_ACTION = "gainAction",
  GAIN_BUY = "gainBuy",
  GAIN_CARD = "gainCard",
  SHUFFLE = "shuffle",
  TRASH = "trash",
  NEXT = "next",
  CLEANUP = "cleanup",
  RENAME = "rename",
}

export enum TargetPlayer {
  CURRENT = "current",
  OTHERS = "others",
}

export type MesaEvent = {
  type: MesaEventType;
  quantity?: number;
  target?: TargetPlayer;
  turn?: number;
  playerId?: string;
  cardId?: CardId;
  name?: string;
};

export function parseMesaEvent(json: string): MesaEvent {
  const data = JSON.parse(json);
  return {
    type: data.type,
    turn: data.turn,
    target: data.target,
    playerId: data.playerId,
    cardId: data.cardId,
    quantity: data.quantity,
    name: data.name,
  };
}

export const moves = {
  gainActions(target: TargetPlayer, quantity: number): MesaEvent {
    return {
      type: MesaEventType.GAIN_ACTION,
      target,
      quantity,
    };
  },

  drawCards(target: TargetPlayer, quantity: number): MesaEvent {
    return {
      type: MesaEventType.DRAW,
      target,
      quantity,
    };
  },

  gainBuys(target: TargetPlayer, quantity: number): MesaEvent {
    return {
      type: MesaEventType.GAIN_BUY,
      target,
      quantity,
    };
  },
};

export type GameMoves = typeof moves;
