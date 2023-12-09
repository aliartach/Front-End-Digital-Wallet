import React, { useState, useEffect } from "react";
import axios from "axios";
import "../AddPromotion-Form/Promotion-Form.css";
import { BiSolidDiscount } from "react-icons/bi";
import { LuSubtitles } from "react-icons/lu";
import { IoArrowBackCircle } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";


const PromotionForm = ({ toggle }) => {
  const [description, setdescription] = useState("");
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [promoCode, setpromoCode] = useState("");
  const [percentage, setpercentage] = useState("");

  const AddPromotions = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/promotions/",
        {
          description,
          startDate,
          endDate,
          promoCode,
          percentage,
        }
      );

      if (response.status === 201) {
        setdescription("");
        setstartDate("");
        setendDate("");
        setpromoCode("");
        setpercentage("");
        toast.success("Promotion Added successfuly", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Error: PromoCode already exists", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };
  return (
    <div>
      <form   onSubmit={AddPromotions} className="PromotionForm">
        <div className="Promotionformheader">
          <IoArrowBackCircle
            className="backbutton"
            onClick={() => {
              toggle();
            }}
          />
          <h3 className="AddPromotion">Add Promotion</h3>
          <BiSolidDiscount className="promotionformlogo" />
        </div>
        <div className="goldline"></div>
        <div className="DescriptionHeader">
          <LuSubtitles className="DescriptionFormIcon" />
          <input
            onChange={(e) => {
              setdescription(e.target.value);
            }}
            placeholder="Description"
            value={description}
            className="Descriptioninput"
            type="text"
          ></input>
        </div>
        <br></br>
        <br></br>
        <div className="start-end">
          <div className="startDateDiv">
            <h3 className="h3Startdate">Startdate</h3>
            <input
              onChange={(e) => {
                setstartDate(e.target.value);
              }}
              value={startDate}
              className="StartDate"
              type="date"
            />
          </div>
          <div className="EndDateDiv">
            <h3 className="h3EndDate">EndDate</h3>
            <input
              onChange={(e) => {
                setendDate(e.target.value);
              }}
              value={endDate}
              className="EndDate"
              type="date"
            />
          </div>
        </div>
        <div className="promocodeandpercantage">
          <div className="promoDiv">
            <h4>Enter Promocode</h4>
            <input
              onChange={(e) => {
                setpromoCode(e.target.value);
              }}
              value={promoCode}
              className="promo"
              type="text"
            />
          </div>
          <div className="percantageDiv">
            <h4>Enter percantage</h4>
            <input
              onChange={(e) => {
                setpercentage(e.target.value);
              }}
              value={percentage}
              className="percentage"
              type="text"
            />
          </div>
        </div>
        <div className="AddPromotionButton">
          <button className="buttontext" type="submit">
            ADD
          </button>
        </div>
      </form>
    </div>
  );
};
export default PromotionForm;
