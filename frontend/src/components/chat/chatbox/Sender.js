import React, { useState, useEffect } from "react";
function Sender() {
  return (
    <>
      <li className="sender">
        <div className="row">
          <div className="col-1 usercol p-0">
            <img
              className="img-fluid user"
              src="https://mehedihtml.com/chatbox/assets/img/user.png"
              alt="user img"
            />
          </div>
          <div className="col-5">
            <p>
              <img
                src="https://i.pinimg.com/564x/d3/82/fe/d382fe12fb2d68f1e5e3c87e96310185.jpg"
                alt=""
                className="img-fluid"
              />
              {/*   dsadsa fdsfds asdsadas sdafsaf sdasd dsadsa fdsfds
                          asdsadas sdafsaf sdasd dsadsa fdsfds asdsadas sdafsaf
                          sdasd */}
            </p>
            <span className="time">10:26 am</span>
          </div>
        </div>
      </li>
    </>
  );
}
export default Sender;
