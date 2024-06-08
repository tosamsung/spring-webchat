import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";

function Reply(props) {
  const { user } = useContext(AppContext);
  const [message, setMessage] = useState(props.message);
  const getFormattedTime = (sendDate) => {
    const date = new Date(sendDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };
  return (
    <>
      <li className="repaly pe-3">
        <div className="row d-flex justify-content-end">
          <div className="col-5">
            {message.type == "TEXT" && (
              <p
                className="textreply "
                dangerouslySetInnerHTML={{ __html: message.message }}
              ></p>
            )}
            {message.type == "IMAGE" && (
              <img
                className="img-fluid image_input rounded"
                src={message.message}
              />
            )}
            {message.type == "VIDEO" && (
              <video className="img-fluid image_input" controls>
                <source src={message.message} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
                      <span className="time">{getFormattedTime(message.sendDate)}</span>

          </div>
          <div className="col-1 usercol p-0">
            <img
              className="img-fluid user rounded-circle"
              src={user.image}
              alt="user img"
            />
          </div>
        </div>
      </li>
    </>
  );
}
export default Reply;
