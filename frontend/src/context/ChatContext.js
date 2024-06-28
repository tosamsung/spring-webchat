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
  const { user, auth } = useContext(AppContext);
  const validateUtil = new ValidateUtil();
  const stompClientRef = useRef(null);

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
    client.subscribe(`/user/${user.userName}/private`, onPrivateMessage);
    client.subscribe(`/user/${user.userName}/topic/user-status`, (message) => {
      alert(message.body); // Handle notification (e.g., display it to the user)
    });
  };

  const onError = (err) => {
    console.log(err);
    setIsConnected(false);
  };

  //----------------------------- Message Handling ----------------------

  const onPrivateMessage = (payload) => {
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
      console.log("Message cannot be empty.");
      return;
    }
    if (isEmpty(groupChat)) {
      console.log("Please select a group chat.");
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
      // You might want to queue the message here if WebSocket connection is not ready
    }
  };

  //----------------------------- Initial Data Loading ----------------------

  const getGroupChat = async () => {
    try {
      const listGroup = await GroupService.getGroupChatsByMembername(
        user.userName
      );
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

    // return () => {
    //   if (stompClientRef.current !== null) {
    //     stompClientRef.current.disconnect(() => {
    //       console.log("Disconnected from WebSocket");
    //     });
    //   }
    // };
    const cleanup = () => {
      if (stompClientRef.current && stompClientRef.current.connected) {
        stompClientRef.current.disconnect(() => {
          console.log("Disconnected from WebSocket");
        });
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
};

export default ChatProvider;
// export const ChatContext = createContext({});
// export const ChatProvider = ({ children }) => {
//   const [isConnected, setIsConnected] = useState(false);
//   const [groupChat, setGroupChat] = useState({});
//   const groupChatRef = useRef(groupChat);

//   const [listMessage, setListMessage] = useState([]);
//   const [listContact, setListContact] = useState([]);

//   const { user, auth } = useContext(AppContext);
//   const validateUtil = new ValidateUtil();
//   const stompClientRef = useRef(null);

//   //----------------------------- web socket----------------------
//   const connectws = () => {
//     const Sock = new SockJS("http://localhost:8080/ws");
//     const client = over(Sock);
//     client.connect(
//       {},
//       () => {
//         onConnected(client);
//         setIsConnected(true);
//       },
//       onError
//     );
//     stompClientRef.current = client;
//   };

//   const onConnected = (client) => {
//     client.subscribe("/user/" + user.userName + "/private", onPrivateMessage);
//     client.subscribe(`/user/${user.userName}/topic/user-status`, (message) => {
//       alert(message.body); // Handle notification (e.g., display it to the user)
//     });
//   };

//   const onError = (err) => {
//     console.log(err);
//     setIsConnected(false);
//   };

//   //-----------------------------handle message----------------------

//   const onPrivateMessage = (payload) => {
//     const payloadData = JSON.parse(payload.body);
//     if (payloadData.type) {
//       if (payloadData.senderId === user.id) {
//         setListMessage((prevListMessage) => [
//           ...prevListMessage,
//           <Reply message={payloadData} key={prevListMessage.length} />,
//         ]);
//       } else {
//         setListMessage((prevListMessage) => [
//           ...prevListMessage,
//           <Sender
//             message={payloadData}
//             sender={findSender(payloadData.senderId)}
//             key={prevListMessage.length}
//           />,
//         ]);
//       }
//     }
//   };
//   // function handle send message
//   const handleSendMessage = (message, typeMes) => {
//     if (validateUtil.isEmptyString(message)) {
//       console.log("empty");
//       return;
//     }
//     if (isEmpty(groupChat)) {
//       console.log("empty group chat");
//       return;
//     }
//     const newMessage = {
//       groupId: groupChat.id,
//       senderId: user.id,
//       message: message,
//       type: typeMes,
//       messageStatus: "SENT",
//     };
//     if (isConnected && stompClientRef.current) {
//       stompClientRef.current.send(
//         "/app/private-message",
//         {},
//         JSON.stringify(newMessage)
//       );
//     } else {
//       console.log("WebSocket connection not established yet.");
//     }
//   };
//   const getGroupChat = async () => {
//     const listGroup = await GroupService.getGroupChatsByMembername(
//       user.userName
//     );
//     setListContact(listGroup);
//     if (listGroup.length > 0) {
//       setGroupChat(listGroup[0]);
//     }
//   };
//   const loadListMessage = async (groupId) => {
//     if (groupId) {
//       const result = await MessageService.getMessageByGroupId(groupId);
//       const newListMessage = result.map((message, index) => {
//         if (message.senderId === user.id) {
//           return <Reply message={message} key={index} />;
//         } else {
//           return (
//             <Sender
//               message={message}
//               sender={findSender(message.senderId)}
//               key={index}
//             />
//           );
//         }
//       });
//       setListMessage(newListMessage);
//     }
//   };
//   // connect websocket
//   useEffect(() => {
//     if (user && user.userName) {
//       connectws();
//       getGroupChat();
//     }

//     return () => {
//       if (stompClientRef.current !== null) {
//         stompClientRef.current.disconnect(() => {
//           console.log("Disconnected from WebSocket");
//         });
//       }
//     };
//   }, [user, auth]);
//   //  load messages when groupchat changes
//   useEffect(() => {
//     groupChatRef.current = groupChat;
//     if (listMessage && listMessage.length > 0) {
//       listMessage.length = 0;
//       setListMessage(listMessage);
//     }
//     loadListMessage(groupChat.id);
//   }, [groupChat]);

//   // --------------------get sender-----------------
//   const findSender = (senderId) => {
//     if (groupChatRef.current && groupChatRef.current.members) {
//       return groupChatRef.current.members.find(
//         (member) => member.id === senderId
//       );
//     }
//     return null;
//   };
//   return (
//     <ChatContext.Provider
//       value={{
//         listContact,
//         stompClient: stompClientRef.current,
//         groupChat,
//         listMessage,
//         setGroupChat,
//         handleSendMessage,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
//   function isEmpty(obj) {
//     return Object.keys(obj).length === 0;
//   }
// };
