import React ,{useState,useEffect} from "react";
import "./merchantCard.css";
import { FaWallet } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import axios from "axios";
import { useUser } from "../../../Context/useUser";
const MerchantCard = ({ title, description,id }) => {
  const {user}=useUser()

  const [promotions,setPromotions] = useState();

  useEffect(() => {

    const fetchPromotions = async () => {
      try {
        if (id) {
          const response = await axios.get(
            "http://localhost:4000/api/promotions/"
          );
          const filteredPromotions = response.data.filter(
            (promotion) => promotion.user.id === id
          );
          setPromotions(filteredPromotions);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    

      fetchPromotions();
  }, [promotions, user,id]);

  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="promotions">
        <h3>Promotions:</h3>
        <ul className="wrow">
          {promotions?.map((promotion) => (
            <li key={promotion.id}>{promotion.promoCode}-{promotion.percentage}%</li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default MerchantCard;
