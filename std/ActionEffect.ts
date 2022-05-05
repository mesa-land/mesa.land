import { PlayerId } from "./GamePlayer.ts";

export type ActionCondition = {
  GameSel: string;
  GameSelArgs: Array<any>;
  operator: "AND" | "OR";
};

export type ActionEffect = {
  target?: PlayerId;
  effects: Array<{
    GameFn: string;
    GameFnArgs: any[];
    conditions: Array<ActionCondition>;
  }>;
};
