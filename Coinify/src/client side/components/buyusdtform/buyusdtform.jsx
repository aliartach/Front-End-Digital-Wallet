// import "./buymoneyform.css";
import { GrTransaction } from "react-icons/gr";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { IoArrowBackCircle } from "react-icons/io5";
import { useUser } from "../../../Context/useUser";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../buyusdtform/buyusdtform.css";

const buymoneyform = ({userData}) => {
  const{user}=useUser()
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [promoCode, setPromoCode] = useState("");

  useEffect(()=>{},[user])

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
      console.log("abc",email,amount,promoCode,userData.id)

      const response = await axios.post(
        `http://localhost:4000/api/transactions`,
        {
          receiverEmail: email,
          amount,
          moneyType: "usd",
          senderId: userData.id,
          promoCode:promoCode||null,
        }
      );
      console.log("RES", response);

      if (response.status === 200) {
        setEmail("");
        setAmount(0);
        // refreshPage("ref");
        toast.success(`Money Sent successfully.`, {
          position: "top-center",
          autoClose: 1000,
          closeOnClick: true,
          theme: "dark",
        });
      }
    } catch (error) {
      console.log("RES", error);

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
      <form className="buymoneyform" onSubmit={handleCreateTransaction}>
        <div className="buymoneyheader">
          <IoArrowBackCircle
            className="backbutton"
            onClick={() => {
              toggle();
            }}
          />
          <h3 className="h3buymoney">Buy USDT</h3>
          <GrTransaction className="transactionlogo1" />
        </div>
        <div className="hrbuymoneyform"></div>
        <div className="buymoneyheader email">
          <label className="recieveremail">Enter Email</label>
          <MdOutlineEmail className="inputemailicon" />
          <input
            placeholder="Email-Address"
            className="inputmoneybuy"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <br></br>
        <br></br>
        <div className="buymoneyheader amount">
          <label className="recieveramount">Amount</label>
          <RiMoneyDollarCircleFill className="inputmoneyicon1" />
          <input
            placeholder="Amount"
            value={amount}
            className="inputmoneybuy2"
            type="number"
            onChange={(e) => setAmount(e.target.value)}
          ></input>
        </div>

        <div className="buymmoneybuttondiv">
          <br></br>
          <div className="buymoneyheader email">
            <label className="recieveremail">Enter Promo Code</label>
            <MdOutlineEmail className="inputemailicon" />
            <input
              placeholder="Promo-Code"
              className="inputmoneybuy1"
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            ></input>
          </div>
          
        </div>
        <button className="buymoneybutton" type="submit">
            buy
          </button>
      </form>
    </div>
  );
};

export default buymoneyform;
