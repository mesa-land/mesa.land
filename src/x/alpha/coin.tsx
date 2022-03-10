import { CardState, StateType } from "../../std/card.ts";

const oneCoin = {
  title: "1 Coin",
  image: "/cards/1-coin.png",
  description: "Worth 1 coin.",
  types: {
    coin: true,
    action: false,
    win: false,
    loss: false,
  },
  value: 1,
  cost: 0,
  state: StateType.Supply,
};

const twoCoins = {
  title: "2 Coins",
  image: "/cards/2-coins.png",
  description: "Worth 2 coins.",
  types: {
    coin: true,
    action: false,
    win: false,
    loss: false,
  },
  value: 2,
  cost: 3,
  state: StateType.Supply,
};

const threeCoins = {
  title: "3 Coins",
  image: "/cards/3-coins.png",
  description: "Worth 3 coins.",
  types: {
    coin: true,
    action: false,
    win: false,
    loss: false,
  },
  value: 3,
  cost: 6,
  state: StateType.Supply,
};

export const CoinCard = (value: 1 | 2 | 3): CardState => {
  switch (value) {
    case 1:
      return oneCoin;
    case 2:
      return twoCoins;
    case 3:
      return threeCoins;
  }
};
