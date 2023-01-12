import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";



export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/"} />
      </Routes>
    </BrowserRouter>
  );
}
