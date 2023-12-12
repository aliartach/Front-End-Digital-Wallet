import "./transfermoneyform.css";
import { GrTransaction } from "react-icons/gr";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { IoArrowBackCircle } from "react-icons/io5";
import { useUser } from "../../../Context/useUser";
import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const transfermoneyform = ({ toggle, userData, refreshPage }) => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  let { socket, user } = useUser();

  const handleCreateTransaction = async (e) => {
    e.preventDefault();

    if (amount <= 0 || amount > userData.balanceUSDT) {
      toast.error(`Insufficient Funds`, {
        position: "top-center",
        autoClose: 1000,
        closeOnClick: true,
        theme: "dark",
      });
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:4000/api/transactions`,
        {
          receiverEmail: email,
          amount,
          moneyType: "usdt",
          senderId: userData.id,
        }
      );
      if (response.status === 200) {
        socket?.emit("sendNotification", {
          senderName: userData.email,
          receiverName: email,
          amount: amount,
          time: Date.now(),
          moneyType: "usdt",
        });

        setEmail("");
        setAmount(0);
        refreshPage("ref");
        toast.success(`Money Sent successfully.`, {
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
      <form className="transfermoneyform" onSubmit={handleCreateTransaction}>
        <div className="transfermoneyheader">
          <IoArrowBackCircle
            className="backbutton"
            onClick={() => {
              toggle();
            }}
          />
          <h3 className="h3transfermoney">Transfer money</h3>
          <GrTransaction className="transactionlogo1" />
        </div>
        <div className="hrtransfermoneyform"></div>
        <div className="transfermoneyheader email">
          <label className="recieveremail">Reciever Email Address</label>
          <MdOutlineEmail className="inputemailicon" />
          <input
            placeholder="Email-Address"
            className="inputmoneytransfer"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <br></br>
        <br></br>
        <div className="transfermoneyheader amount">
          <label className="recieveramount">Amount</label>
          <RiMoneyDollarCircleFill className="inputmoneyicon" />
          <input
            placeholder="Amount"
            value={amount}
            className="inputmoneytransfer"
            type="number"
            onChange={(e) => setAmount(e.target.value)}
          ></input>
        </div>
        <div className="transfermmoneybuttondiv">
          <button className="transfermoneybutton" type="submit">
            TRANSFER
          </button>
        </div>
      </form>
    </div>
  );
};

export default transfermoneyform;
