import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Test from "Test";
import Board from "pages/board/Board";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/board" element={<Board />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
