import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import { ChatContext } from "../../../context/ChatContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import ChatMember from "./ChatMember";

function Contact(props) {
  const { setCurrentChat, openDetil } = props;
  const [contact, setContact] = useState(props.contact);
  const [info, setInfo] = useState({
    image: "",
    userName: "",
  });
  const { user } = useContext(AppContext);
  const { setListMessage, setGroupChat } = useContext(ChatContext);

  const {groupChat,setGroupChat } = useContext(ChatContext);

  const handleClick = () => {
    // setCurrentChat({ ...contact, user });
    setGroupChat(contact);
  };

  const handleSettingsClick = (event) => {
    event.stopPropagation();
    setCurrentChat({ ...contact, user });
    openDetil();
  };

  const getContactInfo = () => {
    if (contact.groupChatType === "PRIVATE") {
      if (
        user &&
        user.userName &&
        contact.members &&
        contact.members.length === 2
      ) {
        if (contact.members[0].userName === user.userName) {
          setInfo(contact.members[1]);
        } else {
          setInfo(contact.members[0]);
        }
      }
    } else if (contact.groupChatType === "GROUP") {
      setInfo({
        image: contact.setting.image,
        userName: contact.setting.name,
      });
    }
  };

  useEffect(() => {
    getContactInfo();
  }, []);

  return (
    <>
      <a
        href="#"
        className={`d-flex align-items-center contact-item py-2 px-1 rounded ${groupChat.id == contact.id ? 'contact-active':''}`}
        onClick={handleClick}
      >
        <div className="flex-shrink-0">
          <img
            className="img-fluid contact_image rounded-circle border border-1 border-black"
            src={info.image}
            alt="user img"
          />
          <span className="active2" />
        </div>
        <div className="flex-grow-1 ms-3">
          <h3 className={groupChat.id == contact.id ? 'text-white':''}>{info.userName}</h3>
          {/* <p className="text-muted">front end developer</p> */}
        </div>
        <div className="ml-auto me-2" onClick={handleSettingsClick}>
          <FontAwesomeIcon icon={faCog} />
        </div>
      </a>
    </>
  );
}

export default Contact;
