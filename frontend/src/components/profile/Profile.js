import React, { useEffect, useState } from "react";
import UserService from "../../Service/UserService";
import { NavLink, Outlet } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import Edit from "./Edit";

function Profile() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    image: "",
    phone: "",
    birthDate: "",
    gender: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await UserService.getUser().then((data)=>{
          console.log(data);
          setUser(data)
        }
          
        );
        // response.userName=""
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <link rel="stylesheet" href="css/profile.css" />
      <div>
        <div
          className="modal fade"
          id="exampleModalToggle"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog">
            <div className="modal-content">
              <div className="modal-header p-1">
               
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <section style={{ backgroundColor: "#f4f5f7" }}>
                  <MDBContainer>
                    <MDBRow className="justify-content-center align-items-center h-100">
                      <MDBCol lg="6" className="mb-4 mb-lg-0 w-100 p-0">
                        <MDBCard
                          style={{ borderRadius: ".5rem" }}
                        >
                          <MDBRow className="g-0">
                            <MDBCol
                              md="4"
                              className="gradient-custom text-center text-white"
                              style={{
                                borderTopLeftRadius: ".5rem",
                                borderBottomLeftRadius: ".5rem",
                              }}
                            >
                              <MDBCardImage
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                alt="Avatar"
                                className="my-5"
                                style={{ width: "80px" }}
                                fluid
                              />

                              <MDBTypography tag="h5"></MDBTypography>
                              <MDBCardText>{user.userName}</MDBCardText>
                              <a 
                              className="btn "
                               data-bs-target="#exampleModalToggle2"
                               data-bs-toggle="modal"
                               data-bs-dismiss="modal">
                                <MDBIcon className="text-primary" far icon="edit mb-5" />
                              </a>
                            </MDBCol>
                            <MDBCol md="8">
                              <MDBCardBody className="p-4">
                                <MDBTypography tag="h6">
                                  Information
                                </MDBTypography>
                                <hr className="mt-0 mb-4" />
                                <MDBRow className="pt-1">
                                  <MDBCol size="6" className="mb-3">
                                    <MDBTypography tag="h6">
                                      Email
                                    </MDBTypography>
                                    <MDBCardText className="text-muted">
                                      {user.email}
                                    </MDBCardText>
                                  </MDBCol>
                                  <MDBCol size="6" className="mb-3">
                                    <MDBTypography tag="h6">
                                      Phone
                                    </MDBTypography>
                                    <MDBCardText className="text-muted">
                                      {user.phone}
                                    </MDBCardText>
                                  </MDBCol>
                                </MDBRow>
                                <hr className="mt-0 mb-4" />
                                <MDBRow className="pt-1">
                                  <MDBCol size="6" className="mb-3">
                                    <MDBTypography tag="h6">
                                      Gender
                                    </MDBTypography>
                                    <MDBCardText className="text-muted">
                                      {user.gender}
                                    </MDBCardText>
                                  </MDBCol>
                                  <MDBCol size="6" className="mb-3">
                                    <MDBTypography tag="h6">
                                      BirthDay
                                    </MDBTypography>
                                    <MDBCardText className="text-muted">
                                      {user.birthDate}
                                    </MDBCardText>
                                  </MDBCol>
                                </MDBRow>
                              </MDBCardBody>
                            </MDBCol>
                          </MDBRow>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>
                </section>
              </div>
            
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="exampleModalToggle2"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel2"
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header p-1">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body p-0">
                <Edit></Edit>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  data-bs-target="#exampleModalToggle"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                >
                  Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
