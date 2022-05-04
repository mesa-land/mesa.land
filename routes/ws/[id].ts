import { getGameById } from "../../data/game.ts";
import { getCookies, Handlers } from "../../deps.server.ts";
import { createGameFn } from "../../std/GameFunction.ts";
import { GameEvent } from "../../std/Game.ts";
import { logEvent, logGame } from "../../utils/log.ts";

const users = new Map<string, WebSocket>();

interface WSEvent extends Event {
  data?: any;
}

export const handler: Handlers = {
  GET(req, ctx) {
    if (req.headers.get("upgrade") != "websocket") {
      return new Response(null, { status: 501 });
    }

    const cookies = getCookies(req.headers);
    const playerId = cookies["mesaPlayer"] || crypto.randomUUID();
    const { id: gameId } = ctx.params;
    const { socket: ws, response } = Deno.upgradeWebSocket(req);

    users.set(playerId, ws);
    let game = getGameById(gameId);

    // Join game when user connects
    ws.onopen = () => {
      console.log(`[${gameId}] ${playerId}: connected`);
      createGameFn(game).join(playerId);
      game.connectedPlayerId = playerId;
      logGame(game);
      ws.send(JSON.stringify({ game }));
      // update state for other players too
      users.forEach((user, key) => {
        if (user !== ws) {
          game.connectedPlayerId = key;
          user.send(JSON.stringify({ game }));
        }
      });
    };

    ws.onmessage = (e: WSEvent) => {
      const mesaEvent = JSON.parse(e.data) as GameEvent;
      logEvent(game, mesaEvent);
      const fn = createGameFn(game);
      const transform = fn[mesaEvent.GameFn];
      game = transform(mesaEvent.GameFnArgs[0], mesaEvent.GameFnArgs[1]);
      game.connectedPlayerId = playerId;
      logGame(game);
      ws.send(JSON.stringify({ game }));
      // update state for other players too
      users.forEach((user, key) => {
        if (user !== ws) {
          game.connectedPlayerId = key;
          user.send(JSON.stringify({ game }));
        }
      });
    };

    return response;
  },
};
