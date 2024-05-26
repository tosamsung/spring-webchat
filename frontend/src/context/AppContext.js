import { createContext } from "react";
import React, { useEffect, useState } from "react";
import UserService from "../Service/UserService";

export const AppContext = createContext({});
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState({});

  useEffect(() => {
    UserService.getUser().then((data) => {
      console.log(data);
      setAuth(true);
      setUser(data);
    }).catch((error=>{
      setAuth(false);
    }));
  }, []);
  return <AppContext.Provider value={{ user,auth,setAuth }}>{children}</AppContext.Provider>;
};
