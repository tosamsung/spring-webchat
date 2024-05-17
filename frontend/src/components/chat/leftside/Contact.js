import React, { useState, useEffect } from "react";
function Contact() {
  return (
    <>
      <a href="#" className="d-flex align-items-center">
        <div className="flex-shrink-0">
          <img
            className="img-fluid"
            src="https://mehedihtml.com/chatbox/assets/img/user.png"
            alt="user img"
          />
          <span className="active2" />
        </div>
        <div className="flex-grow-1 ms-3">
          <h3>Mehedi Hasan</h3>
          <p>front end developer</p>
        </div>
      </a>
    </>
  );
}
export default Contact;
