import prismaMock from "../prisma-mock";
import {
  aggregateCandlesticks,
  getCandlesticksData,
} from "../../src/services/candlestick.service";
import { CandlestickInput } from "../../src/models/candlestick.model";
import { FinnHubTrade } from "../../src/models/trade.model";

describe("CandlestickService", () => {
  describe("getCandlestickData", () => {
    test("should return candlestick data ", async () => {
      const csInput: CandlestickInput = {
        symbol: "LEGO",
        type: "minute",
        startTime: new Date("2024-03-13T08:00:00"),
        endTime: new Date("2024-03-13T09:00:00"),
      };

      const mockedResponse = [
        {
          id: "Tr0n",
          symbol: "LEGO",
          open: 1234,
          high: 1243,
          low: 1123,
          close: 1204,
          type: "minute",
          volume: 7,
          startTime: new Date("2024-03-13T08:00:00"),
          endTime: new Date("2024-03-13T09:00:00"),
        },
      ];

      prismaMock.candlestick.findMany.mockResolvedValue(mockedResponse);

      await expect(getCandlesticksData(csInput)).resolves.toEqual(
        mockedResponse,
      );
    });
  });
  // describe("aggregateCandlesticks", () => {
  //   test("should create candlestick ", async () => {
  //     const csInput: FinnHubTrade[] = [
  //       {
  //         s: "AAPL",
  //         p: 13,
  //         v: 2,
  //         t: new Date(new Date().setSeconds(0, 0)),
  //       },
  //       {
  //         s: "AAPL",
  //         p: 18,
  //         v: 12,
  //         t: new Date(new Date().setSeconds(5, 0)),
  //       },
  //       {
  //         s: "AAPL",
  //         p: 11,
  //         v: 22,
  //         t: new Date(new Date().setSeconds(8, 0)),
  //       },
  //       {
  //         s: "AAPL",
  //         p: 15,
  //         v: 32,
  //         t: new Date(new Date().setSeconds(11, 0)),
  //       },
  //       {
  //         s: "AAPL",
  //         p: 14,
  //         v: 42,
  //         t: new Date(new Date().setSeconds(47, 0)),
  //       },
  //     ];

  //     const mockedResponse = {
  //       id: "turing",
  //       symbol: "AAPL",
  //       open: 13,
  //       high: 18,
  //       low: 11,
  //       close: 14,
  //       volume: 42,
  //       startTime: new Date(new Date().setSeconds(0, 0)),
  //       endTime: new Date(
  //         new Date(new Date().getTime() + 60 * 1000).setSeconds(0, 0),
  //       ),
  //     };

  //     prismaMock.candlestick.create.mockResolvedValue(mockedResponse);

  //     await expect(aggregateCandlesticks(1)).resolves.toEqual(mockedResponse);
  //   });
  // });
});
