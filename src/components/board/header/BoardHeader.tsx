import styled from "@emotion/styled";

import LogoBlack from "components/common/LogoBlack";
import { ReactElement } from "react";
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
import { RxCursorArrow } from "react-icons/rx";
import BoardSelectMenu from "./BoardSelectMenu";
import Palette from "../Palette";

const BoardHeaderWrap = styled.div`
  width: 100%;
  height: 100%;
  min-height: 70px;
  max-height: 90px;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  /* position: relative; */
  position: absolute;
  padding-left: 10px;
`;

const BoardHeaderInnerStyle = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  /* background-color: blue; */
  padding: 20px;
`;

interface menuItem {
  item?: ReactElement;
  state: string;
}

export const menuList: menuItem[] = [
  {
    item: <RxCursorArrow />,
    state: "cursor",
  },
  {
    item: <FaPen />,
    state: "pen",
  },
  { item: <Palette />, state: "palette" },
  // { item: <FaPalette />, state: "palette" },
  { item: <FaFillDrip />, state: "fill" },
  { item: <FaRegSquare />, state: "quadrangle" },
  { item: <FaRegCircle />, state: "circle" },
  { item: <FaEraser />, state: "eraser" },
  { item: <FaUndoAlt />, state: "undo" },
  { item: <FaImage />, state: "image" },
];

const BoardHeader = (): JSX.Element => {
  return (
    <BoardHeaderWrap>
      <LogoBlack />
      <BoardHeaderInnerStyle>
        <BoardSelectMenu menuList={menuList} />
      </BoardHeaderInnerStyle>
    </BoardHeaderWrap>
  );
};

export default BoardHeader;
