import React, { useState, useEffect } from "react";
import SideNavbar from "../../../../admin side/components/SideNavBar/SideNavbar.jsx";
import UserHeader from "../../../components/home/userheader/userHeader";
import StickyHeadTable from "../../../components/SecoundForm/SecoundForm.jsx";
import axios from "axios";
import Transfermoneyform from "../../../components/transfermoneyform/transfermoneyform.jsx";
import "../usertransactionpage/usertransactionpage.css";
import { useUser } from "../../../../Context/useUser.jsx";
import DepositMoneyform from "../../../components/DepositMoneyForm/depositForm.jsx";

const Usertransactionpage = ({ rows, togglePop }) => {
  const [seen, setSeen] = useState(false);
  const [depositForm, setDepositForm] = useState(false);

  const [ref, setRef] = useState("refresh");
  const [data, setData] = useState();
  const [transactions, setTransactions] = useState([]);
  const { user, setUser } = useUser();
  function togglePop() {
    setSeen(!seen);
    setDepositForm(false)
  }
  function togglePopDeposit() {
    setDepositForm(!depositForm);
    setSeen(false)
  }
  const refresh = (r) => {
    setRef(ref + r);
    setSeen(false);
  };
  console.log("refresh=", ref);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (user?.id) {
          const response = await axios.get(
            "http://localhost:4000/api/transactions"
          );
          var filter_transactions = response.data.filter(
            (each) => each.senderId == user.id || each.receiverId == user.id
          );
          setTransactions(filter_transactions);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
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

    fetchTransactions();
  }, [user, ref]);
  return (
    <div className="userTransactionPage">
      <SideNavbar />
      <div className="userrightside">
        <UserHeader />
        <div className="transferanddeposit">
          <div>
            <button
              onClick={togglePop}
              className="transferbutton"
              type="submit"
            >
              Transfer
            </button>
          </div>
          {seen ? (
            <Transfermoneyform
              toggle={togglePop}
              userData={data}
              refreshPage={refresh}
            />
          ) : null}

          
          <button className="depositbutton"  onClick={togglePopDeposit}>
            Deposit
          </button>
          {depositForm ? (
            <DepositMoneyform
              toggle={togglePopDeposit}
              userData={data}
              refreshPage={refresh}
              money="usdDeposit"
            />
          ) : null}
        </div>
        {transactions.length > 0 && <StickyHeadTable rows={transactions} />}
      </div>
    </div>
  );
};

export default Usertransactionpage;
