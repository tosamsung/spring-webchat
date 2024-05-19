import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../Service/UserService";
import { toast } from "react-toastify";

function Signup() {
  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    birthDate: "",
    gender: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      birthDate,
      gender,
    } = formData;

    // Kiểm tra các trường có được nhập đầy đủ hay không
    if (
      !firstName ||
      !lastName ||
      !userName ||
      !email ||
      !password ||
      !birthDate ||
      !gender
    ) {
      toast.error("All fields are required.");
      return;
    }
    try {
      // const token = localStorage.getItem("token");
      await UserService.register(formData);

      setFormData({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        birthDate: "",
        gender: "",
      });
      toast.success("User registerd successfully");
      Navigate("/signIn");
    } catch (error) {
      console.error("Error registering user", error);
      alert("An error occurred while registering user");
    }
  };

  return (
    <>
      <link rel="stylesheet" href="css/sign-up.css" />

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
                      Create an account
                    </h2>
                    <form onSubmit={handleSubmit}>
                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          type="text"
                          id="form3Example1cg"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form3Example1cg">
                          First Name
                        </label>
                      </div>
                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          type="text"
                          id="form3Example1cg"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form3Example1cg">
                          Last Name
                        </label>
                      </div>
                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          name="userName"
                          value={formData.userName}
                          onChange={handleInputChange}
                          type="text"
                          id="form3Example1cg"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form3Example1cg">
                          User Name
                        </label>
                      </div>
                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          id="form3Example3cg"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form3Example3cg">
                          Your Email
                        </label>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          type="password"
                          id="form3Example4cg"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form3Example4cg">
                          Password
                        </label>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          name="birthDate"
                          value={formData.birthDate}
                          onChange={handleInputChange}
                          type="date"
                          id="form3Example4cg"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form3Example4cg">
                          Birth Date
                        </label>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="form-select form-select-lg"
                          aria-label="Gender"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        <label className="form-label" htmlFor="form3Example1cg">
                          Gender
                        </label>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          defaultValue
                          id="form2Example3cg"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3g"
                        >
                          I agree all statements in{"{"}" "{"}"}
                          <a href="#!" className="text-body">
                            <u>Terms of service</u>
                          </a>
                        </label>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Register
                        </button>
                      </div>
                      <p className="text-center text-muted mt-5 mb-0">
                        Have already an account?{"{"}" "{"}"}
                        <a href="signIn" className="fw-bold text-body">
                          <u>Login here</u>
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
export default Signup;
