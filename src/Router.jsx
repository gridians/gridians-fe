import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Education from "./pages/Education";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import Register from "./pages/Register";


export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/"} element={<Intro />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/education"} element={<Education />} />
      </Routes>

      {/* <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
        </Route>
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes> */}

    </BrowserRouter>
  );
}
