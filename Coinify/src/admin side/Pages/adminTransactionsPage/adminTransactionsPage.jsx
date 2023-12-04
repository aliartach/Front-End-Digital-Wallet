import React,{useState,useEffect} from "react";
import "./adminTransactionsPage.css";
import AdminSideNavbar from "../../components/AdminSideNavbar/adminSideNavbar";
import UserHeader from "../../../client side/components/home/userheader/userHeader";
import TForm from "../../../client side/components/Form/TForm";
import axios from "axios";

const AdminTransactionsPage = () => {
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
  console.log("allTransactions", transactions);

  return (
    <div className="AdminTransactionsPage">
      <AdminSideNavbar />
      <div className="AdminTransactionsPageContent">
        {" "}
        <UserHeader name={"Admin"} title={"TRANSACTIONS"} />

        <TForm rows={transactions}/>

      </div>
    </div>
  );
};

export default AdminTransactionsPage;
