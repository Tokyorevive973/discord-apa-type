const ws = new WebSocket("ws://localhost:3000");

const messages = document.getElementById("messages");
const nameEl = document.getElementById("name");
const textEl = document.getElementById("text");
const sendBtn = document.getElementById("send");

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);

  if (msg.type === "chat") {
    const div = document.createElement("div");
    div.innerHTML = `<b>${msg.payload.name}:</b> ${msg.payload.text}`;
    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;
  }
};

sendBtn.onclick = () => {
  const payload = {
    name: nameEl.value || "Ismeretlen",
    text: textEl.value
  };

  ws.send(JSON.stringify({
    type: "chat",
    payload
  }));

  textEl.value = "";
};
