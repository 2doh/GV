import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./css/reset.css";
import "./css/common.css";
import Test from "Test";
import Board from "pages/board/Board";
import Home from "pages/home/Home";
import Header from "components/layout/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/board" element={<Board />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
