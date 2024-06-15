import React, { useContext, useState, useEffect } from "react";
import Contact from "./Contact";
import ChatDetail from "./ChatDetail";
import { ChatContext } from "../../../context/ChatContext";
import NewGroupChat from "./NewGroupChat";
import Member from "./Member";
import { AppContext } from "../../../context/AppContext";
import GroupService from "../../../Service/GroupService";

function ChatMember() {
  const [membersInGroupNotFriend, setMembersInGroupNotFriend] = useState([]);
  const [membersInGroup, setMembersInGroup] = useState([]);
  const [membersNotInGroup, setMembersNotInGroup] = useState([]);

  const { user } = useContext(AppContext);
  const { groupChat } = useContext(ChatContext);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersInGroupNotFriend =
          await GroupService.getMembersInGroupNotFriend(user.id, groupChat.id);
        const membersInGroup = await GroupService.getMembersInGroup(
          user.id,
          groupChat.id
        );
        const membersNotInGroup = await GroupService.getMembersNotIngroup(
          user.id,
          groupChat.id
        );
        setMembersInGroupNotFriend(membersInGroupNotFriend);
        setMembersInGroup(membersInGroup);
        setMembersNotInGroup(membersNotInGroup);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, [user.id, groupChat.id]);

  const openDetil = () => {
    const Detail = document.getElementById("members");
    const Contact = document.getElementById("friends");
    const ButtonContact = document.getElementById("buttonFriends");
    const ButtonDetail = document.getElementById("buttonMembers");

    if (Detail && Contact && ButtonContact && ButtonDetail) {
      Detail.classList.add("show", "active");
      Contact.classList.remove("show", "active");
      ButtonDetail.classList.add("active");
      ButtonContact.classList.remove("active");
    }
  };

  const openListContacts = () => {
    const Detail = document.getElementById("members");
    const Contact = document.getElementById("friends");
    const ButtonContact = document.getElementById("buttonFriends");
    const ButtonDetail = document.getElementById("buttonMembers");

    if (Detail && Contact && ButtonContact && ButtonDetail) {
      Detail.classList.remove("show", "active");
      Contact.classList.add("show", "active");
      ButtonDetail.classList.remove("active");
      ButtonContact.classList.add("active");
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="addMember"
        tabIndex={-1}
        aria-labelledby="newGroupChatModalLabel"
        aria-hidden="true"
        style={{ width: "500px", marginLeft: "400px" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Chat Members
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <div className="modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="chat-header pb-3">
                      <ul
                        className="nav-tabs p-0 row"
                        id="myTab"
                        role="tablist"
                      >
                        <li
                          className="nav-item col"
                          onClick={() => {
                            openListContacts();
                          }}
                        >
                          <button
                            className="nav-link active"
                            id="buttonFriends"
                          >
                            Add members
                          </button>
                        </li>
                        <li
                          className="nav-item col"
                          onClick={() => {
                            openDetil();
                          }}
                        >
                          <button className="nav-link" id="buttonMembers">
                            Members
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className="modal-body p-0">
                      {/* chat-list */}
                      <div className="chat-lists">
                        <div className="tab-content" id="myTabContent">
                          <div
                            className="tab-pane fade show active"
                            id="friends"
                          >
                            <div className="chat-list">
                              {membersNotInGroup.map((member) => (
                                <Member
                                  key={member.id}
                                  type="ADDMEMBER"
                                  userName={member.userName}
                                  id={member.id}
                                  img={member.image}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="tab-pane fade w-100" id="members">
                            <div className="chat-list">
                              {membersInGroupNotFriend.map((member) => (
                                <Member
                                  key={member.id}
                                  type="MEMBERNOTFRIEND"
                                  userName={member.userName}
                                  id={member.id}
                                  img={member.image}
                                />
                              ))}
                              {membersInGroup.map((member) => (
                                <Member
                                  key={member.id}
                                  type="MEMBER"
                                  userName={member.userName}
                                  id={member.id}
                                  img={member.image}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* chat-list */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ChatMember;
