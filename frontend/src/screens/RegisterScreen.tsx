import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { signup } from '../store/features/userSlice';
import { SubmitHandler } from 'react-hook-form';
import { RegisterInputs } from '../types/form';
import { useAppDispatch, useAppSelector } from '../store/store';
import RegisterForm from '../components/auth/Register';
import { User } from '../types/user';

const RegisterScreen = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { userInfo } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler: SubmitHandler<RegisterInputs> = (newUser: User) => {
    dispatch(signup(newUser));
    navigate('/');
  };
  return <RegisterForm submitHandler={submitHandler} />;
};

export default RegisterScreen;
