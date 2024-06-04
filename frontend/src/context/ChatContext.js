import { useContext, createContext } from "react";
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

  const [userInBox, setUserInBox] = useState({});
  const [groupChat, setGroupChat] = useState({});

  const [listMessage, setListMessage] = useState([]);
  // const [StoreListMessage, setStoreListMessage] = useState(new Map());

  const [listContact, setListContact] = useState([]);

  const { user, auth } = useContext(AppContext);

  const validateUtil = new ValidateUtil();
  const timeUtil = new TimeUtil();
  //----------------------------- web socket----------------------
  const connectws = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    let client = over(Sock);
    client.connect({}, () => onConnected(client), onError);
    setStompClient(client);
  };

  const onConnected = (client) => {
    client.subscribe("/user/" + user.userName + "/private", onPrivateMessage);
  };

  const onError = (err) => {
    console.log(err);
  };
  //----------------------------- /web socket----------------------
  //-----------------------------handle message----------------------

  const loadListMessage = (groupChat) => {
    setGroupChat(groupChat);
    console.log(groupChat);
    // setListMessage([])
    const requestSocket = {
      userName: user.userName,
      groupId: groupChat.id,
    };
    stompClient.send("/app/getMessages", {}, JSON.stringify(requestSocket));
  };

  const onPrivateMessage = (payload) => {
    var payloadData = JSON.parse(payload.body);
    // console.log(groupChat);
    // console.log(payloadData);
    if (payloadData.type) {
      switch (payloadData.type) {
        case "TEXT":
          let newChat = [
            ...listMessage,
            <Sender message={payloadData} key={listMessage.length} />,
          ];

          setListMessage(newChat);
          break;
        default:
          break;
      }
    }
    if (payloadData.action) {
      switch (payloadData.action) {
        case "FIND_LIST_GROUPCHAT":
          setListContact(payloadData.data);
          console.log(payloadData.data);
          if (payloadData.data.length > 0) {
            setUserInBox(payloadData.data[0].members[0]);
            // loadListMessage(payloadData.data[0])
            
          }
          break;
        case "FIND_MESSAGE_BY_GROUPID":
          if (listMessage && listMessage.length > 0) {
            listMessage.length = 0;
            setListMessage(listMessage);
          }
          payloadData.data.forEach((message) => {
            if (message.senderId == user.id) {
              listMessage.push(
                <Reply message={message} key={listMessage.length} />
              );
            } else {
              listMessage.push(
                <Sender message={message} key={listMessage.length} />
              );
            }
          });
          setListMessage(listMessage);
          break;
        default:
          break;
      }
    }
  };
  const handleSendMessage = (message) => {
    if (validateUtil.isEmptyString(message)) {
      console.log("empty");
      return;
    }
    if (isEmpty(userInBox)) {
      console.log("emptyuser");
      return;
    }
    // // console.log(timeUtil.getCurrentTime());
    const newMessage = {
      groupId: groupChat.id,
      senderId: user.id,
      message: message,
      type: "TEXT",
      messageStatus: "SENT",
    };
    stompClient.send("/app/private-message", {}, JSON.stringify(newMessage));

    const newChat = [
      ...listMessage,
      <Reply message={newMessage} key={listMessage.length} />,
    ];
    setListMessage(newChat);
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
  return (
    <ChatContext.Provider
      value={{
        listContact,
        userInBox,
        stompClient,
        groupChat,
        listMessage,
        loadListMessage,
        setUserInBox,
        setListMessage,
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
