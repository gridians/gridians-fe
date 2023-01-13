import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./pages/Home";
import MemberListPage from "./pages/MemberListPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/memberlistpage"} element={<MemberListPage />} />
      </Routes>
    </BrowserRouter>
  );
}
