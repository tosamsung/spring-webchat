import React, { useState, useEffect } from "react";
function ChatDetail() {
  return (
    <>
      <div className="chat-list pt-2">
        <div className="container-fluid">
          <div className="row p-3">
            <img
              src="https://i.pinimg.com/564x/d9/6c/b4/d96cb4208306d584ac0e44c12d820f65.jpg"
              alt=""
              className="img-fluid rounded rounded-circle"
            />
          </div>
          <div className="row">
            <ul className="list-group list-group-flush p-0">
              <li className="list-group-item">An item</li>
              <li className="list-group-item">A second item</li>
              <li className="list-group-item">A third item</li>
              <li className="list-group-item">A fourth item</li>
              <li className="list-group-item">And a fifth one</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default ChatDetail;
