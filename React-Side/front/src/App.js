import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './login/LoginPage';
import DashBoardPage from './dashboard/DashboardPage';

import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './Routes/Home';
import Profile from './Routes/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>

        <Route element={<DashBoardPage />}>  
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile/>} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
