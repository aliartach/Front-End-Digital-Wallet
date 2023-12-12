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
        setData(response.data);}
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
        <div className="usertable">
          <table className="tableuserinfo">
            <tr>
              <td className="tduserinfo">First Name</td>
              <td className="tduserinfo1">{data.firstName}</td>
            </tr>
            <tr>
              <td className="tduserinfo">Last Name</td>
              <td className="tduserinfo1">{data.lastName} </td>
            </tr>
            <tr>
              <td className="tduserinfo">Email</td>
              <td className="tduserinfo1">{data.email}</td>
            </tr>
            <tr>
              <td className="tduserinfo">Phone Number</td>
              <td className="tduserinfo1">{data.phone}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default userHomePage;
