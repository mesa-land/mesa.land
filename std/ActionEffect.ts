export type ActionCondition = {
  GameSel: string;
  GameSelArgs: Array<any>;
};

export type ActionEffect = {
  GameFn: string;
  GameFnArgs?: any[];
  operator?: "AND" | "OR";
  conditions?: Array<ActionCondition>;
};
