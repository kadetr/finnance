import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { signup } from '../store/features/userSlice';
import { SubmitHandler } from 'react-hook-form';
import { RegisterInputs } from '../types/form';
import { useAppDispatch, useAppSelector } from '../store/store';
import RegisterForm from '../components/auth/Register';

const RegisterScreen = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { userInfo } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler: SubmitHandler<RegisterInputs> = (newUser) => {
    const { email, password } = newUser;
    dispatch(signup({ email, password }));
    navigate('/');
  };
  return <RegisterForm submitHandler={submitHandler} />;
};

export default RegisterScreen;
