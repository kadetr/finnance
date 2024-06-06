export interface CandlestickData {
  id?: string
  open: number
  high: number
  low: number
  close: number
  volume?: number
  startTime?: Date
  endTime?: Date
}

export interface CandlestickObject {
  [key: string]: CandlestickData;
}

export const example = [
  ['Day', '', '', '', ''],
  ['Mon', 20, 28, 38, 45],
  ['Tue', 31, 38, 55, 66],
  ['Wed', 50, 55, 77, 80],
  ['Thu', 77, 77, 66, 50],
  ['Fri', 68, 66, 22, 15],
];