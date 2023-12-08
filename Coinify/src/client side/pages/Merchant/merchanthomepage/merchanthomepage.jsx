import React, { useState, useEffect } from "react";
import axios from "axios";
import "../merchanthomepage/merchanthomepage.css";
import MerchantSideNavbar from "../../../../admin side/components/MerchantSideNavbar/MerchantSideNavbar.jsx";
import MercahntHeader from "../../../components/home/userheader/userHeader.jsx";
import MercahntHomeCards from "../../../components/home/homecard/homecard.jsx";
import { FaWallet } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import { MdCallReceived } from "react-icons/md";

const Merchanthomepage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/users/");
        console.log("response", response);
        setData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  console.log(data);
  return (
    <div className="merchantHomePage">
      <MerchantSideNavbar />
      <div className="MerchantHomePageRight">
        <MercahntHeader name={data.firstName} title={"HOME"} />
        <div className="MercahntCards">
          <MercahntHomeCards type={"Balance USD"} amount={data.balanceUSD}>
            {" "}
            <FaWallet className="walletlogo" />{" "}
          </MercahntHomeCards>
          <MercahntHomeCards type={"Balance USDT"} amount={data.balanceUSD}>
            {" "}
            <FaWallet className="walletlogo" />{" "}
          </MercahntHomeCards>
          <MercahntHomeCards type={"RECEIVED"} amount={data.balanceUSDT}>
            <MdCallReceived className="walletlogo" />
          </MercahntHomeCards>
          <MercahntHomeCards type={"SEND"} amount={data.balanceUSD}>
            <MdCallReceived className="walletlogo" />
          </MercahntHomeCards>
        </div>
        <h1 className="UserTabel">{data.firstName} Profile</h1>
        <div className="TabelMain">
        <table className="MerchantTabel">
            <tr className="tr">
              <td className="F-NAME">First Name</td>
              <td className="F-NAME">{data.firstName}</td>
            </tr>
            <tr  className="tr">
              <td className="L-NAME">Last Name</td>
              <td className="L-NAME">{data.lastName} </td>
            </tr >
            <tr className="tr">
              <td className="M-Email">Email</td>
              <td className="M-Email">{data.email}</td>
            </tr >
            <tr  className="tr">
              <td className="PHONE-N">Phone Number</td>
              <td className="PHONE-N">{data.phone}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Merchanthomepage;
