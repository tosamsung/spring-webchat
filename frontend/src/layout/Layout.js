import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import UserService from "../Service/UserService";
import Profile from "../components/profile/Profile";
import { AppContext } from "../context/AppContext";
function Layout() {
  const navigate=useNavigate();
  const auth=useContext(AppContext).auth
  const setAuth=useContext(AppContext).setAuth

  const handleLogout = () => {
    const confirm = window.confirm(
      "Are you sure you want to logout this user?"
    );
    if (confirm) {
      UserService.logout();
      setAuth()
    }
  };

  const showNavbar = () => {
    const toggle = document.getElementById("header-toggle"),
      nav = document.getElementById("nav-bar"),
      bodypd = document.getElementById("body-pd"),
      headerpd = document.getElementById("header");

    // Validate that all variables exist
    if (nav && bodypd && headerpd) {
      // show navbar
      nav.classList.toggle("showMenu");
      // change icon
      toggle.classList.toggle("fa-circle-xmark");
      // add padding to body
      bodypd.classList.toggle("body-pd");
      // add padding to header
      // headerpd.classList.toggle('body-pd')
    }
  };

  useEffect(() => {
    if (!auth) {
      navigate("/signin");
    }

  }, [auth]);

  return (
    <>
      <link rel="stylesheet" href="css/layout.css" />
        <header className="header sticky-top" id="header">
          <div className="row h-100 p-1">
            <div className="header_toggle d-inline-block col">
              <i
                className="fa-solid fa-bars text-white fs-2"
                id="header-toggle"
                onClick={() => {
                  showNavbar();
                }}
              />
            </div>
            <div
              className="col d-flex justify-content-end p-2 bg-light rounded-2 btn user"
            >
              <img
                src="https://i.pinimg.com/736x/f9/4f/e3/f94fe3bd5ff54e08ee5e9e352384ca14.jpg"
                className="rounded-circle user-img img-fluid "
                alt="Mô tảx` ảnh"
              />
              <p className="m-0 px-2">User A</p>
            </div>
          </div>
        </header>
        <div className="l-navbar" id="nav-bar">
          <nav className="nav">
            <div>
              <NavLink to="/chats" className="nav_logo">
                <i className="bx bx-layer nav_logo-icon" />
                <span className="nav_logo-name">WebChat</span>
              </NavLink>
              <div className="nav_list">
                <NavLink href="/chats" className="nav_link">
                  <i className="bx bx-conversation nav_icon" />
                  <span className="nav_name">Chats</span>
                </NavLink>
                <a
                  data-bs-toggle="modal"
                  href="#exampleModalToggle"
                  role="button"
                  className="nav_link"
                >
                  <i className="bx bx-user nav_icon" />
                  <span className="nav_name">Users</span>{" "}
                  {/* chỉnh lại active */}
                </a>
              </div>
            </div>
            <NavLink to="/" className="nav_link" onClick={handleLogout}>
              <i className="bx bx-log-out nav_icon" />
              <span className="nav_name">SignOut</span>
            </NavLink>
          </nav>
        </div>
        {/*Container Main start*/}
        <div className="container-fluid ">
          <Outlet></Outlet>
        </div>
        {/*Container Main end*/}
        <Profile></Profile>
    </>
  );
}
export default Layout;
