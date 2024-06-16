import React, { useContext, useState, useEffect } from "react";
import Contact from "../leftside/Contact";
import ChatDetail from "./ChatDetail";
import { ChatContext } from "../../../context/ChatContext";
import NewGroupChat from "./NewGroupChat";

function LeftSide(props) {
  // const { listContact } = useContext(AppContext);
  const [currentChat, setCurrentChat] = useState(null); // Thêm state này
  const { groupChat } = useContext(ChatContext);

  const openDetil = () => {
    let Detail = document.getElementById("detail");
    let Contact = document.getElementById("listContacts");
    let ButtonContact = document.getElementById("buttonContact");
    let ButtonDetail = document.getElementById("buttonDetail");
    if (Detail) {
      Detail.classList.add("show");
      Detail.classList.add("active");
      Contact.classList.remove("show");
      Contact.classList.remove("active");
      ButtonDetail.classList.add("active");
      ButtonContact.classList.remove("active");
    }
  };
  const openListContacts = () => {
    let Detail = document.getElementById("detail");
    let Contact = document.getElementById("listContacts");
    let ButtonContact = document.getElementById("buttonContact");
    let ButtonDetail = document.getElementById("buttonDetail");
    if (Detail) {
      Detail.classList.remove("show");
      Detail.classList.remove("active");
      Contact.classList.add("show");
      Contact.classList.add("active");
      ButtonDetail.classList.remove("active");
      ButtonContact.classList.add("active");
    }
  };
  const { listContact } = useContext(ChatContext);
  return (
    <>
      <div className="chatlist">
        <div className="modal-dialog-scrollable">
          <div className="modal-content">
            <div className="chat-header pb-3">
              <div className="msg-search">
                <input
                  type="text"
                  className="form-control"
                  id="inlineFormInputGroup"
                  placeholder="Search"
                  aria-label="search"
                />
                <a
                  className="add"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#newGroupChatModal"
                >
                  <img
                    className="img-fluid"
                    src="https://mehedihtml.com/chatbox/assets/img/add.svg"
                    alt="add"
                  />
                </a>
              </div>
              <ul className="nav-tabs p-0 row" id="myTab" role="tablist">
                <li
                  className="nav-item col"
                  onClick={() => {
                    openListContacts();
                  }}
                >
                  <button className="nav-link active" id="buttonContact">
                    Contact
                  </button>
                </li>
                <li
                  className="nav-item col"
                  onClick={() => {
                    openDetil();
                  }}
                >
                  <button className="nav-link" id="buttonDetail">
                    Detail
                  </button>
                </li>
              </ul>
            </div>
            <div className="modal-body p-0">
              {/* chat-list */}
              <div className="chat-lists">
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active" id="listContacts">
                    {/* chat-list */}
                    <div className="chat-list">
                      {listContact.map((contact) => (
                        <Contact
                          key={contact.id}
                          contact={contact}
                          openDetil={openDetil} // Truyền hàm openDetil xuống Contact
                        />
                      ))}
                    </div>
                    {/* chat-list */}
                  </div>
                  <div className="tab-pane fade w-100" id="detail">
                    {/* chat-list */}
                    <ChatDetail currentChat={groupChat} /> {/* chat-list */}
                  </div>
                </div>
              </div>
              {/* chat-list */}
            </div>
          </div>
        </div>
      </div>
      <NewGroupChat />
    </>
  );
}
export default LeftSide;
