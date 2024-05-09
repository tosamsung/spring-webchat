import React from "react";
function ChatDetail() {
  return (
    <div className="col border-start collapse chat-detail" id="collapseDetail">
      <div className="row">
        <div className="col-12 boder  fw-bold fs-3  mb-2">
          <p className="my-1 title px-2 rounded rounded-3">Details</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 boder fw-bold fs-3 mb-2 d-flex justify-content-center">
          <img
            src="https://i.pinimg.com/564x/da/3c/56/da3c56b3f0501c9c283855536594eb5f.jpg"
            className="rounded-circle info-img img-fluid"
            alt="Mô tả ảnh"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 boder fs-4 mb-2 d-flex justify-content-center">
          <p>Nguyễn Văn d</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-2 ">
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  Chat setting
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse w-100"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <ul className="list-group py-2">
                  <li
                    className="list-group-item border-0 border-bottom"
                    aria-current="true"
                  >
                    An active item
                  </li>
                  <li className="list-group-item border-0 border-bottom">
                    A second item
                  </li>
                  <li className="list-group-item border-0 border-bottom">
                    A third item
                  </li>
                  <li className="list-group-item border-0 border-bottom">
                    A fourth item
                  </li>
                  <li className="list-group-item border-0 border-bottom">
                    And a fifth one
                  </li>
                </ul>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  File &amp; Folder &amp; Image
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                className="accordion-collapse collapse w-100"
                aria-labelledby="flush-headingTwo"
                data-bs-parent="#accordionFlushExample"
              >
                <ul className="list-group py-2">
                  <li
                    className="list-group-item border-0 border-bottom"
                    aria-current="true"
                  >
                    An active item
                  </li>
                  <li className="list-group-item border-0 border-bottom">
                    A second item
                  </li>
                  <li className="list-group-item border-0 border-bottom">
                    A third item
                  </li>
                  <li className="list-group-item border-0 border-bottom">
                    A fourth item
                  </li>
                  <li className="list-group-item border-0 border-bottom">
                    And a fifth one
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatDetail;
