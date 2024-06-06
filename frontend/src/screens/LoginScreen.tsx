import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/store';

import { login } from '../store/features/userSlice';
import { SubmitHandler } from 'react-hook-form';
import { LoginInputs } from '../types/form';
import LoginForm from '../components/auth/Login';

const LoginScreen = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { userInfo } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler: SubmitHandler<LoginInputs> = (newUser) => {
    const { email, password } = newUser;
    dispatch(login({ email, password }));
    navigate('/');
  };
  return (
    <>
      <LoginForm submitHandler={submitHandler} />
    </>
  );
};

export default LoginScreen;
