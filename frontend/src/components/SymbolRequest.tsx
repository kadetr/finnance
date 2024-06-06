import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import { symbols } from '../types/symbols';
import { useForm } from 'react-hook-form';

interface SymbolRequestProps {
  submitHandler: (symbol: string) => void;
  symbolUpdate: () => void;
}

const SymbolRequest: React.FC<SymbolRequestProps> = ({
  submitHandler,
  symbolUpdate,
}: SymbolRequestProps) => {
  const [symbol, setSymbol] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const sendRequest = React.useCallback(() => {
    submitHandler(symbol);
  }, [symbol, submitHandler]);

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

export default SymbolRequest;
