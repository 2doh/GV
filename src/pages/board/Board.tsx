import React from "react";
import styled from "@emotion/styled";
import BoardHeader from "pages/board/BoardHeader";
import BoardField from "./BoardField";

const BoardWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const Board = () => {
  return (
    <BoardWrap>
      <BoardHeader />
      <BoardField />
    </BoardWrap>
  );
};

export default Board;
