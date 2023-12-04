import React, { useState, useEffect } from "react";
import "./adminUsersPage.css";
import AdminSideNavbar from "../../components/AdminSideNavbar/adminSideNavbar";
import UserHeader from "../../../client side/components/home/userheader/userHeader";
import UsersForm from "../../components/UsersForm/usersForm";
import axios from "axios";
const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/users/");
        setUsers(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
  }, []);
  console.log("allUsers", users);

  return (
    <div className="AdminUsersPage">
      <AdminSideNavbar />

      <div className="AdminUsersPageContent">
        {" "}
        <UserHeader name={"Admin"} title={"USERS"} />
        <UsersForm rows={users} />
      </div>
    </div>
  );
};

export default AdminUsersPage;
