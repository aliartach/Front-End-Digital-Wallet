import React from "react";
import "../merchantpormotionspage/merchantpormotionspage.css";
import MerchantSideNavbar from '../../../../admin side/components/MerchantSideNavbar/MerchantSideNavbar.jsx';
import MercahntHeader from '../../../components/home/userheader/userHeader.jsx'



const merchantpormotionspage = () => {
  return (
    <div className="PromotionPage">
      <MerchantSideNavbar/>
      <div className="LeftSide">
      <MercahntHeader/>
      </div>
    </div>
  )
}

export default merchantpormotionspage;
