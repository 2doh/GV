import Header from "components/layout/Header";
import Board from "pages/board/Board";
import Home from "pages/home/Home";
import Signin from "pages/user/Signin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./css/common.css";
import "./css/reset.css";
import { useState } from "react";

function App() {
  const [showHeader, setShowHeader] = useState(true);

  return (
    <BrowserRouter>
      {showHeader && <Header />}
      <Routes>
        <Route path="/board" element={<Board />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
