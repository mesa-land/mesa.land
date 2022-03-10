export type Card = {
  getTitle: () => string;
  getDescription: () => string;
  getValue: () => string;
  getCost: () => string;
  getType: () => string;
};

export type CardType = "action" | "coin" | "win" | "loss";

export enum StateType {
  Supply = "supply",
  Discard = "discard",
  Hand = "hand",
  Play = "play",
  Trash = "trash",
}

export type CardState = {
  title: string;
  image?: string;
  description: string;
  types: Record<CardType, boolean>;
  value: number;
  cost: number;
  state: StateType;
  effects?: Record<string, any>;
};
