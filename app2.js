const WebSocketServer = require("ws").Server;
const CSVToJSON = require("csvtojson");

const wss = new WebSocketServer({ port: 5002 });

console.log("Serveur WebSocket actif : ws://localhost:5002");

wss.on("connection", function (ws) {
  console.log("Client connecté");

  CSVToJSON()
    .fromFile("temp.csv")
    .then((data) => {

      let i = 0;

      function sendData() {
        if (i < data.length) {
          if (ws.readyState === 1) {
            ws.send(JSON.stringify(data[i]));
            i++;
            setTimeout(sendData, 3000);
          }
        }
      }

      sendData();

      ws.on("close", () => {
        console.log("Client déconnecté");
      });

    })
    .catch((err) => {
      console.log("Erreur CSV:", err);
    });
});