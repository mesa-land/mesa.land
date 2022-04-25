import { getGameById } from "../../data/game.ts";
import { getCookies, Handlers } from "../../deps.server.ts";
import { MesaEvent } from "../../std/events.ts";

const users = new Map<string, WebSocket>();

interface WSEvent extends Event {
  data?: MesaEvent;
}

export const handler: Handlers = {
  GET(req, ctx) {
    if (req.headers.get("upgrade") != "websocket") {
      return new Response(null, { status: 501 });
    }

    const cookies = getCookies(req.headers);
    const playerId = cookies["mesaPlayer"];
    const { id: gameId } = ctx.params;
    const { socket: ws, response } = Deno.upgradeWebSocket(req);

    users.set(playerId, ws);
    const game = getGameById(gameId);

    // Join game when user connects
    ws.onopen = () => {
      console.log(`[${gameId}] ${playerId}: connected`);
      game.join(playerId);
      game.connectedPlayerId = playerId;
      ws.send(JSON.stringify({ game, playerId }));
      // update state for other players too
      users.forEach((user, key) => {
        if (user !== ws) {
          game.connectedPlayerId = key;
          user.send(JSON.stringify({ game, playerId: key }));
        }
      });
    };

    ws.onmessage = (e: WSEvent) => {
      console.log(`[${gameId}] ${playerId}: ${e.data}`);
      const mesaEvent = e.data as MesaEvent;
      mesaEvent.playerId = playerId;
      game.publish(mesaEvent);
      game.connectedPlayerId = playerId;
      ws.send(JSON.stringify({ game, playerId }));
      // update state for other players too
      users.forEach((user, key) => {
        if (user !== ws) {
          game.connectedPlayerId = key;
          user.send(JSON.stringify({ game, playerId: key }));
        }
      });
    };

    return response;
  },
};
