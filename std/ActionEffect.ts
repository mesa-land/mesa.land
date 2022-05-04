export type ActionEffect = {
  condition: string;
  target: string;
  effect: Array<{
    GameFn: string;
    GameFnArgs: any[];
  }>;
};
