import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import { UserData } from '../types/user';
import SymbolRequest from '../components/SymbolRequest';
import { Trade } from '../types/trade';
import SymbolDataTable from '../components/SymbolDataTable';

export const options = {
  legend: 'none',
};

const SymbolScreen = () => {
  const navigate = useNavigate();

  const { userInfo } = useAppSelector((state) => state.user);

  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [wsData, setwsData] = useState<Trade | null>();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  const symbolUpdate = () => {
    setDataLoaded(false);
  };

  const submitHandler = (symbol: string) => {
    let u: UserData;
    if (userInfo) u = JSON.parse(JSON.stringify(userInfo)).user;

    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('WebSocket connection opened');
      const subscribeRequest = {
        token: 'Bearer ' + u?.token,
        type: 'authenticate',
        symbol,
      };
      ws.send(JSON.stringify(subscribeRequest));
    };

    ws.onmessage = (event) => {
      let data: Trade[] = Array.from(JSON.parse(event.data));

      setwsData(data[0] as Trade);

      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };
      return () => ws.close();
    };
  };

  return (
    <>
      <SymbolRequest
        submitHandler={submitHandler}
        symbolUpdate={symbolUpdate}
      />

      <SymbolDataTable wsData={wsData} />
    </>
  );
};

export default SymbolScreen;
