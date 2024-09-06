import styled from "@emotion/styled";
import BoardField from "components/board/BoardField";
import BoardHeader from "components/board/header/BoardHeader";

const BoardWrap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: aliceblue;
`;

const Board = (): JSX.Element => {
  return (
    <BoardWrap>
      <BoardHeader />
      <BoardField />
    </BoardWrap>
  );
};

export default Board;
