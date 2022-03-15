export enum StateType {
  Supply = "supply",
  Discard = "discard",
  Hand = "hand",
  Play = "play",
  Trash = "trash",
}

export type CardProps = {
  quantity: number;
  title: string;
  image?: string;
  description?: string;
  isAction: boolean;
  coinValue: number;
  winValue: number;
  cost: number;
  state: StateType;
  effects?: Record<string, any>;
};
