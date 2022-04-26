import { CardId, CardState } from "./card.ts";
import { Player } from "./player.ts";
import { MesaEvent, MesaEventType } from "./events.ts";

export class Game {
  // Adds a new event to the event log and computes state changes
  public publish(event: MesaEvent) {
    if (event.type === MesaEventType.PLAY) {
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

      //

      // if (remainingDeck < 5) {
      //   p.deck = shuffle(p.discard);
      //   p.discard = [];
      //   p.hand.push(...draw(Math.min(remainingDeck, 5), p.deck));
      // }
      ///
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
