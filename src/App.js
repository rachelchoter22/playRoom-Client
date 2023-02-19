import './App.css';
import React, { useState, useEffect } from 'react';
// import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import BorrowedGame from './Customer'
import Login from './Login'
import Customer from './Customer'
import Customers from './viewAllCustomer'
import ViewC from './viewC'
import GameGallery from './Gallery'
import Manager from './Manager'
import SignIn from './SignIn'
import BorrowGame from './BorrowGame'

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <Routes>
        <Route path='/BorrowGame' element={< BorrowGame customer={user} />} />
        <Route path='/Gallery' element={<GameGallery customer={user} />} />
        <Route path='/viewAllCustomers' element={<  Customers  />} />
        <Route path='/Customer' element={<  Customer customer={user}/>} />
        <Route path='/Manager' element={<  Manager />} />
        <Route path='/Login' element={< Login setUser={setUser} />} />
        <Route path='/SignIn' element={< SignIn />} />
        <Route path='/ViewC' element={< ViewC customer={user}/>} />
        {/* ניתוב לדף התחלתי */}
        <Route path='/' element={<Navigate to="/Login" replace={true} />} />
      </Routes>
    </Router>
  )

  }