import React, { useState, useEffect } from "react";
import MerchantSideNavbar from "../../../../admin side/components/MerchantSideNavbar/MerchantSideNavbar.jsx";
import MercahntHeader from "../../../components/home/userheader/userHeader.jsx";
import StickyHeadTable from "../../../components/SecoundForm/SecoundForm.jsx";
import axios from "axios";
import "../merchantTransactionPage/merchantTransactionPage.css";
import { useUser } from "../../../../Context/useUser.jsx";

const MerchantTransactionPage = ({rows}) => {
  const {user, setUser} = useUser();
  const [data, setData] = useState([]);
  const [transactions, setTransactions] = useState([]);
 

  useEffect(() => {
    const fetchTransactions = async () => {
        try {
            const response = await axios.get(
                "http://localhost:4000/api/transactions"
        
            );
            var filter_transactions = response.data.filter(each => each.senderId == user.id || each.receiverId == user.id)
            setTransactions(filter_transactions);
        } catch (error) {
            console.error("Error:", error)
        }
    };

    fetchTransactions();
}, [user]);
  

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/users/${user?.id}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fetchData();
}, [user]);

  return (
    <div className="merchantHTransactionPage">
      <MerchantSideNavbar />
      <div className="MercahntRightSide">
        <MercahntHeader
          name={data.firstName + " " + data.lastName}
          title="Transaction"
        />
          {transactions.length>0 &&  <StickyHeadTable rows={transactions} />}
      </div>
    </div>
  );
};

export default MerchantTransactionPage;