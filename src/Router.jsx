import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import Register from "./pages/Register";

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/intro"} element={<Intro />} />
        <Route path={"/"} element={<Home />} />
        <Route path={"/register"} element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
