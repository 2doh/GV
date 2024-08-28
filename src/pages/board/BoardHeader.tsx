import styled from "@emotion/styled";
import BoardSelectMenu from "components/board/BoardSelectMenu";
import React, { ReactElement } from "react";
import {
  FaEraser,
  FaFillDrip,
  FaImage,
  FaPalette,
  FaPen,
  FaRegCircle,
  FaRegSquare,
  FaUndoAlt,
} from "react-icons/fa";

const BoardHeaderWrap = styled.div`
  width: 100%;
  height: 100%;
  min-height: 70px;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BoardHeaderInnerStyle = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  /* background-color: blue; */
  padding: 20px;
  cursor: pointer;
`;

export interface menuItem {
  item?: ReactElement;
  state?: string;
}

const menuList: menuItem[] = [
  {
    item: <FaPen />,
    state: "pen",
  },
  { item: <FaPalette />, state: "palette" },
  { item: <FaFillDrip />, state: "fill" },
  { item: <FaRegSquare />, state: "square" },
  { item: <FaRegCircle />, state: "circle" },
  { item: <FaEraser />, state: "eraser" },
  { item: <FaUndoAlt />, state: "undo" },
  { item: <FaImage />, state: "image" },
];

const BoardHeader: React.FC = () => {
  return (
    <BoardHeaderWrap>
      <BoardHeaderInnerStyle>
        <BoardSelectMenu menuList={menuList} />
      </BoardHeaderInnerStyle>
      <BoardHeaderInnerStyle>{/* <BoardSelectMenu /> */}</BoardHeaderInnerStyle>
    </BoardHeaderWrap>
  );
};

export default BoardHeader;
