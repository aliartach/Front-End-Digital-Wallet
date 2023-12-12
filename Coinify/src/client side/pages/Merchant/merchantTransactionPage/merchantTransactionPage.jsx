import React, { useState, useEffect } from "react";
import MerchantSideNavbar from "../../../../admin side/components/MerchantSideNavbar/MerchantSideNavbar.jsx";
import MercahntHeader from "../../../components/home/userheader/userHeader.jsx";
import StickyHeadTable from "../../../components/SecoundForm/SecoundForm.jsx";
import axios from "axios";
import "../merchantTransactionPage/merchantTransactionPage.css";
import { useUser } from "../../../../Context/useUser.jsx";
import DepositMoneyform from "../../../components/DepositMoneyForm/depositForm.jsx";
import Transfermoneyform from "../../../components/transfermoneyform/transfermoneyform.jsx";



const MerchantTransactionPage = ({ rows }) => {

  const [seen, setSeen] = useState(false);
  const [depositForm, setDepositForm] = useState(false);
  const [ref, setRef] = useState("refresh");

  const { user, setUser } = useUser();
  const [data, setData] = useState([]);
  const [transactions, setTransactions] = useState([]);

  function togglePop() {
    setSeen(!seen);
    setDepositForm(false);
  }
  function togglePopDeposit() {
    setDepositForm(!depositForm);
    setSeen(false);
  }
  const refresh = (r) => {
    setRef(ref + r);
    setSeen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.id) {
          const response = await axios.get(
            `http://localhost:4000/api/users/${user.id}`
          );
          setData(response.data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/transactions"
        );
        var filter_transactions = response.data.filter(
          (each) => each.senderId == user?.id || each.receiverId == user?.id
        );
        setTransactions(filter_transactions);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTransactions();
  }, [user,ref]);

  return (
    <div className="merchantHTransactionPage">
      <MerchantSideNavbar />
      <div className="MercahntRightSide">
        <MercahntHeader
          name={data.firstName + " " + data.lastName}
          title="Transaction"
        />

<div className="transferanddeposit">
          {/* <div>
            <button
              onClick={togglePop}
              className="transferbutton"
              type="submit"
            >
              Transfer
            </button>
          </div> */}
          {seen ? (
            <Transfermoneyform
              toggle={togglePop}
              userData={data}
              refreshPage={refresh}
            />
          ) : null}

          <button className="depositbutton" onClick={togglePopDeposit}>
            Deposit
          </button>
          {depositForm ? (
            <DepositMoneyform
              toggle={togglePopDeposit}
              userData={data}
              refreshPage={refresh}
              money="usdt"
            />
          ) : null}
        </div>




        {transactions.length > 0 && <StickyHeadTable rows={transactions} />}
      </div>
    </div>
  );
};

export default MerchantTransactionPage;
