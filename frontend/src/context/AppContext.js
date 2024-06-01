import { createContext } from "react";
import React, { useEffect, useState } from "react";
import UserService from "../Service/UserService";
import SocketService from "../Service/SocketService";

export const AppContext = createContext({});
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const result = async () => {
      try {
        const user = await UserService.getUser();
        // SocketService.ConnectWs(user.userName)
        // console.log(user);
        setUser(user);
        setAuth(true);
      } catch (error) {
        setAuth(false);
        console.log(error);
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
