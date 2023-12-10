import "./PromotionTabel.css";
import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiSolidDiscount } from "react-icons/bi";
import { LuSubtitles } from "react-icons/lu";
import { IoArrowBackCircle } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PromotionTabel = ({ rows }) => {
  const [data, setData] = useState(rows);
  const [editedpromotionData, seteditedpromotionData] = useState();
  console.log(data);
  useEffect(() => {
    setData(rows);
  }, [rows]);

  const handleDeletepromotion = async (e, id) => {
    e.preventDefault();
    const confirmation = confirm(
      `Are you sure you want to delet this promotion`
    );
    if (confirmation) {
      try {
        const response = await axios.delete(
          `http://localhost:4000/api/promotions/${id}`
        );

        const updatedData = data.filter((row) => row.id !== id);
        setData(updatedData);
        toast.success(` promotion Deleted Successfully!`, {
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
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "user",
      label: "Merchant",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          const rowData = data[tableMeta.rowIndex];
          const Email = rowData.user?.email;

          return Email ? Email : "N/A";
        },
      },
    },
    {
      name: "description",
      label: "Description",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "startDate",
      label: "Start Date",
      options: {
        filter: false,
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
      name: "endDate",
      label: "End Date",
      options: {
        filter: false,
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
      name: "promoCode",
      label: "Promo Code",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "percentage",
      label: "Percentage",
      options: {
        filter: true,
        sort: true,
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
          const promotionId = data[rowIndex].id;

          return (
            <div>
              <button
                onClick={(e) => {
                  handleDeletepromotion(e, promotionId);
                }}
              >
                Delete
              </button>
              <button
                onClick={(e) => {
                  seteditedpromotionData(data[rowIndex]);
                  console.log("ptbefore", editedpromotionData);
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

  const handleEditpromotion = async (e) => {
    e.preventDefault();
    console.log("pthandle", editedpromotionData);

    const confirmUpdate = window.confirm(
      "Are you sure you want to update this promotion?"
    );
    if (!confirmUpdate) {
      return;
    } else {
      try {
        const response = await axios.put(
          `http://localhost:4000/api/promotions/${editedpromotionData.id}`,
          editedpromotionData
        );
        console.log("promotion updated successfully:", response.data);

        // Update the promotion data in the state
        const updatedData = data.map((row) => {
          if (row.id === editedpromotionData.id) {
            return {
              ...row,
              ...editedpromotionData,
            };
          }
          return row;
        });
        setData(updatedData);

        toast.success("promotion updated successfully!", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          theme: "dark",
        });

        seteditedpromotionData(null);
      } catch (error) {
        console.error("Error updating promotion:", error);
        toast.error("Failed to update promotion. Please try again later.", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          theme: "dark",
        });
      }
    }
  };

  return (
    <div className="PromotionsForm">
      <div className="Formtable">
        <MUIDataTable
          title={"All Promotions"}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
      {/* <div>
        {editedpromotionData && (
          <div>
            <div className="EditPromotionModal">
              <form id="edipromotion" onSubmit={handleEditpromotion}>
                <div className="input-group-admin-promotion">
                  <input
                    type="text"
                    value={editedpromotionData.description}
                    onChange={(e) => {
                      seteditedpromotionData({
                        ...editedpromotionData,
                        description: e.target.value,
                      });
                    }}
                    placeholder="Description"
                    required
                  />
                  <FaPerson className="input-icon-admin-promotion" />
                </div>
                <div className="input-group-admin-promotion">
                  <input
                    value={
                      new Date(editedpromotionData.startDate)
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={(e) => {
                      seteditedpromotionData({
                        ...editedpromotionData,
                        startDate: new Date(e.target.value),
                      });
                    }}
                    type="date"
                    placeholder="Start-Date"
                    required
                  />
                  <FaPerson className="input-icon-admin-promotion" />
                </div>
                <div className="input-group-admin-promotion">
                  <input
                    type="date"
                    value={
                      new Date(editedpromotionData.endDate)
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={(e) => {
                      seteditedpromotionData({
                        ...editedpromotionData,
                        endDate: new Date(e.target.value),
                      });
                    }}
                    placeholder="End-Date"
                    required
                  />
                  <FaPhone className="input-icon-admin-promotion" />
                </div>
                <div className="input-group-admin-promotion">
                  <input
                    value={editedpromotionData.promoCode}
                    onChange={(e) => {
                      seteditedpromotionData({
                        ...editedpromotionData,
                        promoCode: e.target.value,
                      });
                    }}
                    type="text"
                    placeholder="Promotion Code"
                    required
                  />
                  <MdEmail className="input-icon-admin-promotion" />
                </div>
                <div className="input-group-admin-promotion">
                  <input
                    value={editedpromotionData.percentage}
                    onChange={(e) => {
                      seteditedpromotionData({
                        ...editedpromotionData,
                        percentage: e.target.value,
                      });
                    }}
                    type="number"
                    placeholder="Percentage %"
                    required
                  />
                  <MdEmail className="input-icon-admin-promotion" />
                </div>

                <button type="submit">Save</button>
                <button onClick={() => seteditedpromotionData(null)}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div> */}

      {editedpromotionData && (
        <div>
          <form onSubmit={handleEditpromotion} className="PromotionForm">
            <div className="Promotionformheader">
              <IoArrowBackCircle
                className="backbutton"
                onClick={() => {
                  seteditedpromotionData(null);
                }}
              />
              <h3 className="AddPromotion">Edit Promotion</h3>
              <BiSolidDiscount className="promotionformlogo" />
            </div>
            <div className="goldline"></div>
            <div className="DescriptionHeader">
              <LuSubtitles className="DescriptionFormIcon" />
              <input
                type="text"
                className="Descriptioninput"
                value={editedpromotionData.description}
                onChange={(e) => {
                  seteditedpromotionData({
                    ...editedpromotionData,
                    description: e.target.value,
                  });
                }}
                placeholder="Description"
                required
              />
            </div>
            <br></br>
            <br></br>
            <div className="start-end">
              <div className="startDateDiv">
                <h3 className="h3Startdate">Startdate</h3>

                <input
                  className="StartDate"
                  value={
                    new Date(editedpromotionData.startDate)
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={(e) => {
                    seteditedpromotionData({
                      ...editedpromotionData,
                      startDate: new Date(e.target.value),
                    });
                  }}
                  type="date"
                  placeholder="Start-Date"
                  required
                />
              </div>
              <div className="EndDateDiv">
                <h3 className="h3EndDate">EndDate</h3>

                <input
                  className="EndDate"
                  type="date"
                  value={
                    new Date(editedpromotionData.endDate)
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={(e) => {
                    seteditedpromotionData({
                      ...editedpromotionData,
                      endDate: new Date(e.target.value),
                    });
                  }}
                  placeholder="End-Date"
                  required
                />
              </div>
            </div>
            <div className="promocodeandpercantage">
              <div className="promoDiv">
                <h4>Enter Promocode</h4>

                <input
                  className="promo"
                  value={editedpromotionData.promoCode}
                  onChange={(e) => {
                    seteditedpromotionData({
                      ...editedpromotionData,
                      promoCode: e.target.value,
                    });
                  }}
                  type="text"
                  placeholder="Promotion Code"
                  required
                />
              </div>
              <div className="percantageDiv">
                <h4>Enter percantage</h4>

                <input
                  className="percentage"
                  value={editedpromotionData.percentage}
                  onChange={(e) => {
                    seteditedpromotionData({
                      ...editedpromotionData,
                      percentage: e.target.value,
                    });
                  }}
                  type="number"
                  placeholder="Percentage %"
                  required
                />
              </div>
            </div>
            <div className="AddPromotionButton">
              <button className="buttontext" type="submit">
                Edit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PromotionTabel;
