import prismaMock from '../prisma-mock';
import { getCandlesticksData } from '../../src/services/candlestick.service';
import { CandlestickInput } from '../../src/models/candlestick.model';

describe('CandlestickService', () => {
  describe('getCandlestickData', () => {
    test('should return candlestick data ', async () => {
      // Given
      const csInput: CandlestickInput ={
         symbol: "LEGO",
         startTime: new Date("2024-03-13T08:00:00"),
         endTime: new Date("2024-03-13T09:00:00")
      };

      const mockedResponse =[ {
        id: "Tr0n",
        symbol: "LEGO",
        open: 1234,
        high: 1243,
        low: 1123,
        close: 1204,
        volume: 7,
        startTime: new Date("2024-03-13T08:00:00"),
        endTime: new Date("2024-03-13T09:00:00")
      }];

      // When
      prismaMock.candlestick.findMany.mockResolvedValue(mockedResponse);

      // Then
      await expect(getCandlesticksData(csInput)).resolves.toEqual(mockedResponse)
    });
  });
});
