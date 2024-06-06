import prismaMock from '../prisma-mock';
import { createTrade } from '../../src/services/trade.service';
import { FinnHubTrade } from '../../src/models/trade.model';

describe('TradeService', () => {
  describe('createTrade', () => {
    test('should create new trade ', async () => {
      // Given
      const trades: FinnHubTrade ={
          s: "XYZA",
          p: 1000,
          v: 26,
          t: new Date('2024-06-02T10:30:00')
      };

      const mockedResponse = {
        id: "victoria",
        symbol: "XYZA",
        price: 1000,
        volume: 26,
        tradeTime: new Date('2024-06-02T10:30:00')
      };

      // When
      prismaMock.trade.create.mockResolvedValue(mockedResponse);

      // Then
      await expect(createTrade(trades)).resolves.toHaveProperty("id");
    });
  });
});
