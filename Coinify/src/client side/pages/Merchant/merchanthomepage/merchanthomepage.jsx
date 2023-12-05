import React, { useState, useEffect } from "react";
import axios from "axios";
import "../merchanthomepage/merchanthomepage.css";
import MerchantSideNavbar from "../../../../admin side/components/SideNavBar/SideNavbar.jsx";
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
        const response = await axios.get("http://localhost:4000/api/users/1");
        console.log("response", response);
        setData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="merchantHomePage">
      <MerchantSideNavbar />
      <div className="MerchantHomePageRight">
        <MercahntHeader name={"name"} title={"HOME"} />
        <div className="MercahntCards">
          <MercahntHomeCards>
            {" "}
            type={"Balance USD"} amount={data.balanceUSD}
            <FaWallet className="walletlogo" />{" "}
          </MercahntHomeCards>
          <MercahntHomeCards>
            {" "}
            type={"Balance USDT"} amount={data.balanceUSD}
            <FaWallet className="walletlogo" />{" "}
          </MercahntHomeCards>
          <MercahntHomeCards>
            type={"RECEIVED"} amount={data.balanceUSDT}
            <MdCallReceived className="walletlogo" />
          </MercahntHomeCards>
          <MercahntHomeCards>
            type={"SEND"} amount={data.balanceUSD}
            <MdCallReceived className="walletlogo" />
          </MercahntHomeCards>
        </div>
      </div>
    </div>
  );
};

export default Merchanthomepage;
