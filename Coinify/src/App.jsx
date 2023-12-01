import React,{ useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from  './client side/pages/Home/HomePage.jsx'
import Registerpage from './client side/pages/RegisterPage/Registerpage.jsx'
import Navbar from './client side/components/Navbar/Navbar.jsx';
import UserHomePage from './client side/pages/userHomePage'
import './App.css'


function App() {
  // function ScrollToTop() {
  //   useEffect(() => {
  //     window.scrollTo(0, 0);
  //   }, []);
  
  //   return null;}
  return (
  
    <BrowserRouter>
     
      <ScrollToTop />
      <div className='pages'>
      <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/Registerpage' element={<Registerpage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/userhomepage' element={<UserHomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;