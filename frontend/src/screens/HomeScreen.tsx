import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { CandlestickInputs } from '../types/form';
import { getCandlestickData } from '../store/features/dataSlice';
import CandlestickRequestBar from '../components/CandlestickRequestBar';
import dayjs from 'dayjs';
import { CandlestickData } from '../types/candlestick';
import CandlestickChart from '../components/CandlestickChart';
import { Typography } from '@mui/material';

export const options = {
  legend: 'none',
};

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userInfo } = useAppSelector((state) => state.user);

  const [csData, setcsData] = useState<Array<number | Date | string>[]>([
    ['time', 'low', 'open', 'close', 'high'],
  ]);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  const symbolUpdate = () => {
    setDataLoaded(false);
  };

  const submitHandler = (candlestickInputs: CandlestickInputs) => {
    const { symbol, startTime, endTime, type } = candlestickInputs;
    let s = symbol;
    const st = new Date(dayjs(startTime).toDate().setSeconds(0));
    const et = new Date(dayjs(endTime).toDate().setSeconds(0));
    if (symbol === 'BINANCE') s = 'BINANCE:BTCUSDT';
    userInfo &&
      dispatch(
        getCandlestickData({ symbol: s, startTime: st, endTime: et, type })
      )
        .then((data) => {
          const csArray: CandlestickData[] = data.payload.candlestick;
          let chartData: any[] = [['time', 'low', 'open', 'close', 'high']];

          csArray.forEach((x: CandlestickData) => {
            let d = x.startTime?.toString().split('T')[1].slice(0, 5);
            chartData.push([d, x.low, x.open, x.close, x.high]);
          });
          setcsData(chartData);
          setDataLoaded(true);
        })
        .catch((error) => console.log(error));
  };

  return (
    <>
      <CandlestickRequestBar
        submitHandler={submitHandler}
        symbolUpdate={symbolUpdate}
      />

      {csData.length > 1 ? (
        <CandlestickChart csData={csData} />
      ) : dataLoaded ? (
        <Typography sx={{ fontSize: 32, textAlign: 'center' }}>
          not found!
        </Typography>
      ) : (
        <></>
      )}
    </>
  );
};

export default HomeScreen;
