import Header from "components/layout/Header";
import Board from "pages/board/Board";
import Home from "pages/home/Home";
import Signin from "pages/user/Signin";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./css/common.css";
import "./css/reset.css";
import { useEffect, useState } from "react";
import Test from "Test";
import FindId from "pages/user/FindId";
import Signup from "pages/user/Signup";
import FindPass from "pages/user/FindPass";

function App() {
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    // 로그인, 회원가입 경로에서는 헤더를 숨기고, 나머지 경로에서는 헤더를 표시
    const hiddenPaths = ["/signin", "/signup", "/findid"];
    setShowHeader(!hiddenPaths.includes(location.pathname));
  }, [location.pathname]); // 경로가 바뀔 때마다 실행

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/findid" element={<FindId />}></Route>
        <Route path="/findpass" element={<FindPass />}></Route>
        <Route path="/board" element={<Board />}></Route>
      </Routes>
    </>
  );
}

export default App;
