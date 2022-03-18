window.addEventListener("load", () => {
  const tableElement = document.getElementById("table-component");
  let ws = new WebSocket("ws://" + location.host + "/ws");

  ws.onmessage = (e) => console.log("ws:", e);

  ws.onopen = (e) => {
    console.log("mesa: ws connected");
    ws.send(JSON.stringify({ type: "join" }));
  };

  tableElement?.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target.dataset.cardEvent) {
      ws.send(
        JSON.stringify({
          type: e.target.dataset.eventType,
          id: e.target.dataset.cardId,
        }),
      );
    }
  });
});
