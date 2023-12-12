import "./depositForm.css";
import { GrTransaction } from "react-icons/gr";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { IoArrowBackCircle } from "react-icons/io5";
import { useUser } from "../../../Context/useUser";
import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DepositMoneyform = ({ toggle, userData, refreshPage,money }) => {
  const [type, settype] = useState(money);
  const [amount, setAmount] = useState(0);

  const handleCreateTransaction = async (e) => {
    e.preventDefault();

    if(amount<= 0) {
      toast.error(`Not Valid Amount`,
        {
          position: "top-center",
          autoClose: 1000,
          closeOnClick: true,
          theme: "dark",
        })  
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/api/transactions`,
        {
          receiverEmail: userData.email,
          amount: amount,
          moneyType: type,
          senderId: 6,
        }
      );

      if (response.status === 200) {
        setAmount(0);
        refreshPage("ref");
        toggle()
        toast.success(`Money Deposited by ADMIN.`, {
          position: "top-center",
          autoClose: 1000,
          closeOnClick: true,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error(`Error, ${error.response?.data?.error}`, {
        position: "top-center",
        autoClose: 1000,
        closeOnClick: true,
        theme: "dark",
      });
    }
  };


  return (
    <div>
      <form className="depositmoneyform" onSubmit={handleCreateTransaction}>
        <div className="depositmoneyheader">
          <IoArrowBackCircle
            className="backbutton"
            onClick={() => {
              toggle();
            }}
          />
          <h3 className="h3depositmoney">Deposit Money ${type.toUpperCase()==="USDT"?"USDT":"USD"}</h3>
          <GrTransaction className="transactionlogo1" />
        </div>
        <br></br>
        <br></br>
        <div className="depositmoneyheader amount">
          <label className="recieveramount">Amount</label>
          <RiMoneyDollarCircleFill className="inputmoneyicon" />
          <input
            placeholder="Amount"
            value={amount}
            className="inputmoneydeposit"
            type="number"
            onChange={(e) => setAmount(e.target.value)}
          ></input>
        </div>
        <div className="depositmmoneybuttondiv">
          <button className="depositmoneybutton" type="submit">
            Deposit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DepositMoneyform;
