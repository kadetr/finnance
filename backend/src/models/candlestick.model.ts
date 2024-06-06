import { UserProfile } from "./user.model";

export interface CandlestickData {
  id?: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
  startTime: Date;
  endTime?: Date;
}

export interface CandlestickInput {
  symbol: string
  startTime: Date
  endTime: Date
  userInfo?: UserProfile
}