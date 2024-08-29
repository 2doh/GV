import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./css/reset.css";
import "./css/common.css";
import Test from "Test";
import Board from "pages/board/Board";
import Home from "pages/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/board" element={<Board />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
