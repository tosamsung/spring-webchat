import React, { useState, useEffect } from "react";
function Reply() {
  return (
    <>
      <li className="repaly pe-3">
        <div className="row d-flex justify-content-end">
          <div className="col-5">
            <p className="textreply">
              dsadsa fdsfds asdsadas sdafsaf sdasd dsadsa fdsfds asdsadas
              sdafsaf sdasd dsadsa fdsfds asdsadas sdafsaf sdasd
            </p>
            <span className="time">10:26 am</span>
          </div>
          <div className="col-1 usercol p-0">
            <img
              className="img-fluid user"
              src="https://mehedihtml.com/chatbox/assets/img/user.png"
              alt="user img"
            />
          </div>
        </div>
      </li>
    </>
  );
}
export default Reply;
