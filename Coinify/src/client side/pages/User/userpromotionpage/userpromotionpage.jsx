import React, { useState,useEffect} from "react";
import "./userpromotionpage.css";
import Sidenavbar from "../../../../admin side/components/SideNavBar/SideNavbar";
import Userheader from "../../../components/home/userheader/userHeader";
import MerchantTable from "../../../components/MerchantTabel/MerchantTabel";
import MerchantCard from "../../../components/MerchantCard/merchantCard";
import { useUser } from "../../../../Context/useUser";
import axios from "axios";
import Buymoneyform from "../../../components/buyusdtform/buyusdtform";

const userpromotionpage = () => {
  const {user,setUser} = useUser();
const [users,setUsers] = useState();
const [promotions,setPromotions] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/users/");
        setUsers(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
      const fetchPromotions = async () => {
        try {
          if (user.id) {
            const response = await axios.get(
              "http://localhost:4000/api/promotions/"
            );
          
            setPromotions(response.data);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
    };

    fetchUsers();
  }, [user]);

  const merchants = users?.filter((user) => user?.role === "merchant");
  console.log(merchants);  
  return (
    <div className="UserMerchantPage">
      <Sidenavbar />
      <Buymoneyform userData={user}/>
      <div className="card-list">
      {merchants?.map((card, index) => (
        <MerchantCard key={index} title={card.email} description={card.balanceUSD} id={card.id} />
     
      ))}
    </div>
      </div>
  );
};
export default userpromotionpage;







