import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../client side/pages/Home/HomePage.jsx";
import Registerpage from "../client side/pages/RegisterPage/Registerpage.jsx";
import Merchanthomepage from "../client side/pages/Merchant/merchanthomepage/merchanthomepage.jsx";
import UserHomePage from "../client side/pages/userHomePage.jsx";
import AdminHomePage from "../admin side/Pages/adminHomePage/adminHomePage.jsx";
import AdminPromotionsPage from "../admin side/Pages/adminPromotionsPage/adminPromotionsPage.jsx";
import AdminUsersPage from "../admin side/Pages/adminUsersPage/adminUsersPage.jsx";
import AdminTransactionsPage from "../admin side/Pages/adminTransactionsPage/adminTransactionsPage.jsx";
import NotFoundPage from "../admin side/Pages/NotFoundPage/notFoundPage.jsx";
import ProtectedRoute from "./ProtectedRoutes";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Registerpage" element={<Registerpage />} />

      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route path="/userhomepage/" element={<UserHomePage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/adminHomepage/" element={<AdminHomePage />} />
      </Route>

      <Route path="/adminUserspage" element={<AdminUsersPage />} />
      <Route path="/adminPromotionspage" element={<AdminPromotionsPage />} />
      <Route
        path="/adminTransactionspage"
        element={<AdminTransactionsPage />}
      />
      <Route path="/merchanthomepage/" element={<Merchanthomepage />} />

      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
