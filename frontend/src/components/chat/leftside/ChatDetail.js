import React from "react";
import AddMember from "./ChatMember";

function ChatDetail({ currentChat }) {
  if (!currentChat) {
    return <div className="chat-detail">No chat selected</div>;
  }

  // Extract the current user (the user who is not the logged-in user in a private chat)
  const currentUser =
    currentChat.groupChatType === "PRIVATE" && currentChat.user
      ? currentChat.members.find(
          (member) => member.userName !== currentChat.user.userName
        )
      : null;

  const info =
    currentChat.groupChatType === "GROUP"
      ? {
          image: currentChat.setting.image,
          userName: currentChat.setting.name,
        }
      : currentUser
      ? {
          image: currentUser.image,
          userName: currentUser.userName,
        }
      : {
          image: "",
          userName: "Unknown User",
        };

  return (
    <>
      <div className="chat-list pt-2">
        <div className="container-fluid">
          <div className="row p-3">
            <img
              src={info.image}
              alt="User"
              className="img-fluid rounded rounded-circle"
            />
          </div>
          <div className="row justify-content-center">
            <h3
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 25,
                marginBottom: "50px",
              }}
            >
              {info.userName}
            </h3>
          </div>
          <div className="row">
            <ul className="list-group list-group-flush p-0">
              <li className="list-group-item">Customize chat</li>
              {currentChat.groupChatType === "GROUP" && (
                <li className="list-group-item">
                  <a
                    className="add"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#addMember"
                  >
                    Chat members
                  </a>
                </li>
              )}
              <li className="list-group-item">Media, file and links</li>
              <li className="list-group-item">Privacy & support</li>
            </ul>
          </div>
        </div>
      </div>
      <AddMember></AddMember>
    </>
  );
}

export default ChatDetail;
