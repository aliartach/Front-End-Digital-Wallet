import React, { useState, useEffect } from "react";
import "./adminTransactionsPage.css";
import AdminSideNavbar from "../../components/AdminSideNavbar/adminSideNavbar";
import UserHeader from "../../../client side/components/home/userheader/userHeader";
import axios from "axios";
import StickyHeadTable from "../../../client side/components/SecoundForm/SecoundForm";
import TransactionForm from "../../components/TransactionForm/TransactionForm";

const AdminTransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/transactions/"
        );

        setTransactions(response.data);
        console.log("transactions", transactions);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTransactions();
  }, []);
  console.log("allTransactions", transactions);

  return (
    <div className="AdminTransactionsPage">
      <AdminSideNavbar />
      <div className="AdminTransactionsPageContent">
        {" "}
        <UserHeader name={"Admin"} title={"TRANSACTIONS"} />
        {transactions.length > 0 && <TransactionForm rows={transactions} />}
      </div>
    </div>
  );
};

export default AdminTransactionsPage;
