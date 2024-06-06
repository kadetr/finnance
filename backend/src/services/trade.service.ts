import { FinnHubTrade, FinnhubWSData } from "../models/trade.model";
import prisma from "../../prisma/prisma-client";

export const storeTrades = async (wsData: FinnhubWSData) => {
  const { data: trades, type } = wsData;

  if (type === "trade") {
    for (const item of trades) {
      await createTrade(item);
    }
  } else {
    return;
  }
};

export const createTrade = async (item: FinnHubTrade) => {
  const trade = await prisma.trade.create({
    data: {
      symbol: item.s,
      price: item.p,
      volume: item.v,
      tradeTime: new Date(item.t),
    },
  });
  return trade;
};
