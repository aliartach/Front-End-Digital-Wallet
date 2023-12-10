import React, { useState, useEffect } from "react";
import "./adminHomePage.css";
import AdminSideNavbar from "../../components/AdminSideNavbar/adminSideNavbar";
import HomeCard from "../../../client side/components/home/homecard/homecard";
import Line from "../../components/Line-Graph/Line.jsx";
import { FaUsers } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { GrTransaction } from "react-icons/gr";
import { BiSolidDiscount } from "react-icons/bi";
import { useUser } from "../../../Context/useUser.jsx";
import UserHeader from "../../../client side/components/home/userheader/userHeader.jsx";

import axios from "axios";
const AdminHomePage = () => {
  const [admin, setAdmin] = useState([]);
  const { user, setUser } = useUser();
  const [users, setUsers] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/users/");
        setUsers(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/transactions/"
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    const fetchPromotions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/promotions/"
        );
        setPromotions(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPromotions();
    fetchUsers();
    fetchTransactions();
  }, []);
  const usersCount = users.filter((user) => user.role === "user").length;
  const merchantsCount = users.filter((user) => user.role === "merchant")
    .length;

  return (
    <div className="adminHomePage">
      <AdminSideNavbar />
      <div className="adminHomePageContent">
        <UserHeader name={"admin"} title={"HOME"} />
        <div className="adminHomeCards">
          <div className="grid-item">
            <HomeCard type={"USERS"} amount={usersCount}>
              <FaUsers className="walletlogo" />
            </HomeCard>
          </div>
          <div className="grid-item">
            <HomeCard type={"MERCHANTS"} amount={merchantsCount}>
              <CiShop className="walletlogo" />
            </HomeCard>
          </div>
          <div className="grid-item">
            <HomeCard type={"TRANSACTIONS"} amount={transactions.length}>
              <GrTransaction className="walletlogo" />
            </HomeCard>
          </div>

          <div className="grid-item">
            <HomeCard type={"PROMOTIONS"} amount={promotions.length}>
              <BiSolidDiscount className="walletlogo" />
            </HomeCard>
          </div>
        </div>
        <div className="graph">
          <h1 className="MiddleHeader">Transations all Time movement</h1>
          <Line />
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
