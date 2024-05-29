import React from "react";
function Friend(params) {
  return (
    <>
      <div className="col-sm-6 col-lg-4">
        <div className="card hover-img">
          <div className="card-body p-4 text-center border-bottom">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar2.png"
              className="rounded-circle mb-3"
              width={80}
              height={80}
            />
            <h5 className="fw-semibold mb-0">Inez Lyons</h5>
            <span className="text-dark fs-2">Medical Technician</span>
          </div>
          <ul className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
            <li className="position-relative px-1">
              <button type="button" className="btn btn-outline-success">
                Add friend
              </button>
            </li>
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
