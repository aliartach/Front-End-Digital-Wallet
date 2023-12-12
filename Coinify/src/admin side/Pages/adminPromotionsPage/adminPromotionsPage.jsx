import React, { useState, useEffect } from "react";
import "./adminPromotionsPage.css";
import AdminSideNavbar from "../../components/AdminSideNavbar/adminSideNavbar";
import UserHeader from "../../../client side/components/home/userheader/userHeader";
import PromotionsForm from "../../components/PromotionsForm/promotionsForm";
import axios from "axios";
import PromotionTabel from "../../components/PromotionTabel/PromotionTabel";
import PromotionForm from "../../../client side/components/AddPromotion-Form/Promotion-Form";
import { useUser } from "../../../Context/useUser";
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
  }, [user,ref]);
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
        </div>        <UserHeader name={"admin"} title={"PROMOTIONS"} />
        <h1>This is the PROMOTIONS admin Page</h1>
        {/* <PromotionsForm rows={promotions}/> */}

        {promotions.length>0 && <PromotionTabel rows={promotions}/> }
      </div>
    </div>
  );
};

export default AdminPromotionsPage;
