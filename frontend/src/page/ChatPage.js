import React from "react";
import ChatList from "../components/chat/ChatList";
import ChatBox from "../components/chat/ChatBox";
import ChatDetail from "../components/chat/ChatDetail";
function ChatPage(params) {

  return (
    <>
      <link rel="stylesheet" href="css/chat.css"/>
      <div className="row mt-2">
        {/* list */}
          <ChatList></ChatList>
        {/* chat */}
          <ChatBox></ChatBox>
        {/* chat info */}
        <ChatDetail></ChatDetail>
      </div>
    </>
  );
}
export default ChatPage;
