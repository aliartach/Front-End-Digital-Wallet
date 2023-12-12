import React,{useState,useEffect} from "react";
import "./userpromotionpage.css"
import axios from "axios";
import Sidenavbar from "../../../../admin side/components/SideNavBar/SideNavbar"
import Userheader from "../../../components/home/userheader/userHeader"
import StickyHeadTable from "../../../components/SecoundForm/SecoundForm.jsx"
import { useUser } from "../../../../Context/useUser.jsx";
import { BiSolidDiscount } from "react-icons/bi";
import Buyusdtform from "../../../components/buyusdtform/buyusdtform.jsx";


const userpromotionpage = (rows) => {

const [data, setData] = useState([])
const {user, setUser} = useUser();
const [promotions, setPromotions] = useState()

const fetchuser = async () => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/users/${user?.id}`
    );
    setData(response.data);
  } catch (error) {
    console.log("Error:", error);
  }
};

const fetchpromotions = async() => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/promotions/"
    ); setData(response.data);
  } catch (error) {
    console.log("Error:", error);
  }
};

useEffect( () => {
  fetchpromotions();
}, [user]) 


useEffect( () => {
  fetchuser();
}, [user]);





 return (
    <div className="userpromotionpage">
      <Sidenavbar />
       <div className="userrightside2">
         <Userheader title={"PROMOTIONS"} name={data.firstName + " " + data.lastName} logo={BiSolidDiscount} />
          <div className="userpromotiontable">
          {promotions ? promotions.length>0 : <p>no promo</p>  &&  <StickyHeadTable rows={promotions} />}
           
          </div>
          <Buyusdtform />
       </div>
        
        
        
    </div>
  )
}

export default userpromotionpage