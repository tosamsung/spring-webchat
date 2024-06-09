import { useRef,useContext, createContext } from "react";
import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { AppContext } from "../context/AppContext";
import ValidateUtil from "../util/ValidateUtil";
import TimeUtil from "../util/TimeUtil";
import Reply from "../components/chat/chatbox/Reply";
import Sender from "../components/chat/chatbox/Sender";

export const ChatContext = createContext({});
export const ChatProvider = ({ children }) => {
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const [groupChat, setGroupChat] = useState({});
  const groupChatRef = useRef(groupChat);

  const [listMessage, setListMessage] = useState([]);

  const [listContact, setListContact] = useState([]);

  const { user, auth } = useContext(AppContext);

  const validateUtil = new ValidateUtil();
  //----------------------------- web socket----------------------
  const connectws = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    let client = over(Sock);
    client.connect({}, () => onConnected(client), onError);
    setStompClient(client);
  };

  const onConnected = (client) => {
    client.subscribe("/user/" + user.userName + "/private", onPrivateMessage);
    setIsConnected(true);

  };

  const onError = (err) => {
    console.log(err);
  };
  //----------------------------- /web socket----------------------
  //-----------------------------handle message----------------------

  const loadListMessage = (groupChat) => {
    if (stompClient != null) {
      const requestSocket = {
        userName: user.userName,
        groupId: groupChat.id,
      };
      stompClient.send("/app/getMessages", {}, JSON.stringify(requestSocket));
    }
  };

  const onPrivateMessage = (payload) => {
    var payloadData = JSON.parse(payload.body);
    // console.log(groupChat);
    // console.log(payloadData);
    if (payloadData.type) {
      if (payloadData.senderId === user.id) {
        setListMessage((prevListMessage) => [
          ...prevListMessage,
          <Reply
            message={payloadData}
            key={prevListMessage.length}
          />
        ]);
      } else {
        setListMessage((prevListMessage) => [
          ...prevListMessage,
          <Sender
            message={payloadData}
            sender={findSender(payloadData.senderId)}
            key={prevListMessage.length}
          />
        ]);
      }
    }
    if (payloadData.action) {
      switch (payloadData.action) {
        case "FIND_LIST_GROUPCHAT":
          setListContact(payloadData.data);
          if (payloadData.data) {
            setGroupChat(payloadData.data[0]);
          }
          break;
        case "FIND_MESSAGE_BY_GROUPID":
          const newMessages = payloadData.data.map((message, index) => {
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
          setListMessage(newMessages);
          break;
        default:
          break;
      }
    }
  };
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
    if (isConnected && stompClient) {
      stompClient.send("/app/private-message", {}, JSON.stringify(newMessage));
    } else {
      console.log("WebSocket connection not established yet.");
    }
  };

  useEffect(() => {
    if (user && user.userName) {
      connectws();
    }

    return () => {
      if (stompClient !== null) {
        stompClient.disconnect(() => {
          console.log("Disconnected from WebSocket");
        });
      }
    };
  }, [user, auth]);
  useEffect(() => {
    groupChatRef.current = groupChat; 
    if (listMessage && listMessage.length > 0) {
      listMessage.length = 0;
      setListMessage(listMessage);
    }
    loadListMessage(groupChat);
  }, [groupChat]);

  // --------------------get sender-----------------
  const findSender = (senderId) => {
    if (groupChatRef.current && groupChatRef.current.members) {
      return groupChatRef.current.members.find((member) => member.id === senderId);
    }
    return null;
  };
  return (
    <ChatContext.Provider
      value={{
        listContact,
        stompClient,
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
