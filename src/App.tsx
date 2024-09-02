import Header from "components/layout/Header";
import Board from "pages/board/Board";
import Home from "pages/home/Home";
import Signin from "pages/user/Signin";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import "./css/common.css";
import "./css/reset.css";
import { useEffect, useState } from "react";
import Test from "Test";

function App() {
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    // 로그인, 회원가입 경로에서는 헤더를 숨기고, 나머지 경로에서는 헤더를 표시
    if (location.pathname === "/signin" || location.pathname === "/signup") {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [location.pathname]); // 경로가 바뀔 때마다 실행

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/board" element={<Board />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/test" element={<Test />}></Route>
      </Routes>
    </>
  );
}

export default App;
