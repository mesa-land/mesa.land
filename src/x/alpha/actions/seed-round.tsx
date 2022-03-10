import { Table } from "../../../std/table.ts";
import { Player } from "../../../std/player.ts";
import { StateType } from "../../../std/card.ts";

export const SeedRound = {
  title: "Seed Round",
  description: "+2 Cards, +1 Action",
  types: {
    coin: true,
    action: false,
    win: false,
    loss: false,
  },
  value: 0,
  cost: 4,
  effects: {
    onAction(table: Table, player: Player) {
      player.drawCards(2);
      player.addActions(1);
    },
  },
  state: StateType.Supply,
};
