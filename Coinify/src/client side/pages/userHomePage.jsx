import React, { useState, useEffect } from 'react';
import Userheader from '../components/home/userheader/userHeader'
import SidenavBar from '../../admin side/components/SideNavBar/SideNavbar';
import Homecard from '../components/home/homecard/homecard'
import { FaWallet } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import { MdCallReceived } from "react-icons/md";
import axios from 'axios';
import '../../App.css'

 
const userHomePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users/1');
        console.log("response",response)
        setData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);
  console.log("userData", data)
    return (
        
    <div className="homepage">
          <SidenavBar />
          <div className="homecontent">
             <Userheader />
              <div>
                  <div className="grid-container">
                    <div class="grid-row">
                      <div className="grid-item"><Homecard type={"Balance USD"} amount={data.balanceUSD}>< FaWallet className='walletlogo' /></Homecard></div>
                      <div className="grid-item"><Homecard type={"Balance USDT"} amount={data.balanceUSDT} >< FaWallet className='walletlogo' /></Homecard></div>
                    </div>
                    <div class="grid-row">
                      <div className="grid-item"><Homecard type={"SEND"} amount={data.balanceUSD}><BiSend className='walletlogo' /></Homecard></div>
                      <div className="grid-item"><Homecard type={"RECEIVED"} amount={data.balanceUSDT}><MdCallReceived className='walletlogo' /></Homecard></div>
                    </div>
                  </div>
              </div>
              <div className='usertable'>
                <table className='tableuserinfo'>
                  <tr>
                    <td className='tduserinfo'>First Name</td>
                    <td className='tduserinfo1'>{data.firstName}</td>
                  </tr>
                  <tr>
                    <td className='tduserinfo'>Last Name</td>
                    <td className='tduserinfo1'>{data.lastName} </td>
                  </tr>
                  <tr>
                    <td className='tduserinfo'>Email</td>
                    <td className='tduserinfo1'>{data.email}</td>
                  </tr>
                  <tr>
                    <td className='tduserinfo'>Phone Number</td>
                    <td className='tduserinfo1'>{data.phone}</td>
                  </tr>
                </table>
              </div>
              
         </div>
    </div>
    )
  }
  
  
  export default userHomePage