import { ActionEffect } from "./ActionEffect.ts";
import { PlayerId } from "./GamePlayer.ts";

export type CardId = string;

export type GameCard = {
  id: CardId;
  image?: string;
  title: string;
  isAction: boolean;
  coinValue: number;
  winValue: number;
  cost: number;
  inSupply: number;
  description?: string;
  target?: PlayerId;
  effects?: Array<ActionEffect>;
};

export function shuffle<T>(array: Array<T>): Array<T> {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function sortHand(
  cards: Record<string, GameCard>,
  hand: Array<string>,
): Array<string> {
  return hand.sort((a, b) => {
    let aUtility = 0;
    let bUtility = 0;
    if (cards[a].isAction) {
      aUtility -= 10;
    }
    if (cards[b].isAction) {
      bUtility -= 10;
    }
    aUtility -= cards[a].cost;
    bUtility -= cards[b].cost;
    aUtility += cards[a].winValue * 10;
    bUtility += cards[b].winValue * 10;

    return aUtility - bUtility;
  });
}

export function draw(
  num: number,
  deck: Array<string>,
): Array<string> {
  return deck.splice(0, num);
}

// Native Cards - Coins, Wins, Fails

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
  title: "6 Wins",
  image: "/cards/6-wins.png",
  isAction: false,
  winValue: 6,
  coinValue: 0,
  cost: 8,
  inSupply: 12,
};

export const WinCard = (value: 1 | 3 | 6): GameCard => {
  switch (value) {
    case 1:
      return oneWin;
    case 3:
      return threeWins;
    case 6:
      return sixWins;
  }
};

export const FailCard: GameCard = {
  id: "1f",
  title: "1 Fail",
  image: "/cards/1-fail.png",
  isAction: false,
  winValue: -1,
  coinValue: 0,
  cost: 0,
  inSupply: 12,
};
