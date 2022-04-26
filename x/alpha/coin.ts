import { GameCard } from "../../std/GameCard.ts";

const oneCoin = {
  id: "1c",
  title: "$1 Coin",
  image: "/cards/1-coin.png",
  isAction: false,
  winValue: 0,
  coinValue: 1,
  cost: 0,
  inSupply: 50,
};

const twoCoins = {
  id: "2c",
  title: "$2 Coins",
  image: "/cards/2-coins.png",
  isAction: false,
  winValue: 0,
  coinValue: 2,
  cost: 3,
  inSupply: 30,
};

const threeCoins = {
  id: "3c",
  title: "$3 Coins",
  image: "/cards/3-coins.png",
  isAction: false,
  winValue: 0,
  coinValue: 3,
  cost: 6,
  inSupply: 20,
};

export const CoinCard = (value: 1 | 2 | 3): GameCard => {
  switch (value) {
    case 1:
      return oneCoin;
    case 2:
      return twoCoins;
    case 3:
      return threeCoins;
  }
};
