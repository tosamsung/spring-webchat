import React, { useContext, useEffect, useState } from "react";
import UserService from "../../Service/UserService";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";
function Edit(props) {
  const { user } = useContext(AppContext);
  const [userDto, setUserDto] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    phone: "",
    birthDate: "",
    gender: "",
  });
  useEffect(() => {
    setUserDto(user);
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDto({ ...userDto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, userName, phone, birthDate, gender } =
    userDto;
    
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
      await UserService.updateUser(userDto);
      toast.success("User registerd successfully");
    } catch (error) {
      alert("An error occurred while update user");
    }
  };
  return (
    <>
      <link rel="stylesheet" href="css/edit.css" />

      <section>
        <div className="mask d-flex align-items-center h-100">
          <div className="container h-100 p-0">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6 w-100">
                <div className="card-body p-3">
                  <h2 className="text-uppercase text-center mb-5">
                    Edit Profile
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        name="firstName"
                        value={userDto.firstName || ''}
                        onChange={()=>{handleInputChange()}}
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
                        value={userDto.lastName || ''}
                        onChange={()=>{handleInputChange()}}
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
                        value={userDto.userName || ''}
                        onChange={()=>{handleInputChange()}}
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
                        value={userDto.phone || ''}
                        onChange={()=>{handleInputChange()}}
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
                        value={userDto.birthDate || ''}
                        onChange={()=>{handleInputChange()}}
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
                        value={userDto.gender || ''}
                        onChange={()=>{handleInputChange()}}
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
                  </form>
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
