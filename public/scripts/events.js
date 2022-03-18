// @ts-nocheck
window.addEventListener("load", () => {
  let ws = new WebSocket("ws://" + location.host + "/ws");

  const onClick = e => {
    if (e.target.dataset.eventType) {
      const eventData = {
        type: e.target.dataset.eventType,
        cardId: e.target.dataset.cardId
      };
      console.log(e.target, eventData);
      ws.send(JSON.stringify(eventData));
    }
  };

  ws.onmessage = e => {
    console.log("ws:", e);
    const event = JSON.parse(e.data);
    console.log("replace html", event.html);
    const scrollTop = document.getElementById("table-component")?.scrollTop;
    const div = document.createElement("div");
    div.innerHTML = event.html;
    document.getElementById("table-page")?.replaceWith(div.firstChild);
    document.getElementById("table-component")?.scroll({
      top: scrollTop
    });
    console.log("replace style", event.css);
    const cssRules = document.styleSheets[0].cssRules;

    for (let i = 0; i < event.css.length; i++) {
      const rule = event.css[i];
      console.log("check rule", rule);
      let match = false;

      for (let j = 0; j < cssRules.length; j++) {
        const existingRule = cssRules[j];

        if (existingRule instanceof CSSStyleRule) {
          const selectorStart = existingRule.selectorText + "{";

          if (rule.startsWith(selectorStart)) {
            match = true;
            continue;
          }
        }
      }

      if (!match) {
        console.log("inserting rule", rule);
        document.styleSheets[0].insertRule(rule);
      }
    }

    document.getElementById("table-component")?.addEventListener("click", onClick);
  };

  ws.onopen = e => {
    console.log("mesa: ws connected");
  };
});