import { useState, useEffect } from "react";
import "../RegisterPage/Registerpage.css";
import React from "react";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../../../Context/useUser.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/// handle navigation
const RegisterPage = () => {
  const location = useLocation();
  const [givenClass, setGivenClass] = useState(location.state?.givenClass);
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  // for the radio button

  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [role, setRole] = useState("user");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    }
  }, []);

  // for the requried fields
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirm) {
        toast.error("Passwords do not match", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
        return;
      }

      const response = await axios.post("http://localhost:4000/api/users/", {
        email,
        password,
        firstName,
        lastName,
        phone,
        role,
      });

      if (response.status === 201) {
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setEmail("");
        setPassword("");
        setConfirm("");
        setGivenClass(false);
        toast.success("Registration successful", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Error: Email or Phone number already exists", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };
  const handleOptionChange = (event) => {
    setRole(event.target.value);
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all the required fields", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/signin",
        {
          email: email,
          password: password,
        }
      );

      if (response.data.success && response.data.verified === true) {
        const token = response.data.accessToken;
        localStorage.setItem("token", token);
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);

        toast.success(`${decodedToken.firstName} Logged In Successfully!`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        if (response.data.role == "merchant") {
          navigate(`/merchanthomepage/`);
        }
        if (response.data.role == "user") {
          navigate(`/userhomepage/`);
        }
        if (response.data.role == "admin") {
          navigate(`/adminHomepage/`);
        }

        setEmail("");
        setPassword("");
      } else {
        toast.error("Error: New user should be verified by the admin first", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error: Email or Password not correct", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div
        id="container"
        className={
          givenClass ? "Signin-Signup sign-up" : "Signin-Signup sign-in"
        }
      >
        {/* FORM SECTION */}
        <div className="row">
          {/* SIGN UP */}
          <div className="col align-items-center flex-col sign-up">
            <div className="form-wrapper align-items-center">
              <form
                id="Register"
                className="form sign-up"
                onSubmit={handleSignUp}
              >
                <div className="input-group">
                  <i className="bx bxs-user"></i>
                  <input
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    type="text"
                    value={firstName}
                    placeholder="First-Name"
                    required
                  />
                  <FaPerson className="input-icon" />
                </div>
                <div className="input-group">
                  <i className="bx bxs-user"></i>
                  <input
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    type="text"
                    value={lastName}
                    placeholder="Last-Name"
                    required
                  />
                  <FaPerson className="input-icon" />
                </div>
                <div className="input-group">
                  <i className="bx bxs-user"></i>
                  <input
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                    type="text"
                    value={phone}
                    placeholder="Phone-Number"
                    required
                  />
                  <FaPhone className="input-icon" />
                </div>
                <div className="input-group">
                  <i className="bx bx-mail-send"></i>
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    value={email}
                    placeholder="Email"
                    required
                  />
                  <MdEmail className="input-icon" />
                </div>
                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type="password"
                    value={password}
                    placeholder="Password"
                    required
                  />
                  <RiLockPasswordFill className="input-icon" />
                </div>
                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input
                    value={confirm}
                    onChange={(e) => {
                      setConfirm(e.target.value);
                    }}
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
                      value="user"
                      checked={role === "user"}
                      onChange={handleOptionChange}
                    />
                    User
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="merchant"
                      checked={role === "merchant"}
                      onChange={handleOptionChange}
                    />
                    Merchant
                  </label>
                </div>
                <button type="submit">Sign up</button>
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
              </form>
            </div>
          </div>
          {/* END SIGN UP */}
          {/* SIGN IN */}
          <div className="col align-items-center flex-col sign-in">
            <div className="form-wrapper align-items-center">
              <form
                id="Signin"
                className="form sign-in"
                onSubmit={handleSignin}
              >
                <div className="input-group">
                  <i className="bx bxs-user"></i>
                  <input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="text"
                    placeholder="Email-Address"
                    required
                  />
                  <MdEmail className="input-icon" />
                </div>
                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type="password"
                    placeholder="Password"
                    required
                  />
                  <RiLockPasswordFill className="input-icon" />
                </div>
                <button type="submit">Sign in</button>

                <p>
                  <input
                    className="rememberMe"
                    type="checkbox"
                    id="rememberMe"
                  />
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
              </form>
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
    </>
  );
};

export default RegisterPage;
