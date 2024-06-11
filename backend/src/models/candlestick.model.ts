import { UserProfile } from "./user.model";

export interface CandlestickData {
  id?: string;
  open: number;
  high: number;
  low: number;
  close: number;
  type?: string;
  volume?: number;
  startTime: Date;
  endTime?: Date;
}

export interface CandlestickInput {
  symbol: string;
  type: string;
  startTime: Date;
  endTime: Date;
  userInfo?: UserProfile;
}
