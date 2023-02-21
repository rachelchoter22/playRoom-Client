import './App.scss';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './login/Login'
import Customer from './customers/Customer'
import Customers from './customers/viewAllCustomer'
import ViewC from './customers/viewC'
import GameGallery from './gallary/Gallery'
import Manager from './Manager'
import SignIn from './login/SignIn'
import BorrowGame from './gallary/BorrowGame'

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <Routes>
        <Route path='/gallary/BorrowGame' element={< BorrowGame customer={user} />} />
        <Route path='/gallary/Gallery' element={<GameGallery customer={user} />} />
        <Route path='/customers/viewAllCustomers' element={<  Customers  />} />
        <Route path='/customers/Customer' element={<  Customer customer={user}/>} />
        <Route path='/Manager' element={<  Manager />} />
        <Route path='/login/Login' element={< Login setUser={setUser} />} />
        <Route path='/login/SignIn' element={< SignIn />} />
        <Route path='/customers/ViewC' element={< ViewC customer={user}/>} />
        {/* ניתוב לדף התחלתי */}
        <Route path='/' element={<Navigate to="/login/Login" replace={true} />} />
      </Routes>
    </Router>
  )

  }