import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Education from "./pages/Education";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import MyPage from "./pages/MyPage";
import Register from "./pages/Register";
import MemberListPage from "./pages/MemberListPage";
import Login from "./pages/Login";
import GithubLoginPage from "./pages/GithubLoginPage";
import Certification from "./components/register/Certification";

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/"} element={<Intro />} />
        <Route path={"/memberlistpage"} element={<MemberListPage />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/education"} element={<Education />} />
        <Route path={"/mypage"} element={<MyPage />} />
        <Route path={"/githubloginpage"} element={<GithubLoginPage />} />
        <Route path={"/certification"} element={<Certification />} />
      </Routes>
    </BrowserRouter>
  );
}
