import React from "react";
function Contact(){
    return(
        <div className="col-12 p-2 border-bottom contact rounded rounded-3">
        <div className="row">
          <div className="col-md-12 col-lg-3 pe-0">
            <img
              src="https://i.pinimg.com/564x/da/3c/56/da3c56b3f0501c9c283855536594eb5f.jpg"
              className="rounded-circle list-img img-fluid"
              alt="Mô tả ảnh"
            />
          </div>
          <div className="col-md-12 col-lg-9 ps-lg-0 ">
            <p className="m-0 ">Nguyễn Văn A</p>
            <p className="m-0 text-muted fw-light">
              Công viên phần mềm quang trung dasd
            </p>
            <span className="text-success fw-bold">
              <i className="bx bx-wifi" /> Online
            </span>
             {/* trạng thái off */}
            {/* <span className="text-muted">
              <i className="bx bx-wifi-off" /> Offline
            </span> */}
           
          </div>
        </div>
      </div>
    )
}
export default Contact