import { Table } from "../../../std/table.ts";
import { CardProps, StateType } from "../../../std/card.ts";

export const ClickFarmBoost: CardProps = {
  quantity: 10,
  title: "Click Farm Boost",
  description: "+2 Actions",
  isAction: true,
  winValue: 0,
  coinValue: 0,
  cost: 3,
  effects: {
    onAction(table: Table) {
      table.gainActions(2);
    },
  },
  state: StateType.Supply,
};
