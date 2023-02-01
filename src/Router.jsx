import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Education from "./pages/Education";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import MyPage from "./pages/MyPage";
import SignUp from "./pages/SignUp";
import MemberListPage from "./pages/MemberListPage";
import Login from "./pages/Login";
import GithubLoginPage from "./pages/GithubLoginPage";
import Certification from "./components/signup/Certification";
import { getCookieToken } from "./cookie/cookie";

export default function Router() {
  const isLogin = !!getCookieToken("accessToken");
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/"} element={<Intro />} />
        <Route path={"/memberlistpage"} element={<MemberListPage />} />

        <Route
          path={"/login"}
          element={isLogin ? <Navigate to="/home" /> : <Login />}
        />
        <Route path={"/register"} element={<SignUp />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/education"} element={<Education />} />
        <Route path={"/mypage"} element={<MyPage />} />
        <Route path={"/githubloginpage"} element={<GithubLoginPage />} />
        <Route path={"/certification"} element={<Certification />} />
      </Routes>
    </BrowserRouter>
  );
}
