import React, { useState, useEffect } from "react";
import MerchantSideNavbar from "../../../../admin side/components/MerchantSideNavbar/MerchantSideNavbar.jsx";
import MercahntHeader from "../../../components/home/userheader/userHeader.jsx";
import StickyHeadTable from "../../../components/SecoundForm/SecoundForm.jsx";
import axios from "axios";
import "../merchantTransactionPage/merchantTransactionPage.css";
import { useUser } from "../../../../Context/useUser.jsx";

const MerchantTransactionPage = () => {
  const { user } = useUser();
  const [transactions, setTransactions] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/transactions?userId=${user?.id}`
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (user) {
      fetchTransactions();
    }
  }, [user]);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/users/${user?.id}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  return (
    <div className="merchantHTransactionPage">
      <MerchantSideNavbar />
      <div className="MercahntRightSide">
        <MercahntHeader
          name={userData?.firstName + " " + userData?.lastName}
          title="Transaction"
        />
        {transactions.length > 0 ? (
          <StickyHeadTable rows={transactions} />
        ) : (
          <p>No transactions found for this user.</p>
        )}
      </div>
    </div>
  );
};

export default MerchantTransactionPage;