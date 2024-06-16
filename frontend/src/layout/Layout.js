import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "../css/layout.module.css";
import UserService from "../Service/UserService";
import Profile from "../components/profile/Profile";
import { AppContext } from "../context/AppContext";
import { ChatContext } from "../context/ChatContext";

function Layout() {
  const setAuth = useContext(AppContext).setAuth;
  const { stompClient } = useContext(ChatContext);
  const handleLogout = () => {
    const confirm = window.confirm(
      "Are you sure you want to logout this user?"
    );
    if (confirm) {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect(() => {
          console.log("Disconnected from WebSocket");
          UserService.logout();
          setAuth(null); // Assuming `setAuth` clears authentication state
        });
      } else {
        UserService.logout();
        setAuth(null); // Assuming `setAuth` clears authentication state
      }
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
      nav.classList.toggle(styles.show);
      // change icon
      toggle.classList.toggle("fa-circle-xmark");
      // add padding to body
      bodypd.classList.toggle(styles.body_pd);
      // add padding to header
      // headerpd.classList.toggle('body-pd')
    }
  };

  // useEffect(() => {
  //   if (!auth) {
  //     navigate("/signin");
  //   }
  // }, []);

  return (
    <>
      {/* <link rel="stylesheet" href="css/layout.css" /> */}
      <header className={`${styles.header}  sticky-top`} id="header">
        <div className="row h-100 p-1">
          <div className={`${styles.header_toggle} d-inline-block col`}>
            <i
              className={`${styles.menu_button} fa-solid fa-bars text-white fs-2`}
              id="header-toggle"
              onClick={() => {
                showNavbar();
              }}
            />
          </div>
        </div>
      </header>
      <div className={styles.lNavbar} id="nav-bar">
        <nav className={styles.nav}>
          <div>
            <NavLink to="/chats" className={styles.nav_logo}>
              <i className={`${styles.nav_logo_icon}  bx bx-layer`} />
              <span className={styles.nav_logo_name}>WebChat</span>
            </NavLink>
            <div className="nav_list">
              <NavLink to="/chats" className={`${styles.nav_logo} text-white`}>
                <i className={`${styles.nav_icon}  bx bx-conversation`} />
                <span className={styles.nav_name}>Chats</span>
              </NavLink>
              <NavLink
                to="/friends"
                className={`${styles.nav_logo} text-white`}
              >
                <i className={`${styles.nav_icon}  bx bx-search-alt-2`}></i>
                <span className={styles.nav_name}>Friends</span>
              </NavLink>
              <a
                data-bs-toggle="modal"
                href="#exampleModalToggle"
                role="button"
                className={styles.nav_link}
              >
                <i className={`${styles.nav_icon} bx bx-user`} />
                <span className={styles.nav_name}>Users</span>
                {/* chỉnh lại active */}
              </a>
            </div>
          </div>
          <NavLink to="/" className={styles.nav_link} onClick={handleLogout}>
            <i className={`${styles.nav_icon}  bx bx-log-out`} />
            <span className={styles.nav_name}>SignOut</span>
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
