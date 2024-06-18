import React, { useContext, useState } from "react";
import GroupService from "../../../Service/GroupService";
import { AppContext } from "../../../context/AppContext";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { analytics } from "../../../config/FireBaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ChatContext } from "../../../context/ChatContext";

function NewGroupChat() {
  const Navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const { user } = useContext(AppContext);
  const {getGroupChat  } = useContext(ChatContext);

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleGroupImageChange = (event) => {
    setGroupImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let groupImageUrl = ""; // Khởi tạo groupImageUrl ở mỗi lần submit mới
      if (groupImage) {
        const imgRef = ref(analytics, `groupImage/${uuidv4()}`); // Sử dụng template string
        const snapshot = await uploadBytes(imgRef, groupImage);
        groupImageUrl = await getDownloadURL(snapshot.ref);
      }

      const formData = new FormData();
      formData.append("idUser1", user.id);
      formData.append("groupName", groupName);
      formData.append("groupImage", groupImageUrl);

      const newGroup = await GroupService.createGroupChat(formData);
      getGroupChat()
      toast.success("Creat new group chat successfully");
      // Navigate("/chats");
    } catch (error) {
      console.error("Error creating group chat:", error);
    }
  };

  return (
    <>
      <link rel="stylesheet" href="css/profile.css" />
      <link rel="stylesheet" href="css/edit.css" />
      <div
        className="modal fade"
        id="newGroupChatModal"
        tabIndex={-1}
        aria-labelledby="newGroupChatModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="newGroupChatModalLabel">
                New Group Chat
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <section
                className="modal-body"
                style={{ backgroundColor: "#f4f5f7" }}
              >
                <form onSubmit={handleSubmit}>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      name="firstName"
                      type="text"
                      id="form3Example1cg"
                      className="form-control form-control-lg"
                      value={groupName}
                      onChange={handleGroupNameChange}
                    />
                    <label className="form-label" htmlFor="form3Example1cg">
                      First Name
                    </label>
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      name="lastName"
                      type="file"
                      id="form3Example1cg"
                      className="form-control form-control-lg"
                      onChange={handleGroupImageChange}
                    />
                    <label className="form-label" htmlFor="form3Example1cg">
                      Photo Group
                    </label>
                  </div>

                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                    >
                      Create Group
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewGroupChat;
