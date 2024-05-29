import { createContext } from "react";
import React, { useEffect, useState } from "react";
import UserService from "../Service/UserService";

export const AppContext = createContext({});
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const result = async () => {
      try {
        const user = await UserService.getUser();
        console.log(user);
        setUser(user);
        setAuth(true);
      } catch (error) {
        setAuth(false);
        console.log("err");
      }
    };
    result();
  }, []);
  return (
    <AppContext.Provider value={{ user, auth, setAuth }}>
      {children}
    </AppContext.Provider>
  );
};
