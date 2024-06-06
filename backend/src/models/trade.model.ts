export interface Trade {
  id?: string;
  symbol: string;
  price: number;
  volume: number;
  tradeTime: Date;
}

export interface FinnHubTrade {
  id?: string;
  s: string;
  p: number;
  v: number;
  t: Date;
}

export interface FinnhubWSData {
  type: string;
  data: FinnHubTrade[];
}
