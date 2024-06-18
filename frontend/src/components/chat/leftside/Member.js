import React, { useContext, useEffect, useState } from "react";
import GroupService from "../../../Service/GroupService";
import { ChatContext } from "../../../context/ChatContext";
import { toast } from "react-toastify";
import { AppContext } from "../../../context/AppContext";

function Member(props) {
  const { groupChat } = useContext(ChatContext);
  const { user } = useContext(AppContext);
  const [isLeader, setIsLeader] = useState(false);
  const handleAddMember = async () => {
    try {
      const newMember = {
        id: props.id,
        userName: props.userName,
        image: props.img,
        groupRole: "MEMBER",
      };
      await GroupService.addMember(groupChat.id, newMember);
      toast.success("Add member successfully");
      props.fetch()
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };  

  useEffect(() => {
    if (groupChat && groupChat.members) {
      groupChat.members.map((member,index) => {
        if (member.id === user.id && member.groupRole === "LEADER") {
          setIsLeader(true);
         
        }
      });
    }
  }, [groupChat]);


  return (
    <>
      <a
        href="#"
        className="d-flex align-items-center contact-item py-2 px-1 rounded"
      >
        <div className="flex-shrink-0">
          <img
            className="img-fluid contact_image rounded-circle"
            src={props.img}
            alt="user img"
          />
          <span className="active2" />
        </div>
        <div className="flex-grow-1 ms-3">
          <h3>{props.userName}</h3>
        </div>
        {props.type == "ADDMEMBER" && (
          <div
            className="ml-auto me-2 btn btn-primary"
            onClick={handleAddMember}
          >
            Add
          </div>
        )}

        {props.type == "MEMBER" && (
          <div className="ml-auto me-2 btn btn-primary">Message</div>
        )}
        {props.type == "MEMBERNOTFRIEND" && props.userName != user.userName && (
          <div className="ml-auto me-2 btn btn-primary">Add friend</div>
        )}
        {isLeader &&  props.userName != user.userName && props.type == "MEMBER" && <div className="ml-auto me-2 btn btn-danger">DELETE</div>}
      </a>
    </>
  );
}
export default Member;
