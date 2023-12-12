import React, { useState, useEffect } from "react";
import Userheader from "../../../components/home/userheader/userHeader";
import SidenavBar from "../../../../admin side/components/SideNavBar/SideNavbar";
import Homecard from "../../../components/home/homecard/homecard";
import { FaWallet } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import { MdCallReceived } from "react-icons/md";
import axios from "axios";
import './userHomePage.css'
import { useUser } from "../../../../Context/useUser";
import { MdHome } from 'react-icons/md'; 

const userHomePage = () => {
  const [data, setData] = useState([]);
  const { user, setUser } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(user?.id){
        const response = await axios.get(
          `http://localhost:4000/api/users/${user?.id}`
        );
        setData(response?.data);}
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="homepage">
      <SidenavBar />
      <div className="homecontent">
      
        <Userheader
          name={data.firstName + " " + data.lastName}
          title={"HOME"}
          logo={MdHome}
        />
        <div>
          <div className="grid-container">
            <div class="grid-row">
              <div className="grid-item">
                <Homecard type={"Balance USD"} amount={data.balanceUSD}>
                  <FaWallet className="walletlogo" />
                </Homecard>
              </div>
              <div className="grid-item">
                <Homecard type={"Balance USDT"} amount={data.balanceUSDT}>
                  <FaWallet className="walletlogo" />
                </Homecard>
              </div>
            
            
              <div className="grid-item">
                <Homecard type={"SENT"} amount={data.balanceUSD}>
                  <BiSend className="walletlogo" />
                </Homecard>
              </div>
              <div className="grid-item">
                <Homecard type={"RECEIVED"} amount={data.balanceUSDT}>
                  <MdCallReceived className="walletlogo" />
                </Homecard>
              </div>
            </div>
          </div>
        </div>
        <h1 className="UserTabel">{data.firstName} 's Profile</h1>
        <div className="TabelMain">
          <table className="MerchantTabel">
            <tr className="tr">
              <td className="F-NAME">First Name</td>
              <td className="F-NAME">{data.firstName}</td>
            </tr>
            <tr className="tr">
              <td className="L-NAME">Last Name</td>
              <td className="L-NAME">{data.lastName} </td>
            </tr>
            <tr className="tr">
              <td className="M-Email">Email</td>
              <td className="M-Email">{data.email}</td>
            </tr>
            <tr className="tr">
              <td className="PHONE-N">Phone Number</td>
              <td className="PHONE-N">{data.phone}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default userHomePage;
