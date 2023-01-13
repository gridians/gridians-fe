import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import MemberListPage from "./pages/MemberListPage";



export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/"} />
        <Route path={"/memberlistpage"} element={<MemberListPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
