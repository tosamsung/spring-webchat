import React from "react";
function Reply() {
  return (
    <div className="row chat-line reply justify-content-end">
      <div className="col-5 p-0 text-end">
         <p className="d-inline-block chat-content-image p-2 m-0 rounded-3">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/oTIJunBa6MA?si=9c3vjGwI0IeFZBoU"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </p>
        {/* <p className="d-inline-block chat-content-image p-2 m-0 rounded-3">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/oTIJunBa6MA?si=9c3vjGwI0IeFZBoU"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </p> nội dung video */}
        {/* <p className="d-inline-block chat-content-image p-2 m-0 rounded-3">
          <img
            src="https://i.pinimg.com/564x/d4/f8/84/d4f8844c4d1bfdf12a0ae3690ae0c691.jpg"
            className="img-fluid"
            alt="Mô tả ảnh"
          />
        </p> nội dung hình*/}
        {/* <p className="d-inline-block chat-content p-2 m-0 rounded-3">
          nguyễn văn dddd
        </p> nôi dung chữ*/}
        <p className="text-muted">05:45</p>
      </div>
      <div className="col-1 ">
        <img
          src="https://i.pinimg.com/736x/f9/4f/e3/f94fe3bd5ff54e08ee5e9e352384ca14.jpg"
          className="rounded-circle list-img img-fluid"
          alt="Mô tả ảnh"
        />
      </div>
    </div>
  );
}
export default Reply;
