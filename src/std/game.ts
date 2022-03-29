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
    this.startTurn(0);
  }

  // Adds a new event to the event log and computes state changes
  public publish(event: MesaEvent) {
    console.log("publishing event", event);

    const card = this.cards[event.cardId!];
    const player = this.players.find((p) => p.id === event.playerId) as Player;

    if (event.type === MesaEventType.START) {
      this.start();
    }
    if (event.type === MesaEventType.PLAY) {
      this.inPlay.push(event.cardId as CardId);
      player.hand.splice(player.hand.indexOf(event.cardId as CardId), 1);
      if (card.isAction) {
        // TODO card.onPlay()
        console.log("Action played", card.title);
      }
    }
    if (event.type === MesaEventType.BUY) {
      const cost = card.coinValue;
      const coins = this.playerCoins();
      if (coins >= cost) {
        this.inPlay.splice(0, this.inPlay.length);
        this.publish({
          cardId: event.cardId,
          type: MesaEventType.GAIN_CARD,
          playerId: player.id,
          quantity: 1,
        });
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
    }
    this.log.push(event);
  }

  public startTurn(num: number) {
    this.turn = num;
    if (this.playerHasActions()) {
      this.phase = TurnPhase.ACTION;
    } else {
      this.phase = TurnPhase.BUY;
    }
  }

  public endTurn() {
    // TODO
    this.startTurn(this.turn + 1);
  }

  public player(): Player {
    return this.players.find((p) => p.id === this.currentPlayerId) as Player;
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

  public playerHasActions() {
    return this.player().hand.some((h) => this.cards[h].isAction);
  }

  public playerWins() {
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
