import React from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoginInputs, RegisterInputs } from '../../types/form';
import { useState } from 'react';

interface RegisterFormProps {
  submitHandler: (data: RegisterInputs) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  submitHandler,
}: RegisterFormProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterInputs>();

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
        <TextField
          id='password2'
          type='password'
          label='re-enter password'
          value={password2}
          {...register('password', {
            required: true,
            validate: (val: string) => {
              if (watch('password') !== val) {
                return 'unmatched';
              }
            },
          })}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword2(event.target.value);
          }}
        />
        {errors.password?.type === 'required' && (
          <Typography sx={{ color: 'red', fontSize: '12px' }} pl={1}>
            password required
          </Typography>
        )}
        {errors.password?.message === 'unmatched' && (
          <Typography sx={{ color: 'red', fontSize: '12px' }} pl={1}>
            passwords do not match
          </Typography>
        )}
        <Button variant='outlined' onClick={handleSubmit(submitHandler)}>
          Register
        </Button>
      </Stack>
    </div>
  );
};

export default RegisterForm;
