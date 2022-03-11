import { Table } from "../../../std/table.ts";
import { CardState, StateType } from "../../../std/card.ts";

export const ClickFarmBoost: CardState = {
  title: "Click Farm Boost",
  description: "+2 Actions",
  types: {
    coin: false,
    action: true,
    win: false,
    loss: false,
  },
  value: 0,
  cost: 3,
  effects: {
    onAction(table: Table) {
      table.addActions(2);
    },
  },
  state: StateType.Supply,
};
