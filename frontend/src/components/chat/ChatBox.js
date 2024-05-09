import React from "react";
import Sender from "./Sender";
import Divider from "./Divider";
import Reply from "./Reply";
function ChatBox() {
    const openDetil=()=>{
        let Detail=document.getElementById("collapseDetail")
        if(Detail){
          Detail.classList.toggle("show")
        }
      }
  return (
    <div className="col">
      <div className="row">
        <div className="col-12 border-bottom mb-2 chat-header ">
          <div className="row p-2 d-flex bd-highlight">
            <div className="col-1 p-0 bd-highlight">
              <img
                src="https://i.pinimg.com/564x/da/3c/56/da3c56b3f0501c9c283855536594eb5f.jpg"
                className="rounded-circle header-img img-fluid"
                alt="Mô tả ảnh"
              />
            </div>
            <div className="col-10 bd-highlight">
              <p className="m-0">Nguyễn Văn dạt</p>
              <span className="text-muted">
                <i className="bx bx-wifi text-success" /> Online
              </span>
            </div>
            <div className="col-1 p-0 ms-auto bd-highlight ">
              <button
                className="p-0 rounded-circle border-0 bg-light"
                type="button"
                onClick={() => {
                  openDetil();
                }}
              >
                <i className="bx bx-info-circle fs-2 p-0" />
              </button>
            </div>
          </div>
        </div>
        {/* chatbody */}
        <div className="col-12 chat-body border-bottom">
         <Sender></Sender>
         <Divider></Divider>
         <Reply></Reply>
         
        </div>
        {/* /chatbody */}
        <div className="col-12 chat-footer mt-2">
          <div className="input-group mb-3">
            <button className="btn p-1 rounded-circle mx-1" type="button">
              <i className="bx bx-folder-open fs-1" />
            </button>
            <button className="btn p-1 rounded-circle mx-1" type="button">
              <i className="bx bx-images fs-1" />
            </button>
            <input
              type="text"
              className="form-control rounded-pill mx-3"
              placeholder="Aa"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <button
              className="btn p-1 rounded-circle  mx-1"
              type="button"
              id="button-addon2"
            >
              <i className="bx bx-smile fs-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatBox;
