import { useRef, useContext, createContext } from "react";
import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { AppContext } from "../context/AppContext";

import ValidateUtil from "../util/ValidateUtil";
import GroupService from "../Service/GroupService";
import MessageService from "../Service/MessageService";
import Reply from "../components/chat/chatbox/Reply";
import Sender from "../components/chat/chatbox/Sender";

export const ChatContext = createContext({});
export const ChatProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [groupChat, setGroupChat] = useState({});
  const groupChatRef = useRef(groupChat);

  const [listMessage, setListMessage] = useState([]);
  const [listContact, setListContact] = useState([]);

  const { user, auth } = useContext(AppContext);
  const validateUtil = new ValidateUtil();
  const stompClientRef = useRef(null);

  //----------------------------- web socket----------------------
  const connectws = () => {
    const Sock = new SockJS("http://localhost:8080/ws");
    const client = over(Sock);
    client.connect({}, () => onConnected(client), onError);
    stompClientRef.current = client;
  };

  const onConnected = (client) => {
    client.subscribe("/user/" + user.userName + "/private", onPrivateMessage);
    setIsConnected(true);
  };

  const onError = (err) => {
    console.log(err);
  };

  //-----------------------------handle message----------------------

  const onPrivateMessage = (payload) => {
    const payloadData = JSON.parse(payload.body);
    if (payloadData.type) {
      if (payloadData.senderId === user.id) {
        setListMessage((prevListMessage) => [
          ...prevListMessage,
          <Reply message={payloadData} key={prevListMessage.length} />,
        ]);
      } else {
        setListMessage((prevListMessage) => [
          ...prevListMessage,
          <Sender
            message={payloadData}
            sender={findSender(payloadData.senderId)}
            key={prevListMessage.length}
          />,
        ]);
      }
    }
  };
// function handle send message
  const handleSendMessage = (message, typeMes) => {
    if (validateUtil.isEmptyString(message)) {
      console.log("empty");
      return;
    }
    if (isEmpty(groupChat)) {
      console.log("empty group chat");
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
    } else {
      console.log("WebSocket connection not established yet.");
    }
  };
  const getGroupChat = async () => {
    const listGroup = await GroupService.getGroupChatsByMembername(
      user.userName
    );
    setListContact(listGroup);
    if (listGroup) {
      setGroupChat(listGroup[0]);
    }
  };
  const loadListMessage = async (groupId) => {
    if (groupId) {
      const result = await MessageService.getMessageByGroupId(groupId);
      const newListMessage=result.map((message, index) => {
        if (message.senderId === user.id) {
          return <Reply message={message} key={index} />;
        } else {
          return (
            <Sender
              message={message}
              sender={findSender(message.senderId)}
              key={index}
            />
          );
        }
      });
      setListMessage(newListMessage);
    }
  };
  // connect websocket
  useEffect(() => {
    if (user && user.userName) {
      connectws();
      getGroupChat();
    }

    return () => {
      if (stompClientRef.current !== null) {
        stompClientRef.current.disconnect(() => {
          console.log("Disconnected from WebSocket");
        });
      }
    };
  }, [user, auth]);
  //  load messages when groupchat changes
  useEffect(() => {
    groupChatRef.current = groupChat;
    if (listMessage && listMessage.length > 0) {
      listMessage.length = 0;
      setListMessage(listMessage);
    }
    loadListMessage(groupChat.id);
  }, [groupChat]);

  // --------------------get sender-----------------
  const findSender = (senderId) => {
    if (groupChatRef.current && groupChatRef.current.members) {
      return groupChatRef.current.members.find(
        (member) => member.id === senderId
      );
    }
    return null;
  };
  return (
    <ChatContext.Provider
      value={{
        listContact,
        stompClient: stompClientRef.current,
        groupChat,
        listMessage,
        setGroupChat,
        handleSendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
};
