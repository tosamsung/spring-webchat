import Layout from "./layout/Layout";
import { Route, Routes } from "react-router-dom";
import ChatPage from "./page/ChatPage";
import Page404 from "./page/Page404";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";
import Profile from "./components/profile/Profile";
import Edit from "./components/profile/Edit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignIn></SignIn>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        {/* <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/edit" element={<Edit></Edit>}></Route> */}
        <Route path="/" element={<Layout></Layout>}>
          <Route path="" element={<></>}></Route>
          <Route path="chats" element={<ChatPage></ChatPage>}></Route>
          <Route path="/*" element={<Page404></Page404>}></Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );

  {
    /* Same as */
  }
  <ToastContainer />;
}

export default App;
