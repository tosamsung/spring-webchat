import React, { useContext,useState, useEffect } from "react";
import { ChatContext } from "../../../context/ChatContext";
function Sender(props) {
  const [message,setMessage]=useState(props.message)
  const { userInBox} = useContext(ChatContext);

  return (
    <>
      <li className="sender">
        <div className="row">
          <div className="col-1 usercol p-0">
            <img
              className="img-fluid user rounded-circle"
              src={userInBox.image}
              alt="user img"
            />
          </div>
          <div className="col-5">
            <p className="textreply "  dangerouslySetInnerHTML={{ __html: message.message }}>
            
            </p>
            <span className="time">10:26 am</span>
          </div>
        </div>
      </li>
    </>
  );
}
export default Sender;
