import { Table } from "../../../std/table.ts";
import { CardProps, StateType } from "../../../std/card.ts";

export const SeedRound: CardProps = {
  quantity: 10,
  title: "Seed Round",
  description: "+2 Cards, +1 Action",
  isAction: true,
  winValue: 0,
  coinValue: 0,
  cost: 4,
  effects: {
    onAction(table: Table) {
      table.drawCards(2);
      table.gainActions(1);
    },
  },
  state: StateType.Supply,
};
