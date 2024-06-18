import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import FriendService from "../../Service/FriendService";
import { toast } from "react-toastify";
import { ChatContext } from "../../context/ChatContext";

function Friend(props) {
  const { user, fetchAllRelatiohsips } = useContext(AppContext);
  const { stompClient } = useContext(ChatContext);
  const sendReqFetchFriend = (toUserId) => {
    const req = {
      senderId: user.id,
      receiverId:toUserId,

    };
    if (stompClient) {
      stompClient.send("/app/friendAction", {}, JSON.stringify(req));
    }
  };
  const handleSendFriendRequest = async (toUserId) => {
    try {
      await FriendService.sendFriendRequest(user.id, toUserId);
      fetchAllRelatiohsips();
      sendReqFetchFriend(toUserId)
      toast.success("Friend request sent");
    } catch (error) {
      toast.error("Failed to send friend request");
    }
  };

  const handleAcceptFriend = async (toUserId) => {
    try {
      await FriendService.acceptFriend(user.id, toUserId);
      fetchAllRelatiohsips();
      sendReqFetchFriend(toUserId)

      toast.success("Friend request accepted");
    } catch (error) {
      toast.success("Failed accept friend");
    }
  };

  const handleDeleteRelationships = async (toUserId) => {
    try {
      await FriendService.deleteFriend(user.id, toUserId);
      fetchAllRelatiohsips();
      sendReqFetchFriend(toUserId)

      toast.success("Delete friend succes");
    } catch (error) {
      toast.success("Delete friend Failed");
    }
  };

  return (
    <>
      <div className="col-sm-6 col-lg-4">
        <div className="card hover-img">
          <div className="card-body p-4 text-center border-bottom">
            <img
              src={props.image}
              className="rounded-circle mb-3"
              width={80}
              height={80}
            />
            <h5 className="fw-semibold mb-0">{props.userName || "cc"}</h5>
          </div>
          <ul className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
            {props.type != "FRIEND" &&
              props.type != "PENDING" &&
              props.type != "AWAIT" && (
                <li className="position-relative px-1">
                  <button
                    onClick={() => handleSendFriendRequest(props.id)}
                    type="button"
                    className="btn btn-outline-success"
                  >
                    Add friend
                  </button>
                </li>
              )}
            {props.type == "FRIEND" && (
              <li className="position-relative px-1">
                <button type="button" className="btn btn-outline-success">
                  Message
                </button>
              </li>
            )}
            {props.type == "FRIEND" && (
              <li className="position-relative px-1">
                <button
                  onClick={() => handleDeleteRelationships(props.id)}
                  type="button"
                  className="btn btn-outline-danger"
                >
                  Delete
                </button>
              </li>
            )}

            {props.type == "PENDING" && (
              <li className="position-relative px-1">
                <button
                  onClick={() => handleAcceptFriend(props.id)}
                  type="button"
                  className="btn btn-outline-success"
                >
                  Confirm
                </button>
              </li>
            )}
            {props.type == "PENDING" && (
              <li className="position-relative px-1">
                <button
                  onClick={() => handleDeleteRelationships(props.id)}
                  type="button"
                  className="btn btn-outline-danger"
                >
                  Delete
                </button>
              </li>
            )}

            {props.type == "AWAIT" && (
              <li className="position-relative px-1">
                <button
                  onClick={() => handleDeleteRelationships(props.id)}
                  type="button"
                  className="btn btn-outline-danger"
                >
                  Cancel requets
                </button>
              </li>
            )}

            <li className="position-relative px-1">
              <button type="button" className="btn btn-outline-primary">
                View
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default Friend;
