import React,{useState,useEffect} from "react";
import MerchantSideNavbar from '../../../../admin side/components/SideNavBar/SideNavbar.jsx';
import MercahntHeader from '../../../components/home/userheader/userHeader.jsx'
import StickyHeadTable from "../../../components/SecoundForm/SecoundForm.jsx"
import axios from "axios";
import '../merchantTransactionPage/merchantTransactionPage.css';


const MerchantTransactionPage = () => {

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
  
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/transactions/"
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error:", error);
      }

    };

    fetchTransactions();
  }, []);
  return (
    <div className="merchantHTransactionPage">
     <MerchantSideNavbar/>    
     <div className="MercahntRightSide">
       <MercahntHeader/>
      <StickyHeadTable rows={transactions} />
      </div>
      
    </div>
  )
}

export default MerchantTransactionPage;
