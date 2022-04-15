import { CardState } from "../../std/card.ts";

const oneWin = {
  id: "1w",
  title: "1 Win",
  image: "/cards/1-win.png",
  isAction: false,
  winValue: 1,
  coinValue: 0,
  cost: 2,
  inSupply: 30,
};

const threeWins = {
  id: "3w",
  quantity: 20,
  title: "3 Wins",
  image: "/cards/3-wins.png",
  isAction: false,
  winValue: 3,
  coinValue: 0,
  cost: 5,
  inSupply: 12,
};

const sixWins = {
  id: "6w",
  quantity: 10,
  title: "6 Wins",
  image: "/cards/6-wins.png",
  isAction: false,
  winValue: 6,
  coinValue: 0,
  cost: 8,
  inSupply: 12,
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
