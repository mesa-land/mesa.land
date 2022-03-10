import { CardState, StateType } from "../../std/card.ts";

const oneWin = {
  title: "1 Win",
  image: "/cards/1-win.png",
  description: "Worth 1 win at endgame.",
  types: {
    coin: true,
    action: false,
    win: false,
    loss: false,
  },
  value: 1,
  cost: 2,
  state: StateType.Supply,
};

const threeWins = {
  title: "3 Wins",
  image: "/cards/3-wins.png",
  description: "Worth 3 wins at endgame.",
  types: {
    coin: true,
    action: false,
    win: false,
    loss: false,
  },
  value: 3,
  cost: 5,
  state: StateType.Supply,
};

const sixWins = {
  title: "6 Wins",
  image: "/cards/6-wins.png",
  description: "Worth 6 wins at endgame.",
  types: {
    coin: true,
    action: false,
    win: false,
    loss: false,
  },
  value: 6,
  cost: 8,
  state: StateType.Supply,
};

export const WinCard = (value: 1 | 3 | 6): CardState => {
  switch (value) {
    case 1:
      return oneWin;
    case 3:
      return threeWins;
    case 6:
      return sixWins;
  }
};
