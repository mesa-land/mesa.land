/** @jsx h */
import { h, IS_BROWSER, useState } from "../deps.client.ts";
import { MesaEvent } from "../std/events.ts";

let ws: WebSocket;

export default function Connection(
  props: { children: any; game: any },
) {
  if (!IS_BROWSER) {
    return props.children(props.game, publishEvent);
  }
  const [{ game }, setState] = useState<{ game?: any }>(props.game);

  if (!ws) {
    ws = connect(props.game.id);
    ws.onmessage = onWebSocketMessage(setState);
  }

  return props.children(game ? game : props.game, publishEvent);
}

function connect(gameId: string) {
  const address = location.host === "mesa.land"
    ? `wss://mesa.land/ws/${gameId}`
    : "ws://" + location.host + `/ws/${gameId}`;
  ws = new WebSocket(address);

  ws.onopen = () => {
    console.log("mesa: ws connected");
  };

  return ws;
}

function onWebSocketMessage(setState: (state: any) => void) {
  return (e: MessageEvent) => {
    console.log("ws:", e);
    const event: { state: any; css: Array<string>; playerId: string } = JSON
      .parse(e.data);

    if (event.playerId) {
      document.cookie = `mesaPlayer=${event.playerId};path=/`;
    }

    updateCSSRules(event.css);
    setState({ game: event.state });
  };
}

function publishEvent(e: MesaEvent) {
  if (e.type) {
    console.log(e);

    ws.send(
      JSON.stringify(e),
    );
  }
}

function updateCSSRules(css: Array<string>) {
  // Get the current applied rules
  const cssRules = document.styleSheets[0].cssRules;
  for (let i = 0; i < css.length; i++) {
    const rule = css[i];
    let match = false;
    for (let j = 0; j < cssRules.length; j++) {
      const existingRule = cssRules[j];
      if (existingRule instanceof CSSStyleRule) {
        const selectorStart = existingRule.selectorText + "{";
        // Check if the rule already exists. If so, skip it.
        if (rule.startsWith(selectorStart)) {
          match = true;
          continue;
        }
      }
    }
    // If rule is not already applied, insert it.
    if (!match) {
      document.styleSheets[0].insertRule(rule);
    }
  }
}
