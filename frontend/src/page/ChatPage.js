import React, { useContext, useState, useEffect } from "react";
import LeftSide from "../components/chat/leftside/LeftSide";
import ChatBox from "../components/chat/chatbox/ChatBox";
import { AppContext } from "../context/AppContext";
import SockJS from "sockjs-client";
import { over } from "stompjs";
var stompClient = null;
function ChatPage() {
  const [privateChat, setPrivateChat] = useState(new Map());

  // const connectws = () => {
  //   console.log(user);
  //   let Sock = new SockJS("http://localhost:8080/ws");
  //   stompClient = over(Sock);
  //   stompClient.connect({}, onConnected, onError);
  // };

  // const onConnected = () => {
  //   stompClient.subscribe(
  //     "/user/" + user.userName + "/private",
  //     onPrivateMessage
  //   );
  // };

  // const onPrivateMessage = (payload) => {
  //   var payloadData = JSON.parse(payload.body);
  //   console.log(payloadData);
  //   if (payloadData.action) {
  //     switch (payloadData.action) {
  //       case "GETLISTGROUPCHAT":
  //         console.log("test");
  //         break;

  //       default:
  //         break;
  //     }
  //   }
  // };
  // window.addEventListener("beforeunload", () => {
  //   if (stompClient !== null) {
  //     stompClient.disconnect(() => {
  //       console.log("Disconnected from WebSocket");
  //     });
  //   }
  // });

  // const onError = (err) => {
  //   console.log(err);
  // };
  return (
    <>
      <link rel="stylesheet" href="css/chatpage.css" />
      <div className="message-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="chat-area">
                {/* <button onClick={connectws}>test</button> */}
                {/* chatlist */}
                <LeftSide ></LeftSide>
                {/* chatlist */}
                {/* chatbox */}
                <ChatBox></ChatBox>
              </div>
              {/* chatbox */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ChatPage;
