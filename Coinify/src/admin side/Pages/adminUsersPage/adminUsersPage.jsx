import React, { useState, useEffect } from "react";
import "./adminUsersPage.css";
import AdminSideNavbar from "../../components/AdminSideNavbar/adminSideNavbar";
import UserHeader from "../../../client side/components/home/userheader/userHeader";
import UsersForm from "../../components/UsersForm/usersForm";
import axios from "axios";
import { useUser } from "../../../Context/useUser.jsx";
import StickyHeadTableUSers from "../../components/SecoundFormUsers/SecoundForm.jsx";
// import React from "react"
import UserForm from "../../components/UserForm/usersForm.jsx";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [merchants, setMerchants] = useState([]);

  const { user, setUser } = useUser();
  console.log("heelooooo", user);
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
        <div className="logobuttonspacing">
          
          </div>
        
        <div>
          {" "}
          {/* <h1>Email: {user?.email} </h1> */}
        </div>
        {/* <UsersForm rows={users} /> */}
        {/* <StickyHeadTableUSers rows={users} /> */}
        {users.length > 0 && <UserForm rows={users} />}
      </div>
    </div>
  );
};

export default AdminUsersPage;
