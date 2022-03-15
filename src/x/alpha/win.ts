import { CardProps, StateType } from "../../std/card.ts";

const oneWin = {
  quantity: 20,
  title: "1 Win",
  image: "/cards/1-win.png",
  isAction: false,
  winValue: 1,
  coinValue: 0,
  cost: 2,
  state: StateType.Supply,
};

const threeWins = {
  quantity: 20,
  title: "3 Wins",
  image: "/cards/3-wins.png",
  isAction: false,
  winValue: 3,
  coinValue: 0,
  cost: 5,
  state: StateType.Supply,
};

const sixWins = {
  quantity: 10,
  title: "6 Wins",
  image: "/cards/6-wins.png",
  isAction: false,
  winValue: 6,
  coinValue: 0,
  cost: 8,
  state: StateType.Supply,
};

export const WinCard = (value: 1 | 3 | 6): CardProps => {
  switch (value) {
    case 1:
      return oneWin;
    case 3:
      return threeWins;
    case 6:
      return sixWins;
  }
};
