import React, { useContext, useState, useEffect } from "react";
import { ChatContext } from "../../../context/ChatContext";
function Sender(props) {
  const [message, setMessage] = useState(props.message);
  const [sender,setSender]=useState(props.sender);
  const getFormattedTime = (sendDate) => {
    const date = new Date(sendDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };
  return (
    <>
      <li className="sender">
        <div className="row">
          <div className="col-1 usercol p-0">
            <img
              className="img-fluid user rounded-circle"
              src={sender.image}
              alt="user img"
            />
          </div>
          <div className="col-5">
            {message.type == "TEXT" && (
              <p
                className="textreply "
                dangerouslySetInnerHTML={{ __html: message.message }}
              ></p>
            )}
            {message.type == "IMAGE" && (
              <img className="img-fluid image_input rounded" src={message.message} />
            )}
            {message.type == "VIDEO" && (
              <video className="img-fluid image_input" controls>
                <source src={message.message} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <span className="time">{getFormattedTime(message.sendDate)}</span>
          </div>
        </div>
      </li>
    </>
  );
}
export default Sender;
