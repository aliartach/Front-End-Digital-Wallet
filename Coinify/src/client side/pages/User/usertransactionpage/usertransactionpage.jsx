import React,{useState,useEffect} from "react";
import SideNavbar from "../../../../admin side/components/SideNavBar/SideNavbar.jsx";
import UserHeader from "../../../components/home/userheader/userHeader";
import StickyHeadTable from "../../../components/SecoundForm/SecoundForm.jsx"
import axios from "axios";
import Transfermoneyform from "../../../components/transfermoneyform/transfermoneyform.jsx";
import '../usertransactionpage/usertransactionpage.css'
import { useUser } from "../../../../Context/useUser.jsx";


const Usertransactionpage = ({rows, togglePop}) => {
    const [seen, setSeen] = useState(false)
    const {user, setUser} = useUser();
    function togglePop () {
        setSeen(!seen);
    }
  
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:4000/api/transactions"
            
                );
                var filter_transactions = response.data.filter(each => each.senderId == user.id || each.receiverId == user.id)
                setTransactions(filter_transactions);
            } catch (error) {
                console.error("Error:", error)
            }
        };

        fetchTransactions();
    }, [user]);
return (
    <div className="userTransactionPage">
        <SideNavbar />
        <div className="userrightside">
            <UserHeader/>
            <div className="transferanddeposit">
                <div>
                <button onClick={togglePop} className="transferbutton" type="submit">Transfer</button></div>
                {seen ? <Transfermoneyform toggle={togglePop} /> : null}
                <button className="depositbutton" type="submit">Deposit</button>
            </div>
           {transactions.length>0 &&  <StickyHeadTable rows={transactions} />}
        </div>
    </div>
  )
}

export default Usertransactionpage