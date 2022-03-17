import { CardState } from "../../std/card.ts";

const oneCoin = {
  id: "1c",
  quantity: 20,
  title: "1 Coin",
  image: "/cards/1-coin.png",
  isAction: false,
  winValue: 0,
  coinValue: 1,
  cost: 0,
};

const twoCoins = {
  id: "2c",
  quantity: 20,
  title: "2 Coins",
  image: "/cards/2-coins.png",
  isAction: false,
  winValue: 0,
  coinValue: 2,
  cost: 3,
};

const threeCoins = {
  id: "3c",
  quantity: 20,
  title: "3 Coins",
  image: "/cards/3-coins.png",
  isAction: false,
  winValue: 0,
  coinValue: 3,
  cost: 6,
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
