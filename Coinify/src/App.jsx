import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./client side/pages/Home/HomePage.jsx";
import Registerpage from "./client side/pages/RegisterPage/Registerpage.jsx";
import Navbar from "./client side/components/Navbar/Navbar.jsx";
import UserHomePage from "./client side/pages/userHomePage.jsx";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="pages">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Registerpage" element={<Registerpage />} />
          <Route path="/userhomepage" element={<UserHomePage />} />
          {/* <Route path="/*" element={<Notfound />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
