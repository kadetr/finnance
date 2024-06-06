import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { symbols } from '../types/symbols';
import { CandlestickInputs } from '../types/form';
import { useForm } from 'react-hook-form';

interface CandlestickRequestBarProps {
  submitHandler: (data: CandlestickInputs) => void;
  symbolUpdate: () => void;
}

const CandlestickRequestBar: React.FC<CandlestickRequestBarProps> = ({
  submitHandler,
  symbolUpdate,
}: CandlestickRequestBarProps) => {
  const serverStartTime = dayjs('2024-03-15T00:00');

  const [symbol, setSymbol] = useState<string>('');
  const [startTime, setStartTime] = useState<Dayjs | null>(
    dayjs(new Date().setHours(new Date().getHours() - 1))
  );
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs(new Date()));

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const sendRequest = React.useCallback(() => {
    if (startTime && endTime) {
      const st = dayjs(startTime).toDate();
      const et = dayjs(endTime).toDate();
      submitHandler({ symbol, startTime: st, endTime: et });
    }
  }, [symbol, startTime, endTime, submitHandler]);

  return (
    <>
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 2 },
          display: 'flex',
        }}
        autoComplete='off'
      >
        <FormControl sx={{ width: '10%', pt: 1 }}>
          <TextField
            select
            value={symbol}
            label='Symbol'
            {...register('symbolselect', { required: true })}
            onChange={(e) => {
              setSymbol(e.target.value);
              setError('symbolselect', { type: 'custom', message: '' });
              symbolUpdate();
            }}
          >
            {symbols.map((symbol, i) => (
              <MenuItem key={i} value={symbol}>
                {symbol}
              </MenuItem>
            ))}
          </TextField>
          {errors.symbolselect?.type === 'required' && (
            <Typography sx={{ color: 'red', fontSize: '12px' }} pl={2}>
              symbol required
            </Typography>
          )}
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={['DateTimePicker']}
            sx={{ width: '40%', pt: 1, height: 60 }}
          >
            <DateTimePicker
              label='Start Datetime'
              value={startTime}
              onChange={(v) => setStartTime(v)}
              views={['year', 'month', 'day', 'hours', 'minutes']}
              minDate={serverStartTime}
              disableFuture
            />
          </DemoContainer>
          <DemoContainer
            components={['DateTimePicker']}
            sx={{ width: '40%', pt: 1, height: 60 }}
          >
            <DateTimePicker
              label='End Datetime'
              value={endTime}
              onChange={(v) => setEndTime(v)}
              views={['year', 'month', 'day', 'hours', 'minutes']}
              disableFuture
            />
          </DemoContainer>
        </LocalizationProvider>
        <FormControl sx={{ width: '10%', pt: 1 }}>
          <Button
            variant='outlined'
            sx={{ height: 58, fontWeight: 700 }}
            onClick={handleSubmit(sendRequest)}
          >
            Submit
          </Button>
        </FormControl>
      </Box>
    </>
  );
};

export default CandlestickRequestBar;
