import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token,setToken] = useState(localStorage.getItem("token"))
  const [socket, setSocket] = useState(null);

  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    const decodedUser = decodeToken(token);
    setUser(decodedUser);
    if (decodedUser) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  useEffect(() => {
    if (socket && user) {
      socket.emit("newUser", user.email);
      console.log("Context", socket);
    }
  }, [socket, user]);

  return (
    <UserContext.Provider value={{ user, setUser, socket, setSocket }}>
      {children}
    </UserContext.Provider>
  );
};
