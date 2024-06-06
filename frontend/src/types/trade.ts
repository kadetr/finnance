export interface Trade {
  id?: string;
  symbol: string;
  price: number;
  volume: number;
  tradeTime: string;
}

export interface TradeItem {
  symbol: string;
  price: number;
  volume: number;
  time: string;
}
