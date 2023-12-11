import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TransactionForm.css";

const TransactionForm = ({ rows }) => {
  const [data, setData] = useState(rows);
  const [editedTransactionData, seteditedTransactionData] = useState();

  const handleOptionChange = (event) => {
    seteditedTransactionData((prevData) => ({
      ...prevData,
      moneyType: event.target.value,
    }));
  };
  const handleDeleteTransaction = async (e, id) => {
    e.preventDefault();
    const confirmation = confirm(
      `Are you sure you want to delet this transaction`
    );
    if (confirmation) {
      try {
        const response = await axios.delete(
          `http://localhost:4000/api/transactions/${id}`
        );
        console.log("deleted successfully");

        const updatedData = data.filter((row) => row.id !== id);
        setData(updatedData);
        toast.success(` transaction Deleted Successfully!`, {
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

  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "date",
      label: "Date",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          const rowData = data[tableMeta.rowIndex];
          const dt = new Date(value).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          return dt ? dt : "N/A";
        },
      },
    },
    {
      name: "date",
      label: "Time",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          const rowData = data[tableMeta.rowIndex];
          const dt = value.slice(11,19)
          return dt ? dt : "N/A";
        },
      },
    },

    {
      name: "senderId",
      label: "Sender Email",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          const rowData = data[tableMeta.rowIndex];
          const senderEmail = rowData.sender?.email;

          return senderEmail ? senderEmail : "N/A";
        },
      },
    },
    {
      name: "receiverId",
      label: "Receiver Email",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          const rowData = data[tableMeta.rowIndex];
          const receiverEmail = rowData.receiver?.email;

          return receiverEmail ? receiverEmail : "N/A";
        },
      },
    },
    {
      name: "amount",
      label: "Amount",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          const rowData = data[tableMeta.rowIndex];
          const promoCode = rowData.promotion?.promoCode;

          return "$" + value;
        },
      },
    },
    {
      name: "moneyType",
      label: "Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "promotion",
      label: "Promo Code",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          const rowData = data[tableMeta.rowIndex];
          const promoCode = rowData.promotion?.promoCode;

          return promoCode ? promoCode : "N/A";
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
          const transactionId = data[rowIndex].id;

          return (
            <div>
              <button
                onClick={(e) => {
                  handleDeleteTransaction(e, transactionId);
                }}
              >
                Delete
              </button>
              <button
                onClick={(e) => {
                  seteditedTransactionData(data[rowIndex]);
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
    selectableRowsHideCheckboxes: true,
  };

  const handleEditTransaction = async (e) => {
    e.preventDefault();
    const confirmUpdate = window.confirm(
      "Are you sure you want to update this transaction?"
    );
    if (!confirmUpdate) {
      return;
    } else {
      try {
        const response = await axios.patch(
          `http://localhost:4000/api/transactions/${editedTransactionData.id}`,
          editedTransactionData
        );
        console.log("transaction updated successfully:", response.data);

        // Update the transaction data in the state
        const updatedData = data.map((row) => {
          if (row.id === editedTransactionData.id) {
            return {
              ...row,
              ...editedTransactionData,
            };
          }
          return row;
        });
        setData(updatedData);

        toast.success("transaction updated successfully!", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          theme: "dark",
        });

        seteditedTransactionData(null);
      } catch (error) {
        console.error("Error updating transaction:", error);
        toast.error("Failed to update transaction. Please try again later.", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          theme: "dark",
        });
      }
    }
  };

  return (
    <div className="TransactionForm">
      <div className="Formtable">
        <MUIDataTable
          title={"All transactions"}
          data={data}
          columns={columns}
          options={options}
        />
      </div>

      <div>
        {editedTransactionData && (
          <div>
            <div className="EditTransactionModal">
              <form id="ediTransaction" onSubmit={handleEditTransaction}>
                <div className="input-group-admin-transaction">
                  <input
                    type="text"
                    value={editedTransactionData.createdAt}
                    onChange={(e) => {
                      seteditedTransactionData({
                        ...editedTransactionData,
                        date: e.target.value,
                      });
                    }}
                    placeholder="Date"
                    required
                  />
                  <FaPerson className="input-icon-admin-transaction" />
                </div>
                <div className="input-group-admin-transaction">
                  <input
                    value={editedTransactionData.sender.id}
                    onChange={(e) => {
                      seteditedTransactionData({
                        ...editedTransactionData,
                        senderId: e.target.value,
                      });
                    }}
                    type="text"
                    placeholder="Sender-ID"
                    required
                  />
                  <FaPerson className="input-icon-admin-transaction" />
                </div>
                <div className="input-group-admin-transaction">
                  <input
                    type="text"
                    value={editedTransactionData.receiver.id}
                    onChange={(e) => {
                      seteditedTransactionData({
                        ...editedTransactionData,
                        receiverId: e.target.value,
                      });
                    }}
                    placeholder="Receiver-ID"
                    required
                  />
                  <FaPhone className="input-icon-admin-transaction" />
                </div>
                <div className="input-group-admin-transaction">
                  <input
                    value={editedTransactionData.amount}
                    onChange={(e) => {
                      seteditedTransactionData({
                        ...editedTransactionData,
                        amount: e.target.value,
                      });
                    }}
                    type="number"
                    placeholder="Amount"
                    required
                  />
                  <MdEmail className="input-icon-admin-transaction" />
                </div>
                <div className="input-group-admin-transaction">
                  <label>
                    <input
                      type="radio"
                      value="usd"
                      checked={editedTransactionData.moneyType === "usd"}
                      onChange={handleOptionChange}
                    />
                    USD
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="usdt"
                      checked={editedTransactionData.moneyType === "usdt"}
                      onChange={handleOptionChange}
                    />
                    USDT
                  </label>
                </div>

                <button type="submit">Save</button>
                <button onClick={() => seteditedTransactionData(null)}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionForm;
