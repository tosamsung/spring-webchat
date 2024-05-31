import React, { useContext, useState, useEffect } from "react";
import Sender from "./Sender";
import Reply from "./Reply";
import Divider from "./Divider";
import { AppContext } from "../../../context/AppContext";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import SocketService from "../../../Service/SocketService";
function ChatBox() {
  const [chat, setChat] = useState([]);
  const {user}=useContext(AppContext)
  const handleSend = () => {
    console.log("send");
    // setChat([...chat, <Reply key={chat.length} />]);
    SocketService.ConnectWs(user.id)
  };
  return (
    <>
      <div className="chatbox">
        <div className="modal-dialog-scrollable">
          <div className="modal-content">
            <div className="msg-head">
              <div className="row">
                <div className="col-8">
                  {/* header */}
                  <div className="d-flex align-items-center">
                    <span className="chat-icon">
                      <img
                        className="img-fluid"
                        src="https://mehedihtml.com/chatbox/assets/img/arroleftt.svg"
                        alt="image title"
                      />
                    </span>
                    <div className="flex-shrink-0">
                      <img
                        className="img-fluid"
                        src="https://mehedihtml.com/chatbox/assets/img/user.png"
                        alt="user img"
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h3>Mehedi Hasan</h3>
                      <p>front end developer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <div className="msg-body">
                <ul>
                  <Sender></Sender>
                  <Divider></Divider>
                  <Reply></Reply>
                  {chat}
                </ul>
              </div>
            </div>
            {/* chat form */}
            <div className="send-box">
              <form>
                <input
                  type="text"
                  className="form-control"
                  aria-label="message…"
                  placeholder="Write message…"
                />
                <button type="button" onClick={handleSend}>
                  <i className="fa fa-paper-plane" aria-hidden="true" />
                  Send
                </button>
              </form>
              <div className="send-btns">
                <div className="attach">
                  <div className="button-wrapper">
                    <span className="label">
                      <img
                        className="img-fluid"
                        src="https://mehedihtml.com/chatbox/assets/img/upload.svg"
                        alt="image title"
                      />{" "}
                      attached file
                    </span>
                    <input
                      type="file"
                      name="upload"
                      id="upload"
                      className="upload-box"
                      placeholder="Upload File"
                      aria-label="Upload File"
                    />
                  </div>
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                  >
                    <option>Select template</option>
                    <option>Template 1</option>
                    <option>Template 2</option>
                  </select>
                  <div className="add-apoint">
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#exampleModal4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8 16C3.58862 16 0 12.4114 0 8C0 3.58862 3.58862 0 8 0C12.4114 0 16 3.58862 16 8C16 12.4114 12.4114 16 8 16ZM8 1C4.14001 1 1 4.14001 1 8C1 11.86 4.14001 15 8 15C11.86 15 15 11.86 15 8C15 4.14001 11.86 1 8 1Z"
                          fill="#7D7D7D"
                        />
                        <path
                          d="M11.5 8.5H4.5C4.224 8.5 4 8.276 4 8C4 7.724 4.224 7.5 4.5 7.5H11.5C11.776 7.5 12 7.724 12 8C12 8.276 11.776 8.5 11.5 8.5Z"
                          fill="#7D7D7D"
                        />
                        <path
                          d="M8 12C7.724 12 7.5 11.776 7.5 11.5V4.5C7.5 4.224 7.724 4 8 4C8.276 4 8.5 4.224 8.5 4.5V11.5C8.5 11.776 8.276 12 8 12Z"
                          fill="#7D7D7D"
                        />
                      </svg>{" "}
                      Appoinment
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ChatBox;
