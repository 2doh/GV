import styled from "@emotion/styled";
import { Dispatch, ReactElement, SetStateAction } from "react";
import boardState from "store/boardState";

const IconWrapStyle = styled.div`
  width: 40px;
  /* height: 40px; */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

type menuItem = {
  item?: ReactElement;
  state: string;
};

type BoardSelectMenuProps = {
  menuList: menuItem[];
};

const BoardSelectMenu = ({ menuList }: BoardSelectMenuProps): JSX.Element => {
  const tempHandle = (item: menuItem) => {
    // console.log(index);
    // console.log(item.state);

    // zustand store에 담는 코드
    boardState.getState().setCursorState(item.state);
  };

  return (
    <>
      {menuList.map((item: menuItem, index: number) => (
        <IconWrapStyle
          key={index}
          onClick={() => {
            tempHandle(item);
          }}
        >
          {item.item}
        </IconWrapStyle>
      ))}
    </>
  );
};

export default BoardSelectMenu;
