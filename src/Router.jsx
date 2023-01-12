import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/common/Header";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Board from "./pages/Board";
import Mate from "./pages/Mate";
import Project from "./pages/Project";
import Study from "./pages/Study";
import FindId from "./pages/FindId";
import DetailBoard from "./pages/DetailBoard";

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/board"} element={<Board />} />

        <Route path={"/mate"} element={<Mate />}></Route>
        <Route path={"/detail"} element={<DetailBoard />} />

        <Route path={"/project"} element={<Project />} />
        <Route path={"/study"} element={<Study />} />
        <Route path={"/findid"} element={<FindId />} />
      </Routes>
    </BrowserRouter>
  );
}
