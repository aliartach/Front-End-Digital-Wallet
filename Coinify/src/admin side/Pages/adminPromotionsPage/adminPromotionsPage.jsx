import React, { useState, useEffect } from "react";
import "./adminPromotionsPage.css";
import AdminSideNavbar from "../../components/AdminSideNavbar/adminSideNavbar";
import UserHeader from "../../../client side/components/home/userheader/userHeader";
import PromotionsForm from "../../components/PromotionsForm/promotionsForm";
import axios from "axios";

const AdminPromotionsPage = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/promotions/"
        );
        setPromotions(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPromotions();
  }, []);
  console.log("allPromotions", promotions);
  return (
    <div className="AdminPromotionsPage">
      <AdminSideNavbar />
      <div className="AdminPromotionsPageContent">
        {" "}
        <UserHeader name={"admin"} title={"PROMOTIONS"} />
        <h1>This is the PROMOTIONS admin Page</h1>
        <PromotionsForm rows={promotions}/>
      </div>
    </div>
  );
};

export default AdminPromotionsPage;
