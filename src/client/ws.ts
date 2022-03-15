let ws = new WebSocket("ws://" + location.host + "/ws");
ws.onmessage = (e) => console.log("ws:", e);

ws.onopen = (e) => {
  console.log("mesa: ws connected");
  ws.send(JSON.stringify({ type: "join" }));
};
