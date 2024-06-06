import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import  UserSlice from "./features/userSlice";
import CandlestickSlice from "./features/dataSlice";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    candlestick: CandlestickSlice
  },
});
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;