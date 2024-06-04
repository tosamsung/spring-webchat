import React, { useContext, useEffect, useState } from "react";
import Friend from "../components/friend/Friend";
import { AppContext } from "../context/AppContext";
import FriendService from "../Service/FriendService";
function FriendsPage() {
  const { user } = useContext(AppContext);
  const [notFriends, setNotFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const [requestFriends, setRequestFriends] = useState([]);
  const [sentRequest, setSentRequest] = useState([]);
  useEffect(() => {
    const fetchNotFriend = async () => {
      try {
        const notFriends = await FriendService.getAllNotFriend(user.id);
        setNotFriends(notFriends);
        // console.log("Not friends:", notFriends);
      } catch (error) {
        console.error("Error fetching not friends:", error);
      }
    };

    const fetchFriend = async () => {
      try {
        const Friends = await FriendService.getAllFriend(user.id);
        setFriends(Friends);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    const fetchRequestFriends = async () => {
      try {
        const requestFriends = await FriendService.getRequestFriend(user.id);
        setRequestFriends(requestFriends);
      } catch (error) {
        console.error("Error fetching request friends:", error);
      }
    };

    const fectSentRequest = async () => {
      try {
        const sentRequest = await FriendService.getSentRequest(user.id);
        setSentRequest(sentRequest);
      } catch (error) {
        console.error("Error fetching sent request:", error);
      }
    };

    fetchNotFriend();
    fetchFriend();
    fetchRequestFriends();
    fectSentRequest();
  }, [user]); // Thêm user như một dependency để re-run effect nếu user thay đổi
  return (
    <>
      <link rel="stylesheet" href="css/friendpage.css" />
      <div className="container" id="friendpage">
        <div className="card overflow-hidden">
          <div className="card-body p-0">
            <ul
              className="nav nav-pills user-profile-tab justify-content-end mt-2 bg-light-info rounded-2"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6"
                  id="pills-friends-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-friends"
                  type="button"
                  role="tab"
                  aria-controls="pills-friends"
                  aria-selected="false"
                  tabIndex={-1}
                >
                  <i className="fas fa-search me-2 fs-6 text-white"></i>
                  <span className="d-none d-md-block text-white">
                    Find user
                  </span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6"
                  id="pills-gallery-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-gallery"
                  type="button"
                  role="tab"
                  aria-controls="pills-gallery"
                  aria-selected="false"
                  tabIndex={-1}
                >
                  <i className="fa fa-users me-2 fs-6 text-white" />
                  <span className="d-none d-md-block text-white">Friends</span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6"
                  id="pills-gallery-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-request"
                  type="button"
                  role="tab"
                  aria-controls="pills-gallery"
                  aria-selected="false"
                  tabIndex={-1}
                >
                  <i className="fa fa-users me-2 fs-6 text-white" />
                  <span className="d-none d-md-block text-white">
                    Friend Requests
                  </span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6"
                  id="pills-gallery-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-await"
                  type="button"
                  role="tab"
                  aria-controls="pills-gallery"
                  aria-selected="false"
                  tabIndex={-1}
                >
                  <i className="fa fa-users me-2 fs-6 text-white" />
                  <span className="d-none d-md-block text-white">
                    Sent Requests
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-friends"
            role="tabpanel"
            aria-labelledby="pills-friends-tab"
            tabIndex={0}
          >
            <div className="d-sm-flex align-items-center justify-content-between mt-3 mb-4">
              <h3 className="mb-3 mb-sm-0 fw-semibold d-flex align-items-center">
                User
              </h3>
              <form className="position-relative">
                <input
                  type="text"
                  className="form-control search-chat py-2 ps-5"
                  id="text-srh"
                  placeholder="Search Friends"
                />

                <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y text-dark ms-3" />
              </form>
            </div>
            <div className="row">
              {notFriends.map((notFriend) => (
                <Friend
                  key={notFriend.id}
                  userName={notFriend.userName}
                  id={notFriend.id}
                  image={notFriend.image}
                />
              ))}
            </div>
          </div>
          <div
            className="tab-pane fade show active"
            id="pills-gallery"
            role="tabpanel"
            aria-labelledby="pills-friends-tab"
            tabIndex={0}
          >
            <div className="row">
              {friends.map((friend) => (
                <Friend
                  type="FRIEND"
                  key={friend.id}
                  userName={friend.userName}
                  id={friend.id}
                  image={friend.image}
                ></Friend>
              ))}
            </div>
          </div>
          <div
            className="tab-pane fade show active"
            id="pills-request"
            role="tabpanel"
            aria-labelledby="pills-friends-tab"
            tabIndex={0}
          >
            <div className="row">
              {requestFriends.map((requestFriends) => (
                <Friend
                  type="PENDING"
                  key={requestFriends.id}
                  userName={requestFriends.userName}
                  id={requestFriends.id}
                  image={requestFriends.image}
                ></Friend>
              ))}
            </div>
          </div>
          <div
            className="tab-pane fade show active"
            id="pills-await"
            role="tabpanel"
            aria-labelledby="pills-friends-tab"
            tabIndex={0}
          >
            <div className="row">
              {sentRequest.map((sentRequest) => (
                <Friend
                  type="AWAIT"
                  key={sentRequest.id}
                  userName={sentRequest.userName}
                  id={sentRequest.id}
                  image={sentRequest.image}
                ></Friend>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default FriendsPage;
