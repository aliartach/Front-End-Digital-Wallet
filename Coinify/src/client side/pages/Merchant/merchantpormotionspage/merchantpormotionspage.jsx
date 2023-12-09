import React, { useState, useEffect } from "react";
import "../merchantpormotionspage/merchantpormotionspage.css";
import MerchantSideNavbar from "../../../../admin side/components/MerchantSideNavbar/MerchantSideNavbar.jsx";
import MercahntHeader from "../../../components/home/userheader/userHeader.jsx";
import axios from "axios";
import { useUser } from "../../../../Context/useUser.jsx";
import AddPromotionsForm from "../../../components/AddPromotion-Form/Promotion-Form.jsx";
import PromotionTabel from "../../../components/PromotionTabel/PromotionTabel.jsx";
const MerchantPromotionsPage = ({ togglePopup, rows }) => {
  const [seen, setSeen] = useState(false);

  function togglePopup() {
    setSeen(!seen);
  }

  const { user } = useUser();
  const [promotions, setPromotions] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/promotions/"
        );
        const filteredPromotions = response.data.filter(
          (promotion) => promotion.userId === user?.id
        );
        setPromotions(filteredPromotions);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPromotions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/users/${user?.id}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="PromotionPage">
      <MerchantSideNavbar />
      <div className="RightSide">
        <div className="AddPromotionButton">
          <div>
            <button onClick={togglePopup} className="addbutton" type="submit">
              Add Promotion
            </button>
          </div>
          {seen ? (
            <AddPromotionsForm toggle={togglePopup} userId={user?.id} />
          ) : null}
        </div>
        <MercahntHeader
          name={data.firstName + " " + data.lastName}
          title="Promotion"
        />
        {promotions.length > 0 && <PromotionTabel rows={promotions} />}
      </div>
    </div>
  );
};

export default MerchantPromotionsPage;
