import { Table } from "../../../std/table.ts";
import { StateType } from "../../../std/card.ts";

export const SeedRound = {
  title: "Seed Round",
  description: "+2 Cards, +1 Action",
  types: {
    coin: false,
    action: true,
    win: false,
    loss: false,
  },
  value: 0,
  cost: 4,
  effects: {
    onAction(table: Table) {
      table.currentPlayer!().drawCards(2);
      table.currentPlayer!().addActions(1);
    },
  },
  state: StateType.Supply,
};
