import { ActionEffect } from "./ActionEffect.ts";

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
      aUtility += 10;
    }
    if (cards[b].isAction) {
      bUtility += 10;
    }
    aUtility += cards[a].cost;
    bUtility += cards[b].cost;
    aUtility -= cards[a].winValue;
    bUtility -= cards[b].winValue;

    return aUtility - bUtility;
  });
}

export function draw(
  num: number,
  deck: Array<string>,
): Array<string> {
  return deck.splice(0, num);
}
