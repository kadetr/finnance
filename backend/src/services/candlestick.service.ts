import prisma from "../../prisma/prisma-client";
import { CandlestickData, CandlestickInput } from "../models/candlestick.model";
import { Trade } from "../models/trade.model";

export const aggregateCandlesticks = async (duration: string) => {
  let now = new Date();
  let oneTimeAgo = now;

  if (duration === "minute") {
    now = new Date(new Date().setSeconds(0, 0));
    oneTimeAgo = new Date(new Date(now.getTime() - 60 * 1000).setSeconds(0, 0));
  }
  if (duration === "hour") {
    now = new Date(new Date().setMinutes(0, 0, 0));
    oneTimeAgo = new Date(
      new Date(now.getTime() - 60 * 60 * 1000).setMinutes(0, 0, 0),
    );
  }

  const lastCS = await prisma.candlestick.findFirst({
    where: {
      endTime: now,
    },
  });

  if (lastCS) return;

  const trades = await prisma.trade.findMany({
    where: {
      tradeTime: {
        gte: oneTimeAgo,
        lte: now,
      },
    },
    orderBy: { tradeTime: "asc" },
  });

  if (trades.length === 0) return;

  type TradesBySymbol = {
    [symbol: string]: Trade[];
  };

  // Group trades by symbol
  const tradesBySymbol: TradesBySymbol = trades.reduce(
    (acc: TradesBySymbol, trade: Trade) => {
      if (acc[trade.symbol] === null || acc[trade.symbol] === undefined)
        acc[trade.symbol] = [];
      acc[trade.symbol].push(trade);
      return acc;
    },
    {},
  );

  // Process each symbol
  for (const symbol in tradesBySymbol) {
    if (tradesBySymbol.hasOwnProperty(symbol)) {
      const symbolTrades = tradesBySymbol[symbol];
      const open = symbolTrades[0].price;
      let high = symbolTrades[0].price;
      let low = symbolTrades[0].price;
      const close = symbolTrades[symbolTrades.length - 1].price;
      let volume = 0;

      symbolTrades.forEach((trade) => {
        if (trade.price > high) high = trade.price;
        if (trade.price < low) low = trade.price;
        volume += trade.volume;
      });

      await prisma.candlestick.create({
        data: {
          symbol,
          open,
          high,
          low,
          close,
          type: duration,
          volume,
          startTime: oneTimeAgo,
          endTime: now,
        },
      });
    }
  }
};

export const getCandlesticksData = async (
  candlestick: CandlestickInput,
): Promise<CandlestickData[]> => {
  const csData = await prisma.candlestick.findMany({
    where: {
      symbol: candlestick.symbol,
      type: candlestick.type,
      startTime: { gte: candlestick.startTime, lt: candlestick.endTime },
    },
    select: {
      startTime: true,
      open: true,
      high: true,
      low: true,
      close: true,
    },
  });
  // console.log(csData);
  return [...csData];
};
