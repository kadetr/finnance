import { WebSocket } from "ws";
import { FinnhubWSData } from "../models/trade.model";
import { storeTrades } from "../services/trade.service";
import { symbols } from "../utils/types";

// Connect to Finnhub WebSocket
export const finnhubWSSubscriber = new WebSocket(
  `wss://ws.finnhub.io?token=${process.env.FINNHUB_API_KEY}`,
);

finnhubWSSubscriber.on("open", () => {
  symbols.forEach((symbol: string) => {
    finnhubWSSubscriber.send(JSON.stringify({ type: "subscribe", symbol }));
  });
});

finnhubWSSubscriber.on("message", (data: string) => {
  const wsData: FinnhubWSData = JSON.parse(data);
  storeTrades(wsData);
});

finnhubWSSubscriber.on("close", () => {
  console.log("Disconnected from Finnhub WebSocket");
});

finnhubWSSubscriber.on("error", (error) => {
  console.error("Finnhub WebSocket error:", error);
});
