import { Table } from "../../../std/table.ts";
import { Player } from "../../../std/player.ts";
import { CardState, StateType } from "../../../std/card.ts";

export const ClickFarmBoost: CardState = {
  title: "Click Farm Boost",
  description: "+2 Actions",
  types: {
    coin: true,
    action: false,
    win: false,
    loss: false,
  },
  value: 0,
  cost: 3,
  effects: {
    onAction(table: Table, player: Player) {
      player.addActions(2);
    },
  },
  state: StateType.Supply,
};
