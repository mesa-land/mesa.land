import { CardProps, StateType } from "../../std/card.ts";

const oneCoin = {
  quantity: 20,
  title: "1 Coin",
  image: "/cards/1-coin.png",
  isAction: false,
  winValue: 0,
  coinValue: 1,
  cost: 0,
  state: StateType.Supply,
};

const twoCoins = {
  quantity: 20,
  title: "2 Coins",
  image: "/cards/2-coins.png",
  isAction: false,
  winValue: 0,
  coinValue: 2,
  cost: 3,
  state: StateType.Supply,
};

const threeCoins = {
  quantity: 20,
  title: "3 Coins",
  image: "/cards/3-coins.png",
  isAction: false,
  winValue: 0,
  coinValue: 3,
  cost: 6,
  state: StateType.Supply,
};

export const CoinCard = (value: 1 | 2 | 3): CardProps => {
  switch (value) {
    case 1:
      return oneCoin;
    case 2:
      return twoCoins;
    case 3:
      return threeCoins;
  }
};
