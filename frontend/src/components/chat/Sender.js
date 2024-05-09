import React from "react";
function Sender(){
    return(
        <div className="row chat-line sender">
        <div className="col-1 ">
          <img
            src="https://i.pinimg.com/564x/da/3c/56/da3c56b3f0501c9c283855536594eb5f.jpg"
            className="rounded-circle list-img img-fluid"
            alt="Mô tả ảnh"
          />
        </div>
        <div className="col-5 p-0">
          <p className="d-inline-block chat-content p-2 m-0 rounded-3">
            nguyen van a dddddddddddddddddddd fdfadsgd gfdhfdh fdfads gfsgf gfdsgs sds dgdsgds
          </p>
          <p className="text-muted">05:45</p>
        </div>
      </div>
    )
}
export default Sender