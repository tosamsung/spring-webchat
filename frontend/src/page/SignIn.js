import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../Service/UserService";
import { toast } from "react-toastify";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }

    const userDate = await UserService.login(email, password)
      .then((userDate) => {
        Navigate("/chats");
      })
      .catch((error) => {
        console.log("haha");
        toast.error("Username and password not found");
      });
  };

  return (
    <>
      <link rel="stylesheet" href="css/sign-in.css" />
      <section
        className="vh-100 bg-image"
        style={{
          backgroundImage:
            'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")',
        }}
      >
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: 15 }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      <i className="bx bx-conversation"></i>
                      Sign In
                    </h2>
                    {/* {error && <p className="error">{error}</p>} */}
                    <form onSubmit={handleSubmit}>
                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          id="form3Example3cg"
                          className="form-control form-control-lg"
                          placeholder="Email"
                        />
                      </div>
                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          id="form3Example4cg"
                          className="form-control form-control-lg"
                          placeholder="Password"
                        />
                      </div>
                      {/* <div data-mdb-input-init className="form-outline mb-3">
                        <p
                          className="form-label text-danger text-center"
                          htmlFor="form3Example4cg"
                        >
                          <i class="bx bx-tired me-1"></i>
                          Email hoặc mật khẩu không chính xác
                        </p>
                      </div> */}
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Sign in
                        </button>
                      </div>
                      <p className="text-center text-muted mt-5 mb-0">
                        Have already an account?{" "}
                        <a href="/signup" className="fw-bold text-body">
                          <u>register here</u>
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Signin;
