import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterScreen from './screens/RegisterScreen';
import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SymbolScreen from './screens/SymbolScreen';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/stocksymbol' element={<SymbolScreen />} />
        <Route path='/' element={<HomeScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
