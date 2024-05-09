import Layout from "./layout/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
import ChatPage from "./page/ChatPage";
import Page404 from "./page/Page404";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";


function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn></SignIn>}></Route>
      <Route path="/signup" element={<SignUp></SignUp>}></Route>
      <Route path="/" element={<Layout></Layout>}>
        <Route path="" element={<ChatPage></ChatPage>}></Route>
        <Route path="chats" element={<ChatPage></ChatPage>}></Route>
        <Route path="/*" element={<Page404></Page404>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
