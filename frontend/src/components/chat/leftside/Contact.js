import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import { ChatContext } from "../../../context/ChatContext";

function Contact(props) {
  const [contact, setContact] = useState(props.contact);
  const [toUser, setToUser] = useState({});
  const { user } = useContext(AppContext);
  const { setUserInBox,loadListMessage,setListMessage } = useContext(ChatContext);

  const handleClick = () => {
    // console.log(toUser);
    setListMessage([])
    setUserInBox(toUser)
    loadListMessage(contact)
  };

  const getContactUser = () => {
    if (contact.groupChatType === "PRIVATE") {
      if (
        user &&
        user.userName &&
        contact.members &&
        contact.members.length === 2
      ) {
        if (contact.members[0].userName === user.userName) {
          setToUser(contact.members[1]);
        } else {
          setToUser(contact.members[0]);
        }
      }
    }
  };

  useEffect(() => {
    getContactUser();
  }, []);

  return (
    <>
      <a
        href="#"
        className="d-flex align-items-center contact-item py-2 px-1 rounded"
        onClick={handleClick}
      >
        <div className="flex-shrink-0">
          <img
            className="img-fluid contact_image rounded-circle"
            src={toUser.image}
            alt="user img"
          />
          <span className="active2" />
        </div>
        <div className="flex-grow-1 ms-3">
          <h3>{toUser.userName}</h3>
          {/* <p className="text-muted">front end developer</p> */}
        </div>
      </a>
    </>
  );
}
export default Contact;
