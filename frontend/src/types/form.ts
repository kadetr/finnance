export interface RegisterInputs {
  email: string;
  password: string;
  password2: string;
}

export interface LoginInputs {
  email: string;
  password: string;
}

export interface CandlestickInputs {
  symbol: string;
  startTime: Date;
  endTime: Date;
  token?: string;
}
