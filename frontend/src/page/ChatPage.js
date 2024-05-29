import React,{useContext, useState, useEffect } from "react";
import LeftSide from "../components/chat/leftside/LeftSide";
import ChatBox from "../components/chat/chatbox/ChatBox";
import { AppContext } from "../context/AppContext";
import SockJS from "sockjs-client";
import { over } from "stompjs";
var stompClient = null;
function ChatPage() {
  const user=useContext(AppContext);
  const [privateChat, setPrivateChat] = useState(new Map());
  const ConnectWs = () => {
    let Sock = new SockJS("http://localhost:8080" + "/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };
  const onConnected = () => {
    stompClient.subscribe(
      "/user/" + user.id + "/private",
      receivePrivateMessage
    );
  };
  const onError = (error) => {
    console.log(error);
  };
  const receivePrivateMessage = (payload) => {
    let data = JSON.parse(payload.body);
    if (privateChat.get(data.id)) {
      privateChat.get(data.id).push(data);
      setPrivateChat(new Map(privateChat))
    }else{
      let list=[]
      list.push(data)
      privateChat.set(data.id,list)
      setPrivateChat(new Map(privateChat))
    }
  };
  return (
    <>
      <link rel="stylesheet" href="css/chatpage.css" />
      <div className="message-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="chat-area">
                {/* chatlist */}
                <LeftSide privateChat={privateChat}></LeftSide>
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
