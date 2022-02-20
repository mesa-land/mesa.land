import { CardState } from "../components/card.tsx";

export const alphaTableCards : Array<CardState> = [
  {
    title: "1 Coin",
    image: '/cards/test.png',
    description: "An initial testing card. Worth 1 coin.",
    types: {
      coin: true,
      action: false,
      win: false,
      loss: false,
    },
    value: 1,
    cost: 0,
    state: "supply",
  },
  {
    title: "3 Coins",
    image: '/cards/test.png',
    description: "An initial testing card. Worth 3 coins.",
    types: {
      coin: true,
      action: false,
      win: false,
      loss: false,
    },
    value: 3,
    cost: 2,
    state: "supply",
  },
  {
    title: "1 Win",
    image: '/cards/test.png',
    description: "An initial testing card. Worth 1 win.",
    types: {
      coin: false,
      action: false,
      win: true,
      loss: false,
    },
    value: 0,
    cost: 2,
    state: "supply",
  },
  {
    title: "3 Wins",
    image: '/cards/test.png',
    description: "An initial testing card. Worth 3 wins.",
    types: {
      coin: false,
      action: false,
      win: true,
      loss: false,
    },
    value: 0,
    cost: 5,
    state: "supply",
  }
]

export const alphaTable = {
  tableId: 'alpha',
  cards: alphaTableCards,
}
