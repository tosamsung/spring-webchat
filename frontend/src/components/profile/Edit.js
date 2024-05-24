import React, { useEffect, useState } from "react";
import UserService from "../../Service/UserService";
import { toast } from "react-toastify";

function Edit() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    image: "",
    phone: "",
    birthDate: "",
    gender: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, userName, image, phone, birthDate, gender } =
      user;

    // Kiểm tra các trường có được nhập đầy đủ hay không
    if (
      !firstName ||
      !lastName ||
      !userName ||
      !phone ||
      !birthDate ||
      !gender
    ) {
      toast.error("All fields are required.");
      return;
    }

    try {
      await UserService.updateUser(user);
      setUser({
        firstName: "",
        lastName: "",
        userName: "",
        image: "",
        phone: "",
        birthDate: "",
        gender: "",
      });

      toast.success("User registerd successfully");
    } catch (error) {
      alert("An error occurred while update user");
    }
  };
const fetchUser = async () => {
      try {
        const response = await UserService.getUser();
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  useEffect(() => {
    
    fetchUser();
  }, []);

  return (
    <>
      <link rel="stylesheet" href="css/sign-up.css" />

      <section
        className="bg-image"
       
      >
        <div className="mask d-flex align-items-center h-100">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6 w-100 p-0">
                <div className="card">
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      Edit Profile
                    </h2>
                    <form onSubmit={handleSubmit}>
                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          name="firstName"
                          value={user.firstName}
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
                          value={user.lastName}
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
                          value={user.userName}
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
                          name="phone"
                          value={user.phone}
                          onChange={handleInputChange}
                          type="number"
                          id="form3Example4cg"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form3Example4cg">
                          Phone
                        </label>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          name="birthDate"
                          value={user.birthDate}
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
                          value={user.gender}
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
export default Edit;
