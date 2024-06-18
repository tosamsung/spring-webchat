import { createContext } from "react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../Service/UserService";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import FriendService from "../Service/FriendService";

export const AppContext = createContext({});
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState({});
  
  const [requestFriends, setRequestFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const [sentRequest, setSentRequest] = useState([]);
  const [notFriends, setNotFriends] = useState([]);

  const navigate = useNavigate();
  //---------------------------friend--------------------------
  const fetchFriend = async () => {
    try {
      const Friends = await FriendService.getAllFriend(user.id);
      setFriends(Friends);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };
  const fectSentRequest = async () => {
    try {
      const sentRequest = await FriendService.getSentRequest(user.id);
      setSentRequest(sentRequest);
    } catch (error) {
      console.error("Error fetching sent request:", error);
    }
  };
  const fetchRequestFriends = async () => {
    try {
      const requestFriends = await FriendService.getRequestFriend(user.id);
      setRequestFriends(requestFriends);
    } catch (error) {
      console.error("Error fetching request friends:", error);
    }
  };
  const fetchNotFriend = async () => {
    try {
      const notFriends = await FriendService.getAllNotFriend(user.id);
      setNotFriends(notFriends);
      // console.log("Not friends:", notFriends);
    } catch (error) {
      console.error("Error fetching not friends:", error);
    }
  };
  const fetchAllRelatiohsips=async()=>{
    fetchFriend()
    fectSentRequest()
    fetchRequestFriends()
    fetchNotFriend()
  }
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
    <AppContext.Provider
      value={{
        user,
        auth,
        notFriends,
        friends,
        sentRequest,
        requestFriends,
        setAuth,
        fetchAllRelatiohsips,

      }}
    >
      {children}
    </AppContext.Provider>
  );
};
