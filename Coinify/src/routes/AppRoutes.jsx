import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../client side/pages/Home/HomePage.jsx";
import Registerpage from "../client side/pages/RegisterPage/Registerpage.jsx";
import UserHomePage from "../client side/pages/User/UserHomePage/userHomePage.jsx";
import AdminHomePage from "../admin side/Pages/adminHomePage/adminHomePage.jsx";
import AdminPromotionsPage from "../admin side/Pages/adminPromotionsPage/adminPromotionsPage.jsx";
import AdminUsersPage from "../admin side/Pages/adminUsersPage/adminUsersPage.jsx";
import AdminTransactionsPage from "../admin side/Pages/adminTransactionsPage/adminTransactionsPage.jsx";
import NotFoundPage from "../admin side/Pages/NotFoundPage/notFoundPage.jsx";
import ProtectedRoute from "./ProtectedRoutes";
import Merchanthomepage from "../client side/pages/Merchant/merchanthomepage/merchanthomepage.jsx";
import MerchantTransactionPage from "../client side/pages/Merchant/merchantTransactionPage/merchantTransactionPage.jsx";
import MerchantPromotionPage from "../client side/pages/Merchant/merchantpormotionspage/merchantpormotionspage.jsx";
import Usertransactionpage from "../client side/pages/User/usertransactionpage/usertransactionpage.jsx";
import Userpromotionpage from "../client side/pages/User/userpromotionpage/userpromotionpage.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Registerpage" element={<Registerpage />} />

      {/* <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route path="/userhomepage/" element={<UserHomePage />} />
      </Route> */}
      <Route path="/userhomepage/" element={<UserHomePage />} />
      {/* <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/adminHomepage/" element={<AdminHomePage />} />
      </Route> */}
      <Route path="/adminHomepage/" element={<AdminHomePage />} />
      <Route path="/UserTranstionPage/" element={<Usertransactionpage />} />
      <Route path="/UserPromotionPage/" element={<Userpromotionpage/>}/>



      <Route element={<ProtectedRoute allowedRoles={["merchant", "user"]} />}>
      <Route path="/UserTranstionPage/" element={<Usertransactionpage/>} />
      </Route>

      <Route path="/adminUserspage" element={<AdminUsersPage />} />
      <Route path="/adminPromotionspage" element={<AdminPromotionsPage />} />
      <Route
        path="/adminTransactionspage"
        element={<AdminTransactionsPage />}
      />
      <Route path="/merchanthomepage/" element={<Merchanthomepage />} />
      {/* <Route element={<ProtectedRoute allowedRoles={["merchant"]} />}>
        <Route path="/merchanthomepage/" element={<Merchanthomepage />} />
      </Route> */}
      <Route
        path="/merchantTransactionPage/"
        element={<MerchantTransactionPage />}
      />
      <Route
        path="/merchantPromotionPage/"
        element={<MerchantPromotionPage />}
      />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
