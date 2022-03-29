window.addEventListener("load", () => {
  const path = location.pathname.split("/");
  if (path[1] !== "m" || !path[2]) {
    return;
  }

  const gameId = path[2];
  let address = location.host === "mesa.land"
    ? `wss://mesa.land/ws/${gameId}`
    : "ws://" + location.host + `/ws/${gameId}`;
  let ws = new WebSocket(address);

  const onClick = (e: any) => {
    if (e.target.dataset.eventType) {
      const eventData = {
        type: e.target.dataset.eventType,
        cardId: e.target.dataset.cardId,
      };

      console.log(e.target, eventData);

      ws.send(
        JSON.stringify(eventData),
      );
    }
  };

  ws.onmessage = (e) => {
    console.log("ws:", e);
    const event: { html: string; css: Array<string>; playerId: string } = JSON
      .parse(e.data);

    if (event.playerId) {
      document.cookie = `mesaPlayer=${event.playerId};path=/`;
    }
    const scrollTop = document.getElementById("table-component")?.scrollTop;
    const div = document.createElement("div");
    div.innerHTML = event.html;
    document.getElementById("table-page")?.replaceWith(div.firstChild!);
    document.getElementById("table-component")?.scroll({ top: scrollTop });

    // Get the current applied rules
    const cssRules = document.styleSheets[0].cssRules;
    for (let i = 0; i < event.css.length; i++) {
      const rule = event.css[i];
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

    // Refresh event listener on replaced element
    document.getElementById("table-component")?.addEventListener(
      "click",
      onClick,
    );
  };

  ws.onopen = (e) => {
    console.log("mesa: ws connected");
  };
});
