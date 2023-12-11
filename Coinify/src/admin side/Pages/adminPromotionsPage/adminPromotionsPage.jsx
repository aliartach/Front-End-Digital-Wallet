import React, { useState, useEffect } from "react";
import "./adminPromotionsPage.css";
import AdminSideNavbar from "../../components/AdminSideNavbar/adminSideNavbar";
import UserHeader from "../../../client side/components/home/userheader/userHeader";
import axios from "axios";
import PromotionTabel from "../../components/PromotionTabel/PromotionTabel";
import PromotionForm from "../../../client side/components/AddPromotion-Form/Promotion-Form";
import { useUser } from "../../../Context/useUser";
import { MdHome } from "react-icons/md";
import { BiSolidDiscount } from "react-icons/bi";

const AdminPromotionsPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [seen, setSeen] = useState(false);
  const [ref, setREf] = useState("refreshPromotions");
  const {user, setUser}=useUser()

  function togglePopup() {
    setSeen(!seen);
  }
  function newPromotion(obj) {
    setPromotions((prevPromotions) => [...prevPromotions, obj]);
    setREf(ref+"refresh")
  }
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
  }, [ref]);
  return (
    <div className="AdminPromotionsPage">
      <AdminSideNavbar />
      <div className="AdminPromotionsPageContent">
        {" "}
        <div className="AddPromotionButton">
          <div>
            <button onClick={togglePopup} className="addbutton" type="submit">
              Add Promotion
            </button>
          </div>
          {seen ? (
            <PromotionForm toggle={togglePopup} userId={user?.id} newPromotions={newPromotion} />
          ) : null}
        </div>        <UserHeader logo={BiSolidDiscount} name={"admin"} title={"PROMOTIONS"} />

        {promotions.length>0 && <PromotionTabel rows={promotions}/> }
      </div>
    </div>
  );
};

export default AdminPromotionsPage;
