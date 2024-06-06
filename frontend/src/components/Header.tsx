import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from '../store/store';
import { logout } from '../store/features/userSlice';

export default function Header() {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.user);
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Finnance
          </Typography>
          {!userInfo ? (
            <>
              <Button color='inherit' href='/register'>
                Register
              </Button>
              <Button color='inherit' href='/'>
                Login
              </Button>
            </>
          ) : (
            <>
              <Button color='inherit' href='/stocksymbol'>
                Symbol
              </Button>
              <Button color='inherit' href='/'>
                Candlestick
              </Button>
              <Typography sx={{ ml: 6, mr: 1 }}>
                {' '}
                {userInfo.user.email}
              </Typography>
              <Button
                color='inherit'
                sx={{ textDecoration: 'underline', textTransform: 'lowercase' }}
                onClick={logoutHandler}
                href='/login'
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
