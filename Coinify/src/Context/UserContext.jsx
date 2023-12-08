import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      }
    };
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
