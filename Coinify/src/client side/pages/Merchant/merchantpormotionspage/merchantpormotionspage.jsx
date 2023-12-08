import React, { useState, useEffect } from "react";
import "../merchantpormotionspage/merchantpormotionspage.css";
import MerchantSideNavbar from '../../../../admin side/components/MerchantSideNavbar/MerchantSideNavbar.jsx';
import MercahntHeader from '../../../components/home/userheader/userHeader.jsx'
import axios from "axios";
import { useUser } from "../../../../Context/useUser.jsx";


const merchantpormotionspage = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/users/${user?.id}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);
  return (
    <div className="PromotionPage">
      <MerchantSideNavbar/>
      <div className="LeftSide">
      <MercahntHeader
          name={userData?.firstName + " " + userData?.lastName}
          title="Promotion"
        />
      </div>
    </div>
  )
}

export default merchantpormotionspage;
