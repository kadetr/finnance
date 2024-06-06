import React from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoginInputs } from '../../types/form';
import { useState } from 'react';

interface LoginFormProps {
  submitHandler: (data: LoginInputs) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  submitHandler,
}: LoginFormProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  return (
    <div
      className='row bg-secondary'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30rem',
      }}
    >
      <Stack
        component='form'
        sx={{
          width: '25ch',
        }}
        spacing={2}
        noValidate
        autoComplete='off'
      >
        <TextField
          id='email'
          label='enter email'
          value={email}
          {...register('email', { required: true, maxLength: 50 })}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email?.type === 'required' && (
          <Typography sx={{ color: 'red', fontSize: '12px' }} pl={1}>
            email required
          </Typography>
        )}
        <TextField
          id='password'
          type='password'
          label='enter password'
          value={password}
          {...register('password', { required: true })}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
        />
        {errors.password?.type === 'required' && (
          <Typography sx={{ color: 'red', fontSize: '12px' }} pl={1}>
            password required
          </Typography>
        )}
        <Button variant='outlined' onClick={handleSubmit(submitHandler)}>
          Login
        </Button>
      </Stack>
    </div>
  );
};

export default LoginForm;
