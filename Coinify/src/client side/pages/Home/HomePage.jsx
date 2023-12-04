import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Homeimage from "../../../assets/homepage1.png";
import "../Home/HomePage.css";
// import Switch from "../Switchprop.jsx"
import { Link } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const homePage = document.querySelector(".HomePage");
    homePage.classList.add("show");
  }, []);

  return (
    <>

      <link
        href="https://fonts.googleapis.com/css?family=Kumar One"
        rel="stylesheet"
      ></link>
      <div className="HomePage">
      <Navbar />

        {/* <Switch/> */}
        <div id="topside" className="topside">
          <div className="Leftside">
            <p className="leftsideH">
              Simplify your <br></br>Payments with
            </p>
            <h1 className="LogoName">COINIFY</h1>
            <div className="buttons">
              {" "}
              <button
                onClick={() => {
                  navigate("/Registerpage", {
                    replace: true,
                    state: { givenClass: false },
                  });
                }}
                className="Signinbutton"
           
              >
                Sign in
              </button>{" "}
              <button
                onClick={() => {
                  navigate("/Registerpage", {
                    replace: true,
                    state: { givenClass: true },
                  });
                }}
                className="Registerbutton"
     
              >
                Register
              </button>
            </div>
          </div>

          <div className="Rightside">
            <img className="Rightside" src={Homeimage}></img>
          </div>
        </div>

        <div className="bottomside">
          <div className="card">
            <div className="main-content">
              <div className="header">
                <span>Safty gurarantee</span>
              </div>
              <p className="heading">
                We make sure your money will be safe 100% gurarantee
              </p>
              <div className="categories">
                <span>Secure</span>
                <span>Safe</span>
              </div>
            </div>
            <div className="footerHome">Coinify</div>
          </div>
          <div className="card">
            <div className="main-content">
              <div className="header">
                <span>Send money in minutes</span>
              </div>
              <p className="heading">
                Your Money will be sent faster than your blue wallet
              </p>
              <div className="categories">
                <span>Fast</span>
                <span>Easy</span>
              </div>
            </div>
            <div className="footerHome">Coinify</div>
          </div>
          <div className="card">
            <div className="main-content">
              <div className="header">
                <span>Secure & trusted USDT transactions</span>
              </div>
              <p className="heading">
                Experience seamless and secure USDT transfers with our platform,
                ensuring fast and reliable transactions for your digital assets
              </p>
              <div className="categories">
                <span>Secure</span>
                <span>Trusted</span>
              </div>
            </div>
            <div className="footerHome">Coinify</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
