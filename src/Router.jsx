import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./pages/Home";

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
