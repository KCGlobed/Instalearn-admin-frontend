import React, { createContext, useState, useEffect } from "react";
import { handleProfileDetails } from "../utils/services";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const handleGetProfile = async () => {
    let response = await handleProfileDetails();
    setUser(response.res.data);
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, handleGetProfile }}>
      {children}
    </UserContext.Provider>
  );
};
