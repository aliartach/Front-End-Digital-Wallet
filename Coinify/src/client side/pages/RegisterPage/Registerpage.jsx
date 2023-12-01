import { useState , useEffect } from "react";
import "../RegisterPage/Registerpage.css";
import React from "react";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import { useLocation, useNavigate } from "react-router-dom";

/// handle navigation
const RegisterPage = () => {
  const location = useLocation();
  const [givenClass, setGivenClass] = useState(location.state?.givenClass);
  const navigate = useNavigate();
  
  // for the radio button
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  

  // for the requried fields 
  const handleSignUp = () => {
    const inputs = document.querySelectorAll(".form.sign-up input[required]");
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.value) {
        isValid = false;
        input.classList.add("error");
      } else {
        input.classList.remove("error");
      }
    });

    if (!isValid) {
      alert("Please fill in all the required fields.");
    } else {
      // Perform sign up action
    }
  };

  return (
    <div
      id="container"
      className={givenClass ? "Signin-Signup sign-up" : "Signin-Signup sign-in"}
    >
      {/* FORM SECTION */}
      <div className="row">
        {/* SIGN UP */}
        <div className="col align-items-center flex-col sign-up">
          <div className="form-wrapper align-items-center">
            <div id="Register" className="form sign-up">
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input type="text" placeholder="First-Name" required />
                <FaPerson className="input-icon" />
              </div>
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input type="text" placeholder="Last-Name" required />
                <FaPerson className="input-icon" />
              </div>
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input type="text" placeholder="Phone-Number" required />
                <FaPhone className="input-icon" />
              </div>
              <div className="input-group">
                <i className="bx bx-mail-send"></i>
                <input type="email" placeholder="Email" required />
                <MdEmail className="input-icon" />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input type="password" placeholder="Password" required />
                <RiLockPasswordFill className="input-icon" />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="password"
                  placeholder="Confirm password"
                  required
                />
                <GiConfirmed className="input-icon" />
              </div>
              <div className="input-group">
                <label>
                  <input
                    type="radio"
                    value="mercheat"
                    checked={selectedOption === "mercheat"}
                    onChange={handleOptionChange}
                  />
                  Merchant
                </label>
                <label>
                  <input
                    type="radio"
                    value="user"
                    checked={selectedOption === "user"}
                    onChange={handleOptionChange}
                  />
                  User
                </label>
              </div>
              <button type="submit" onClick={handleSignUp}>
                Sign up
              </button>
              <p>
                <span>Already have an account?</span>
                <b
                  onClick={() => {
                    setGivenClass(false);
                  }}
                  className="pointer"
                >
                  Sign in here
                </b>
              </p>
            </div>
          </div>
        </div>
        {/* END SIGN UP */}
        {/* SIGN IN */}
        <div className="col align-items-center flex-col sign-in">
          <div className="form-wrapper align-items-center">
            <div id="Signin" className="form sign-in">
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input type="text" placeholder="Email-Address" />
                <MdEmail className="input-icon" />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input type="password" placeholder="Password" />
                <RiLockPasswordFill className="input-icon" />
              </div>
              <button onClick={handleSignUp}>Sign in</button>

              <p>
                <input className="rememberMe" type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe">Remember Me</label>
                <b>Forgot password?</b>
              </p>
              <p>
                <span>Don't have an account?</span>
                <b
                  onClick={() => {
                    setGivenClass(true);
                  }}
                  className="pointer"
                >
                  Sign up here
                </b>
              </p>
            </div>
          </div>
          <div className="form-wrapper"></div>
        </div>
        {/* END SIGN IN */}
      </div>
      {/* END FORM SECTION */}
      {/* CONTENT SECTION */}
      <div className="row content-row">
        {/* SIGN IN CONTENT */}
        <div className="col align-items-center flex-col">
          <div className="text sign-in">
            <h2>Welcome</h2>
          </div>
          <div className="img sign-in"></div>
        </div>
        {/* END SIGN IN CONTENT */}
        {/* SIGN UPCONTENT */}
        <div className="col align-items-center flex-col">
          <div className="img sign-up"></div>
          <div className="text sign-up">
            <h2>Join with us</h2>
          </div>
        </div>
        {/* END SIGN UP CONTENT */}
      </div>
      {/* END CONTENT SECTION */}
    </div>
  );
};

export default RegisterPage;
