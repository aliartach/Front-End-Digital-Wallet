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
  }, [user]);
  const usersCount = users.filter((user) => user.role === "user").length;
  const merchantsCount = users.filter((user) => user.role === "merchant")
    .length;

  const last7Days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    last7Days.push(date.toISOString().slice(0, 10));
  }
  const transactionCountByDay = {};
  for (const date of last7Days) {
    transactionCountByDay[date] = 0;
  }
  for (const transaction of transactions) {
    const transactionDate = transaction.date.slice(0, 10);
    if (transactionCountByDay.hasOwnProperty(transactionDate)) {
      transactionCountByDay[transactionDate]++;
    }
  }
  const xAxis = [{ scaleType: "point", data: last7Days.reverse() }];
  const series = [{ data: Object.values(transactionCountByDay).reverse() }];

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
          <h1 className="MiddleHeader">Transactions for the last 7 days</h1>
          <Line xAxis={xAxis} series={series} />
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
