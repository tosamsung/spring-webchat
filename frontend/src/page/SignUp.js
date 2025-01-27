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
    phone: "",
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
      phone,
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
      !phone ||
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
        phone: "",
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
              <div className="col-12 col-md-9 col-lg-7 col-xl-6 py-3">
                <div className="card" style={{ borderRadius: 15 }}>
                  <div className="card-body p-3">
                    <h2 className="text-uppercase text-center mb-5">
                    <i className='bx bx-edit-alt'></i>&nbsp;Create an account
                    </h2>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div
                          data-mdb-input-init
                          className="form-outline mb-4 col"
                        >
                          <input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            type="text"
                            className="form-control form-control-lg"
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example1cg"
                          >
                            First Name
                          </label>
                        </div>
                        <div
                          data-mdb-input-init
                          className="form-outline mb-4 col"
                        >
                          <input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            type="text"
                            className="form-control form-control-lg"
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example1cg"
                          >
                            Last Name
                          </label>
                        </div>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          name="userName"
                          value={formData.userName}
                          onChange={handleInputChange}
                          type="text"
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
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form3Example3cg">
                          Your Email
                        </label>
                      </div>
                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form3Example3cg">
                          Phone Number
                        </label>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          type="password"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form3Example4cg">
                          Password
                        </label>
                      </div>
                      <div className="row">
                        <div data-mdb-input-init className="form-outline mb-4 col">
                          <input
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            type="date"
                            className="form-control form-control-lg"
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example4cg"
                          >
                            Birth Date
                          </label>
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4 col">
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
                          <label
                            className="form-label"
                            htmlFor="form3Example1cg"
                          >
                            Gender
                          </label>
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-3">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          defaultValue
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3g"
                        >
                          I agree all statements in&nbsp;
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
                      <p className="text-center text-muted mt-3 mb-0">
                        Have already an account ?&nbsp;
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
