import React, { useContext, useRef, useState, useEffect } from "react";
import { ChatContext } from "../../../context/ChatContext";
import { toast } from "react-toastify";
import { analytics } from "../../../config/FireBaseConfig";
import { v4 } from "uuid";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { AppContext } from "../../../context/AppContext";

function ChatBox() {
  const inputRef = useRef(null);
  const messageContainerRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState("");
  const [imageInput, setImageInput] = useState([]);
  const [videoInput, setVideoInput] = useState([]);
  const [fileInput, setfileInput] = useState([]);
  const [info, setInfo] = useState({
    image: "",
    userName: "",
  });
  const { user } = useContext(AppContext);
  const { handleSendMessage, listMessage, groupChat } = useContext(ChatContext);

  //---------------------------------- get info ---------------------------------

  const getContactInfo = () => {
    if (groupChat.groupChatType === "PRIVATE") {
      if (groupChat.members[0].userName === user.userName) {
        setInfo(groupChat.members[1]);
      } else {
        setInfo(groupChat.members[0]);
      }
    }
  };
  useEffect(() => {
    getContactInfo();
  }, [groupChat]);
  //----------------------------------- Change file -------------------------------
  const onFileChange = (e) => {
    const file = e;
    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB

    if (file.size > maxSizeInBytes) {
      toast.error("File phải nhỏ hơn 10mb");
      return;
    }

    if (file.type.startsWith("image/")) {
      setImageInput((prevImages) => [...prevImages, file]);
    } else if (file.type.startsWith("video/")) {
      setVideoInput((prevVideos) => [...prevVideos, file]);
    } else {
      console.log("Selected file is not an image.");
    }

    console.log(imageInput);
  };
  const removeImage = (indexToRemove) => {
    setImageInput((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };
  const removeVideo = (indexToRemove) => {
    setVideoInput((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };
  // --------------------------------send message----------------------------------
  const handleSend = (event) => {

    imageInput.forEach((image) => {
      const imgRef = ref(analytics, `files/${v4()}`); 
      uploadBytes(imgRef, image).then((value) => {
        getDownloadURL(value.ref).then((url) => {
          console.log(url);
          handleSendMessage(url, "IMAGE");
        });
      });
    });

    // // Gửi tất cả video
    videoInput.forEach((video) => {
      const imgRef = ref(analytics, `files/${v4()}`);
      uploadBytes(imgRef, video).then((value) => {
        getDownloadURL(value.ref).then((url) => {
          console.log(url);
          handleSendMessage(url, "VIDEO");
        });
      });
    });
    handleSendMessage(getContent(), "TEXT");
    setContent("");
    setImageInput([]);
    setVideoInput([]);
  };

  const getContent = () => {
    if (inputRef.current) {
      const content = inputRef.current.innerHTML;
      return content;
    }
  };
  const setContent = (content) => {
    if (inputRef.current) {
      inputRef.current.innerHTML = content;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSendMessage(getContent(), "TEXT");
    setContent("");
  };
  useEffect(() => {
    const messageBody = messageContainerRef.current;
    if (messageBody) {
      messageBody.scrollTop = messageBody.scrollHeight;
    }
  }, []);
  return (
    <>
      <div className="chatbox">
        <div className="modal-dialog-scrollable">
          <div className="modal-content">
            <div className="msg-head p-1">
              <div className="row">
                <div className="col-8">
                  {/* header */}
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="img-fluid contact_image rounded-circle"
                        src={info.image}
                        alt="user img"
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h3>{info.userName}</h3>
                      {/* <p>front end developer</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-body" ref={messageContainerRef}>
              <div className="msg-body">
                <ul>
                  {/* <Sender></Sender>
                  <Divider></Divider> */}
                  {listMessage}
                </ul>
              </div>
            </div>
            {/* chat form */}
            <div className="send-box">
              <form onSubmit={handleSubmit}>
                {/* <input
                  type="text"
                  className="form-control input_message"
                  value={message.content}
                  onChange={(event) => {
                    handleContentMessage(event);
                  }}
                  aria-label="message…"
                  placeholder="Write message…"
                /> */}
                <div
                  contentEditable="true"
                  className="form-control input_message"
                  placeholder="Write message ..."
                  ref={inputRef}
                ></div>
                <button
                  type="button"
                  onClick={(event) => {
                    handleSend();
                  }}
                >
                  <i className="fa fa-paper-plane" aria-hidden="true" />
                  Send
                </button>
              </form>
              {/*--------------------------------send file -----------------------------*/}

              <div className="py-2">
                {videoInput.length > 0 &&
                  videoInput.map((video, index) => (
                    <div
                      key={index}
                      className="position-relative d-inline-block me-2"
                    >
                      <video className="img-fluid image_input" controls>
                        <source
                          src={URL.createObjectURL(video)}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                      <button
                        className="btn btn-danger position-absolute top-0 end-0"
                        onClick={() => removeVideo(index)}
                        style={{ zIndex: 1 }}
                      >
                        X
                      </button>
                    </div>
                  ))}
                {imageInput.length > 0 &&
                  imageInput.map((image, index) => (
                    <div
                      key={index}
                      className="position-relative d-inline-block me-2"
                    >
                      <img
                        className="img-fluid image_input"
                        src={URL.createObjectURL(image)}
                        alt={`image-${index}`}
                      />
                      <button
                        className="btn btn-danger position-absolute top-0 end-0"
                        onClick={() => removeImage(index)}
                        style={{ zIndex: 1 }}
                      >
                        X
                      </button>
                    </div>
                  ))}
              </div>
              <div className="send-btns">
                <div className="attach">
                  <div className="button-wrapper">
                    <span className="label">
                      <img
                        className="img-fluid"
                        src="https://mehedihtml.com/chatbox/assets/img/upload.svg"
                        alt="image title"
                      />{" "}
                      attached file
                    </span>
                    <input
                      type="file"
                      name="upload"
                      id="upload"
                      className="upload-box"
                      placeholder="Upload File"
                      aria-label="Upload File"
                      onChange={(e) => onFileChange(e.target.files[0])}
                    />
                  </div>
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                  >
                    <option>Select template</option>
                    <option>Template 1</option>
                    <option>Template 2</option>
                  </select>
                  <div className="add-apoint">
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#exampleModal4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8 16C3.58862 16 0 12.4114 0 8C0 3.58862 3.58862 0 8 0C12.4114 0 16 3.58862 16 8C16 12.4114 12.4114 16 8 16ZM8 1C4.14001 1 1 4.14001 1 8C1 11.86 4.14001 15 8 15C11.86 15 15 11.86 15 8C15 4.14001 11.86 1 8 1Z"
                          fill="#7D7D7D"
                        />
                        <path
                          d="M11.5 8.5H4.5C4.224 8.5 4 8.276 4 8C4 7.724 4.224 7.5 4.5 7.5H11.5C11.776 7.5 12 7.724 12 8C12 8.276 11.776 8.5 11.5 8.5Z"
                          fill="#7D7D7D"
                        />
                        <path
                          d="M8 12C7.724 12 7.5 11.776 7.5 11.5V4.5C7.5 4.224 7.724 4 8 4C8.276 4 8.5 4.224 8.5 4.5V11.5C8.5 11.776 8.276 12 8 12Z"
                          fill="#7D7D7D"
                        />
                      </svg>{" "}
                      Appoinment
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ChatBox;
