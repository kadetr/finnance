import { WebSocket, WebSocketServer } from "ws";
import prisma from "../../prisma/prisma-client";
import { symbols } from "../utils/types";
import { v4 as uuidv4 } from "uuid";
import { WSRequest, authenticated } from "../utils/ws.utils";

export const userWSServer = new WebSocketServer({
  port: Number(process.env.WS_PORT),
});

const clients: Map<string, WebSocket> = new Map();

userWSServer.on("connection", (ws: WebSocket) => {
  ws.on("error", console.error);

  let isAuthenticated = false;
  let clientId: string;

  ws.on("message", (message: string) => {
    const msg: WSRequest = JSON.parse(message);

    if (msg.symbol && !symbols.includes(msg.symbol)) {
      ws.send("missing/unknown symbol");
      return;
    }

    if (msg.type === "authenticate" && msg.token) {
      isAuthenticated = authenticated(msg.token);
      if (isAuthenticated) {
        clientId = uuidv4();
        clients.set(clientId, ws);
        ws.send(JSON.stringify({ type: "authenticated", clientId }));
      } else {
        ws.send(JSON.stringify({ type: "error", message: "Invalid token" }));
        ws.close();
      }
    } else if (isAuthenticated) {
      if (msg.type === "subscribe") {
        // Handle subscription logic here if needed
        ws.send(JSON.stringify({ type: "subscribed", clientId }));
      }
    } else {
      ws.send(JSON.stringify({ type: "error", message: "Not authenticated" }));
      ws.close();
    }

    const sendTradeData = async () => {
      const symbol = msg.symbol;
      const tradeData = await prisma.trade.findMany({
        where: {
          symbol,
        },
        orderBy: { tradeTime: "desc" },
        take: 5,
      });

      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(tradeData));
        }
      });
    };

    setInterval(sendTradeData, 5000);
  });
});
