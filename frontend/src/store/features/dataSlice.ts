import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CandlestickInputs } from '../../types/form';
import { CandlestickData } from '../../types/candlestick';
import { UserData } from '../../types/user';

const baseURL = process.env.REACT_APP_API_URL;

interface CandlestickState {
  candlesticks: CandlestickData[];
  loading: Boolean;
  error: string | null;
  success: Boolean;
}

const initialState: CandlestickState = {
  loading: false,
  candlesticks: [],
  error: null,
  success: false,
};

let u: UserData;

export const getCandlestickData = createAsyncThunk(
  '/candlestick/get',
  async (inputs: CandlestickInputs, { rejectWithValue }) => {
    const { symbol, startTime, endTime, type } = inputs;
    const userInfo = localStorage.getItem('userInfo');

    if (userInfo) u = JSON.parse(userInfo).user;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${u.token}`,
          'Content-Type': 'application/json',
        },
        params: {
          symbol,
          startTime,
          endTime,
          type,
        },
      };
      const { data } = await axios.get(
        `${baseURL}/api/candlesticks/type/${type}/symbol/${symbol}/startTime/${startTime}/endTime/${endTime}`,
        config
      );
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const CandlestickSlice = createSlice({
  name: 'candlestick',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCandlestickData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCandlestickData.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.candlesticks = payload;
    });
    builder.addCase(getCandlestickData.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });
  },
});

export default CandlestickSlice.reducer;
