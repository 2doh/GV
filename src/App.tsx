import Header from "components/layout/Header";
import Board from "pages/board/Board";
import Home from "pages/home/Home";
import FindId from "pages/user/FindId";
import FindPass from "pages/user/FindPass";
import Signin from "pages/user/Signin";
import Signup from "pages/user/Signup";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./css/common.css";
import "./css/reset.css";
import userState from "store/userState";
import NotFound from "pages/NotFound";
import Loading from "components/common/Loading";
import Test from "Test";

function App() {
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);
  const { accessToken } = userState();

  useEffect(() => {
    // const hiddenPaths = [
    //   "/board",
    //   "/signin",
    //   "/signup",
    //   "/findid",
    //   "/findpass",
    // ];
    const hiddenPaths = ["/"];
    setShowHeader(hiddenPaths.includes(location.pathname));
    // setShowHeader(!hiddenPaths.includes(location.pathname));
  }, [location.pathname]); // 경로가 바뀔 때마다 실행

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        {accessToken && (
          <>
            <Route path="/board" element={<Board />}></Route>
          </>
        )}
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/findid" element={<FindId />}></Route>
        <Route path="/findpass" element={<FindPass />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
