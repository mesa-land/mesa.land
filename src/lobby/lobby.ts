import { CardState } from "../std/card.ts";
import { Game } from "../std/game.ts";
import { CoinCard } from "../x/alpha/coin.ts";
import { WinCard } from "../x/alpha/win.ts";
import { ClickFarmBoost } from "../x/alpha/actions/click-farm-boost.ts";
import { SeedRound } from "../x/alpha/actions/seed-round.ts";
import { parseMesaEvent } from "../std/events.ts";
import { renderTable } from "../pages/_app.tsx";

const alphaGameCards: Set<CardState> = new Set([
  CoinCard(1),
  CoinCard(2),
  CoinCard(3),
  WinCard(1),
  WinCard(3),
  WinCard(6),
  ClickFarmBoost,
  SeedRound,
]);

const users = new Map<string, WebSocket>();
const games = new Map<string, Game>();

export function getGameById(id: string) {
  let game = games.get(id);
  if (game) {
    return game;
  }
  game = new Game(id, alphaGameCards, 2);
  games.set(id, game);
  return game;
}

interface WSEvent extends Event {
  data?: any;
}

export function handleSocket(
  ws: WebSocket,
  gameId: string,
  playerId: string = crypto.randomUUID(),
) {
  // Register user connection
  users.set(playerId, ws);
  const game = getGameById(gameId);

  // Join game when user connects
  ws.onopen = (e: Event) => {
    console.log(`[${gameId}] ${playerId}: connected`);
    game.join(playerId);
    const { html, css } = renderTable(game);
    ws.send(JSON.stringify({ html, css, playerId }));
  };

  ws.onmessage = (e: WSEvent) => {
    console.log(`[${gameId}] ${playerId}: ${e.data}`);
    const mesaEvent = parseMesaEvent(e.data);
    mesaEvent.playerId = playerId;
    game.publish(mesaEvent);
    const { html, css } = renderTable(game);
    ws.send(JSON.stringify({ html, css, playerId }));
  };
}

declare global {
  interface Crypto {
    randomUUID: () => string;
  }
}
