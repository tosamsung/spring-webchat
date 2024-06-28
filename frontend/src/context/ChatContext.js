import { useRef, useContext, createContext } from "react";
import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import Stomp from "stompjs";

import { AppContext } from "../context/AppContext";

import ValidateUtil from "../util/ValidateUtil";
import GroupService from "../Service/GroupService";
import MessageService from "../Service/MessageService";
import Reply from "../components/chat/chatbox/Reply";
import Sender from "../components/chat/chatbox/Sender";

export const ChatContext = React.createContext({});

const ChatProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [groupChat, setGroupChat] = useState({});
  const groupChatRef = useRef(groupChat);

  const [listMessage, setListMessage] = useState([]);
  const [listContact, setListContact] = useState([]);
  const listContactRef = useRef([]);

  const { user, fetchAllRelatiohsips } = useContext(AppContext);
  const validateUtil = new ValidateUtil();
  const stompClientRef = useRef([]);

  //----------------------------- WebSocket Connection ----------------------

  const connectws = () => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect(
      {},
      () => {
        setIsConnected(true);

        onConnected(stompClient);
      },
      onError
    );

    stompClientRef.current = stompClient;
  };

  const onConnected = (client) => {
    client.subscribe(`/user/${user.userName}/private`, onMessage);
    client.subscribe(`/user/${user.userName}/friend`, onFriendReq);
    client.subscribe(`/user/${user.userName}/user-status`, onUserOnline);
    stompClientRef.current.send("/app/userOnline", {}, user.userName + "");
  };

  const onError = (err) => {
    setIsConnected(false);
  };
  const onFriendReq = (payload) => {
    // let req = JSON.parse(payload.body);
    fetchAllRelatiohsips();
  };

  const onUserOnline = (payload) => {
    try {
      let group = JSON.parse(payload.body);
      // console.log( listContactRef.current);

      const index = listContactRef.current.findIndex(
        (contact) => contact.id === group.id
      );

      if (index !== -1) {
        let updatedListContact = [...listContactRef.current];
        updatedListContact[index] = group;
        setListContact(updatedListContact);
      }
    } catch (error) {
      console.error("Error parsing payload:", error);
    }
  };

  useEffect(() => {
    // console.log("listContact updated:", listContact);
  }, [listContact]);
  //----------------------------- Message Handling ----------------------

  const onMessage = (payload) => {
    const payloadData = JSON.parse(payload.body);
    if (payloadData.type) {
      setListMessage((prevListMessage) => [
        ...prevListMessage,
        payloadData.senderId === user.id ? (
          <Reply message={payloadData} key={prevListMessage.length} />
        ) : (
          <Sender
            message={payloadData}
            sender={findSender(payloadData.senderId)}
            key={prevListMessage.length}
          />
        ),
      ]);
    }
  };

  const handleSendMessage = (message, typeMes) => {
    if (validateUtil.isEmptyString(message)) {
      return;
    }
    if (isEmpty(groupChat)) {
      return;
    }
    const newMessage = {
      groupId: groupChat.id,
      senderId: user.id,
      message: message,
      type: typeMes,
      messageStatus: "SENT",
    };
    if (isConnected && stompClientRef.current) {
      stompClientRef.current.send(
        "/app/private-message",
        {},
        JSON.stringify(newMessage)
      );
    }
  };

  //----------------------------- Initial Data Loading ----------------------

  const getGroupChat = async () => {
    try {
      const listGroup = await GroupService.getGroupChatsByMembername(
        user.userName
      );

      listContactRef.current = listGroup;

      setListContact(listGroup);
      if (listGroup.length > 0) {
        setGroupChat(listGroup[0]);
      }
    } catch (error) {
      console.error("Error fetching group chats:", error);
    }
  };

  const loadListMessage = async (groupId) => {
    try {
      if (groupId) {
        const result = await MessageService.getMessageByGroupId(groupId);
        const newListMessage = result.map((message, index) =>
          message.senderId === user.id ? (
            <Reply message={message} key={index} />
          ) : (
            <Sender
              message={message}
              sender={findSender(message.senderId)}
              key={index}
            />
          )
        );
        setListMessage(newListMessage);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  //----------------------------- Effect Hooks -----------------------------

  useEffect(() => {
    if (user && user.userName) {
      connectws();
      getGroupChat();
    }
    const cleanup = () => {
      if (stompClientRef.current && stompClientRef.current.connected) {
        stompClientRef.current.disconnect();
      }
    };

    // Return cleanup function for useEffect
    return cleanup;
  }, [user]);

  useEffect(() => {
    groupChatRef.current = groupChat;
    if (listMessage && listMessage.length > 0) {
      setListMessage([]);
    }
    loadListMessage(groupChat.id);
  }, [groupChat]);

  //----------------------------- Utility Functions -----------------------------

  const findSender = (senderId) => {
    if (groupChatRef.current && groupChatRef.current.members) {
      return groupChatRef.current.members.find(
        (member) => member.id === senderId
      );
    }
    return null;
  };

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  //----------------------------- Context Provider -----------------------------

  return (
    <ChatContext.Provider
      value={{
        listContact,
        listContactRef,
        stompClient: stompClientRef.current,
        groupChat,
        listMessage,
        setGroupChat,
        getGroupChat,
        handleSendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
