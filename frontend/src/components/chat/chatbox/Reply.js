import React, { useContext,useState, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";

function Reply(props) {
  const { user } = useContext(AppContext);
  const [message,setMessage]=useState(props.message)

  return (
    <>
      <li className="repaly pe-3">
        <div className="row d-flex justify-content-end">
          <div className="col-5">
            <p className="textreply " dangerouslySetInnerHTML={{ __html: message.message }}>
            </p>
            {/* <span className="time">{message.sendDate}</span> */}
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
