import React, { useContext, useState, useEffect } from "react";
import LeftSide from "../components/chat/leftside/LeftSide";
import ChatBox from "../components/chat/chatbox/ChatBox";
import { AppContext } from "../context/AppContext";
import SockJS from "sockjs-client";
import { over } from "stompjs";
var stompClient = null;
function ChatPage() {

  const { user } = useContext(AppContext);
  const [privateChat, setPrivateChat] = useState(new Map());





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
