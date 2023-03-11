import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./components/loading/LoadingSpinner";

import { getCookieToken } from "./cookie/cookie";
const Header = lazy(() => import("./components/common/Header"));
const Home = lazy(() => import("./pages/Home"));
const Intro = lazy(() => import("./pages/Intro"));
const MyPage = lazy(() => import("./pages/MyPage"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Login = lazy(() => import("./pages/Login"));
const GithubLoginPage = lazy(() => import("./pages/GithubLoginPage"));
const Certification = lazy(() => import("./components/signup/Certification"));
const NotFound = lazy(() => import("./components/notfound/NotFound"));

export default function Router() {
  const isLogin = !!getCookieToken("accessToken");
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path={"/"} element={<Intro />} />
          <Route
            path={"/login"}
            element={isLogin ? <Navigate to="/home" /> : <Login />}
          />
          <Route path={"/signup"} element={<SignUp />} />
          <Route path={"/home"} element={<Home />} />
          <Route path={"/mypage"} element={<MyPage />} />
          <Route path={"/githubloginpage"} element={<GithubLoginPage />} />
          <Route path={"/certification"} element={<Certification />} />
          <Route path={"/*"} element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
