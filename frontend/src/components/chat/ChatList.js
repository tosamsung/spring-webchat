import React from "react";
import Contacts from "./Contact";
function ChatList() {
  return (
    <div className="col-2 list-chat border-end">
      <div className="row">
        <div className="col-12  fw-bold fs-3  mb-2">
          <p className="my-1 title px-2 rounded rounded-3">Chats</p>
        </div>
        <div className="col-12 find-friends">
          <div className="input-group mt-1 mb-1">
            <input
              type="text"
              className="form-control"
              placeholder="Find contact"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <button className="btn border" type="button" id="button-addon2">
              <i className="fa-solid fa-magnifying-glass" />
            </button>
          </div>
        </div>
        <div className=" list-friends border-bottom">
          <Contacts></Contacts>
          <Contacts></Contacts>
          <Contacts></Contacts>

          <Contacts></Contacts>
          <Contacts></Contacts>
          <Contacts></Contacts>

          <Contacts></Contacts>
          <Contacts></Contacts>
          <Contacts></Contacts>

          <Contacts></Contacts>
          <Contacts></Contacts>
          <Contacts></Contacts>

        </div>
        {/* <div class="col-12 py-2">
    <img src="https://study.com/cimages/multimages/16/burgerad15179945781952220614.png"
      class="img-fluid rounded advertise" alt="">
  </div> */}
      </div>
    </div>
  );
}
export default ChatList;
