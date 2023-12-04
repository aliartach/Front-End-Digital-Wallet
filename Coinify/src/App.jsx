import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./client side/pages/Home/HomePage.jsx";
import Registerpage from "./client side/pages/RegisterPage/Registerpage.jsx";
import UserHomePage from "./client side/pages/UserHomePage/userHomePage.jsx";
import AdminHomePage from "./admin side/Pages/adminHomePage/adminHomePage.jsx";
import AdminPromotionsPage from "./admin side/Pages/adminPromotionsPage/adminPromotionsPage.jsx";
import AdminUsersPage from "./admin side/Pages/adminUsersPage/adminUsersPage.jsx";
import AdminTransactionsPage from "./admin side/Pages/adminTransactionsPage/adminTransactionsPage.jsx";
import NotFoundPage from "./admin side/Pages/NotFoundPage/notFoundPage.jsx";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="pages">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Registerpage" element={<Registerpage />} />
          <Route path="/userhomepage" element={<UserHomePage />} />

          <Route path="/adminHomepage" element={<AdminHomePage />} />
          <Route path="/adminUserspage" element={<AdminUsersPage />} />
          <Route path="/adminPromotionspage" element={<AdminPromotionsPage />}/>
          <Route path="/adminTransactionspage" element={<AdminTransactionsPage />}/>

          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
