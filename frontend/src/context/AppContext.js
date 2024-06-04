import { createContext } from "react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../Service/UserService";
import SockJS from "sockjs-client";
import { over } from "stompjs";

export const AppContext = createContext({});
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();
// --------------------- auth user----------------------------
  const authUser = async () => {
    try {
      const user = await UserService.getUser();
      setUser(user);
      setAuth(true);
    } catch (error) {
      setAuth(false);
      console.log(error);
    }
  };
  useEffect(() => {
    authUser();
  }, []);
  useEffect(() => {
    if (!auth) {
      navigate("/signin");
    }
  }, [auth]);


  return (
    <AppContext.Provider value={{ user, auth, setAuth }}>
      {children}
    </AppContext.Provider>
  );
};
