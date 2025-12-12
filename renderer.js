// Telepítés: npm install ws
const WebSocket = require('ws');

const PORT = 3000;
const ws = new WebSocket("ws://localhost:3000");


let clients = [];

wss.on('connection', (ws, req) => {
  const ip = req.socket.remoteAddress;   // kliens IP
  const port = req.socket.remotePort;    // kliens port
  console.log(`Új kliens csatlakozott: ${ip}:${port}`);

  clients.push({ ws, ip, port });

  ws.on('message', message => {
    let msg;
    try {
      msg = JSON.parse(message);
    } catch (e) {
      console.error("Nem JSON üzenet:", message);
      return;
    }

    if(msg.type === "chat"){
      // Adjunk hozzá IP-t és portot a payloadhoz
      msg.payload.ip = ip;
      msg.payload.port = port;

      // Küldjük minden kliensnek
      clients.forEach(c => {
        if(c.ws.readyState === WebSocket.OPEN){
          c.ws.send(JSON.stringify(msg));
        }
      });

      console.log(`Üzenet tőle ${ip}:${port}: ${msg.payload.text}`);
    }
  });

  ws.on('close', () => {
    console.log(`Kliens lecsatlakozott: ${ip}:${port}`);
    clients = clients.filter(c => c.ws !== ws);
  });
});

console.log(`WebSocket szerver fut a ${PORT}-as porton (publikus IP: 178.164.248.76)`);


