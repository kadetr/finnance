import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { Credentials, User, UserInfo } from '../../types/user';

const baseURL = process.env.REACT_APP_API_URL;

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(JSON.stringify(localStorage.getItem('userInfo') || ''))
  : null;

interface UserState {
  userInfo: UserInfo | null;
  profile: User | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UserState = {
  loading: false,
  userInfo: JSON.parse(userInfo),
  profile: null,
  error: null,
  success: false,
};

export const signup = createAsyncThunk(
  'user/register',
  async (user: User, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data }: AxiosResponse = await axios.post(
        `${baseURL}/users/register`,
        user,
        config
      );
      localStorage.setItem('userInfo', JSON.stringify(data));
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

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: Credentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data }: AxiosResponse = await axios.post(
        `${baseURL}/users/login`,
        { email, password },
        config
      );
      localStorage.setItem('userInfo', JSON.stringify(data));
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

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userInfo');
      state.loading = false;
      state.userInfo = null;
      state.profile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    });
    builder.addCase(signup.rejected, (state, { payload }) => {
      state.loading = false;
    });
  },
});

export default UserSlice.reducer;
export const { logout } = UserSlice.actions;
