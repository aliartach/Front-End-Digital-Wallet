import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./usersFrom.css";

const UserForm = ({ rows }) => {
  const [data, setData] = useState(rows);
  const [editedUserData, setEditedUserData] = useState();
  const [editedPassword, setEditedPassword] = useState();

  console.log("ET", editedUserData);

  const handleOptionChange = (event) => {
    setEditedUserData((prevData) => ({
      ...prevData,
      role: event.target.value,
    }));
  };
  const handleVerifiedChange = (event) => {
    const value = event.target.value === "true";
    setEditedUserData((prevData) => ({
      ...prevData,
      verified: value,
    }));
  };

  const handleDeleteUser = async (e, id) => {
    e.preventDefault();
    const confirmation = confirm(`Are you sure you want to delet this user`);
    if (confirmation) {
      try {
        const response = await axios.delete(
          `http://localhost:4000/api/users/${id}`
        );
        console.log("deleted successfully");

        const updatedData = data.filter((row) => row.id !== id);
        setData(updatedData);
        toast.success(` User Deleted Successfully!`, {
          position: "top-center",
          autoClose: 1000,
          closeOnClick: true,
          theme: "dark",
        });
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      return;
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const newUser = editedUserData;
    newUser.password = editedPassword;

    try {
      const response = await axios.post(
        `http://localhost:4000/api/users/`,
        newUser
      );

      const newData = [newUser, ...data];
      setData(newData);

      setEditedUserData(null);
      setEditedPassword("");

      toast.success(`User added successfully.`, {
        position: "top-center",
        autoClose: 1000,
        closeOnClick: true,
        theme: "dark",
      });
    } catch (error) {
      toast.error(`Error, ${error}`, {
        position: "top-center",
        autoClose: 1000,
        closeOnClick: true,
        theme: "dark",
      });
    }
  };

  const columns = [
    {
      name: "firstName",
      label: "First Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "lastName",
      label: "Last Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "phone",
      label: "Phone Number",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "balanceUSD",
      label: "USD",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "balanceUSDT",
      label: "USDT",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "role",
      label: "Role",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "verified",
      label: "Verified",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return value ? "Verified" : "N/A";
        },
      },
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          const userId = data[rowIndex].id;

          return (
            <div className="Editbutton">
              <button className="deletebutton"
                onClick={(e) => {
                  handleDeleteUser(e, userId);
                }}
              >
                Delete
              </button>
              <button className="editbutton"
                onClick={(e) => {
                  setEditedUserData(data[rowIndex]);
                }}
              >
                Edit
              </button>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    selectableRowsHideCheckboxes: true
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    const confirmUpdate = window.confirm(
      "Are you sure you want to update this user?"
    );
    if (!confirmUpdate) {
      return;
    } else {
      try {
        const { password, ...rest } = editedUserData;
        const updatedUserData = { ...rest };

        if (password != editedPassword) {
          updatedUserData.password = editedPassword;
        }
        const response = await axios.put(
          `http://localhost:4000/api/users/${editedUserData.id}`,
          updatedUserData
        );
        console.log("User updated successfully:", response.data);

        // Update the user data in the state
        const updatedData = data.map((row) => {
          if (row.id === editedUserData.id) {
            return {
              ...row,
              ...updatedUserData,
            };
          }
          return row;
        });
        setData(updatedData);

        toast.success("User updated successfully!", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          theme: "dark",
        });

        setEditedUserData(null);
        setEditedPassword(null);
      } catch (error) {
        console.error("Error updating user:", error);
        toast.error("Failed to update user. Please try again later.", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          theme: "dark",
        });
      }
    }
  };

  return (
    <div className="UserForm">
      <div className="adminUserformButton">
        <button
          className="addbutton"
          onClick={() => {
            setEditedUserData({ verified: false, role: "user" });
          }}
        >
          Add User
        </button>
      </div>

      <div className="Formtable">
        <MUIDataTable
          title={"All Users"}
          data={data}
          columns={columns}
          options={options}
        />
      </div>

      <div>
        {editedUserData && (
          <div>
            <div className="EditUserModal">
              <form
                id="editUser"
                onSubmit={(e) => {
                  if (editedUserData.id) {
                    handleEditUser(e);
                  } else {
                    handleAddUser(e);
                  }
                }}
              >
                <div className="input-group-admin-user">
                  <input
                    type="text"
                    value={editedUserData.firstName}
                    onChange={(e) => {
                      setEditedUserData({
                        ...editedUserData,
                        firstName: e.target.value,
                      });
                    }}
                    placeholder="First-Name"
                    required
                  />
                  <FaPerson className="input-icon-admin-user" />
                </div>
                <div className="input-group-admin-user">
                  <input
                    value={editedUserData.lastName}
                    onChange={(e) => {
                      setEditedUserData({
                        ...editedUserData,
                        lastName: e.target.value,
                      });
                    }}
                    type="text"
                    placeholder="Last-Name"
                    required
                  />
                  <FaPerson className="input-icon-admin-user" />
                </div>
                <div className="input-group-admin-user">
                  <input
                    type="text"
                    value={editedUserData.phone}
                    onChange={(e) => {
                      setEditedUserData({
                        ...editedUserData,
                        phone: e.target.value,
                      });
                    }}
                    placeholder="Phone-Number"
                    required
                  />
                  <FaPhone className="input-icon-admin-user" />
                </div>
                <div className="input-group-admin-user">
                  <input
                    value={editedUserData.email}
                    onChange={(e) => {
                      setEditedUserData({
                        ...editedUserData,
                        email: e.target.value,
                      });
                    }}
                    type="email"
                    placeholder="Email"
                    required
                  />
                  <MdEmail className="input-icon-admin-user" />
                </div>
                <div className="input-group-admin-user">
                  <input
                    value={editedPassword || editedUserData.password}
                    onChange={(e) => {
                      setEditedPassword(e.target.value);
                    }}
                    type="text"
                    placeholder="Password"
                    required
                  />
                  <RiLockPasswordFill className="input-icon-admin-user" />
                </div>

                <div className="input-group-admin-user">
                  <label>
                    <input
                      type="radio"
                      value="user"
                      checked={editedUserData.role === "user"}
                      onChange={handleOptionChange}
                    />
                    User
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="merchant"
                      checked={editedUserData.role === "merchant"}
                      onChange={handleOptionChange}
                    />
                    Merchant
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="admin"
                      checked={editedUserData.role === "admin"}
                      onChange={handleOptionChange}
                    />
                    Admin
                  </label>
                </div>
                <div className="input-group-admin-user">
                  <label>
                    <input
                      type="radio"
                      value="false"
                      checked={editedUserData.verified === false}
                      onChange={handleVerifiedChange}
                    />
                    Not Verified
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="true"
                      checked={editedUserData.verified === true}
                      onChange={handleVerifiedChange}
                    />
                    Verified
                  </label>
                </div>
                <button type="submit">Save</button>
                <button onClick={() => setEditedUserData(null)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserForm;
