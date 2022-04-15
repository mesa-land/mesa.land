import { CardId, CardState } from "./card.ts";
import { Player } from "./player.ts";
import { MesaEvent, MesaEventType } from "./events.ts";

function shuffle<T>(array: Array<T>): Array<T> {
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

function sortHand(
  cards: Record<string, CardState>,
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

export type GameProps = {
  id: string;
  supply: Array<CardState>;
  trash: Array<CardState>;
  players: Array<Player>;
  log: Array<MesaEvent>;
};

export enum GameStatus {
  WAITING = "waiting",
  PLAYING = "playing",
  FINISHED = "finished",
}

export enum TurnPhase {
  ACTION = "action",
  BUY = "buy",
}

export class Game {
  public currentPlayerId?: string;
  public turn: number = 0;
  public trash: Array<CardId> = [];
  public inPlay: Array<CardId> = [];
  public players: Array<Player> = [];
  public status: GameStatus = GameStatus.WAITING;
  public phase: TurnPhase = TurnPhase.ACTION;

  private log: Array<MesaEvent> = [];
  private cards: Record<CardId, CardState> = {};

  constructor(
    public id: string,
    // TODO: Set of Card URLs, grab code, instantiate dynamically
    public supply: Set<CardState>,
    public numPlayers: number,
  ) {
    supply.forEach((c) => {
      this.cards[c.id] = c;
    });
  }

  public join(playerId: string) {
    console.log("Join game", playerId);
    if (!this.players.find((p) => p.id === playerId)) {
      this.players.push(new Player(playerId));
    }
  }

  // Start game with current players
  public start() {
    if (this.players.length === 0) {
      throw new Error("No players have joined.");
    }

    if (this.status !== GameStatus.WAITING) {
      throw new Error(`Game ${this.id} was already started.`);
    }

    // Select first player
    this.currentPlayerId =
      this.players[Math.floor(Math.random() * this.players.length)].id;

    // Distribute initial cards
    this.players.forEach((p) => {
      const playerId = p.id;

      // 3 wins
      this.publish({
        type: MesaEventType.GAIN_CARD,
        turn: 0,
        playerId,
        cardId: "1w",
        quantity: 3,
      });

      // 7 coins
      this.publish({
        type: MesaEventType.GAIN_CARD,
        turn: 0,
        playerId,
        cardId: "1c",
        quantity: 7,
      });

      this.publish({
        type: MesaEventType.SHUFFLE,
        playerId,
      });

      this.publish({
        type: MesaEventType.DRAW,
        playerId,
        quantity: 5,
      });
    });

    this.status = GameStatus.PLAYING;

    // Start first turn
    this.publish({
      type: MesaEventType.GAIN_ACTION,
      playerId: this.currentPlayerId,
      quantity: 1,
    });
    this.publish({
      type: MesaEventType.GAIN_BUY,
      playerId: this.currentPlayerId,
      quantity: 1,
    });
    this.nextPhase();
  }

  // Adds a new event to the event log and computes state changes
  public publish(event: MesaEvent) {
    console.log("publishing event", event);
    const { cardId } = event as { cardId: string };
    const card = this.cards[cardId];
    const player = this.players.find((p) => p.id === event.playerId) as Player;

    if (event.type === MesaEventType.START) {
      this.start();
    }
    if (event.type === MesaEventType.PLAY) {
      this.inPlay.push(cardId);
      player.hand.splice(player.hand.indexOf(cardId), 1);
      if (card.isAction) {
        // TODO card.onPlay()
        console.log("Action played", card.title);
        if (!this.playerHasActionsInHand()) {
          // End action phase
          this.phase = TurnPhase.BUY;
        }
      }
    }
    if (event.type === MesaEventType.BUY) {
      const cost = card.coinValue;
      const coins = this.playerCoins();
      if (coins >= cost) {
        player.discard.push(...this.inPlay.splice(0, this.inPlay.length));
        this.publish({
          cardId: event.cardId,
          type: MesaEventType.GAIN_CARD,
          playerId: player.id,
          quantity: 1,
        });
        player.buys--;
      }
      if (player.buys == 0) {
        // End buy phase
        this.nextPhase();
      }
    }
    if (event.type === MesaEventType.GAIN_CARD) {
      for (let i = 0; i < event.quantity!; i++) {
        if (card.inSupply) {
          player.discard.push(event.cardId!);
          card.inSupply--;
        }
      }
    }
    if (event.type === MesaEventType.GAIN_ACTION) {
      player.actions += event.quantity!;
    }
    if (event.type === MesaEventType.GAIN_BUY) {
      player.buys += event.quantity!;
    }
    if (event.type === MesaEventType.SHUFFLE) {
      const newDeck = shuffle(player.discard);
      player.discard = [];
      player.deck = newDeck;
    }
    if (event.type === MesaEventType.DRAW) {
      for (let i = 0; i < event.quantity!; i++) {
        const topDeck = player.deck.pop();
        if (topDeck) {
          player.hand.push(topDeck);
        }
      }
      sortHand(this.cards, player.hand);
    }
    if (event.type === MesaEventType.CLEANUP) {
      player.discard.push(...player.hand.splice(0, player.hand.length));
      const remainingDeck = player.deck.length;
      this.publish({
        type: MesaEventType.DRAW,
        playerId: player.id,
        quantity: Math.min(remainingDeck, 5),
      });
      if (remainingDeck < 5) {
        this.publish({
          type: MesaEventType.SHUFFLE,
          playerId: player.id,
        });
        this.publish({
          type: MesaEventType.DRAW,
          playerId: player.id,
          quantity: 5 - remainingDeck,
        });
      }
      player.actions = 0;
      player.buys = 0;
      player.coins = 0;
    }
    if (event.type === MesaEventType.RENAME) {
      player.name = event.name!;
      console.log("now what", this.players);
    }
    this.log.push(event);
  }

  public nextPhase() {
    console.log("nextPhase", this.player());
    if (this.player().actions > 0 && this.playerHasActionsInHand()) {
      this.phase = TurnPhase.ACTION;
    } else if (this.player().buys > 0) {
      this.phase = TurnPhase.BUY;
    } else {
      // cleanup phase
      this.publish({
        type: MesaEventType.CLEANUP,
        playerId: this.currentPlayerId,
      });
      // next player
      const playerId = this.nextPlayerId();
      this.currentPlayerId = playerId;
      this.publish({
        type: MesaEventType.GAIN_ACTION,
        playerId,
        quantity: 1,
      });
      this.publish({
        type: MesaEventType.GAIN_BUY,
        playerId,
        quantity: 1,
      });
      this.turn++;
    }
  }

  public player(id = this.currentPlayerId): Player {
    return this.players.find((p) => p.id === id) as Player;
  }

  public playerCanBuy(cardId: string): boolean {
    const card = this.cards[cardId];
    const player = this.player();
    const cost = card.cost;
    const coins = this.playerCoins();
    return player.buys > 0 && cost <= coins;
  }

  private nextPlayerId(): string {
    const i = this.players.findIndex((p) => p.id === this.currentPlayerId);
    return this.players[(i + 1) % this.players.length].id;
  }

  public getCoinsAndWins(): Array<CardState> {
    const coins: Array<CardState> = [];
    const wins: Array<CardState> = [];

    this.supply.forEach((c) => {
      if (c.coinValue > 0 && !c.isAction) {
        coins.push(c);
      }
      if (c.winValue > 0 && !c.isAction) {
        wins.push(c);
      }
    });

    return coins.concat(wins);
  }

  public getActions(): Array<CardState> {
    const actions: Array<CardState> = [];

    this.supply.forEach((c) => {
      if (c.isAction) {
        actions.push(c);
      }
    });

    return actions;
  }

  public getInPlay(): Array<CardState> {
    const inPlay: Array<CardState> = [];

    this.inPlay.forEach((c) => {
      inPlay.push(this.cards[c]);
    });

    return inPlay;
  }

  public getDiscard(): Array<CardState> {
    const discard: Array<CardState> = [];

    this.player().discard.forEach((c) => {
      discard.push(this.cards[c]);
    });

    return discard;
  }

  public getHand(): Array<CardState> {
    const hand: Array<CardState> = [];

    this.player().hand.forEach((c) => {
      hand.push(this.cards[c]);
    });

    return hand;
  }

  public playerHasActionsInHand() {
    return this.player().hand.some((h) => this.cards[h].isAction);
  }

  public playerWins() {
    // TODO: count hand and discard
    return this.player().deck.reduce(
      (acc, val) => (acc + this.cards[val].winValue),
      0,
    );
  }

  public playerCoins() {
    return this.inPlay.reduce(
      (acc, val) => (acc + this.cards[val].coinValue),
      0,
    );
  }
}
