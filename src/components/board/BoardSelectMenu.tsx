import styled from "@emotion/styled";
import MenuItem from "antd/es/menu/MenuItem";
import React, { ReactElement } from "react";

const IconWrapStyle = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type menuItem = {
  item?: ReactElement;
  state?: string;
};

type BoardSelectMenuProps = {
  menuList: menuItem[];
};

const BoardSelectMenu: React.FC<BoardSelectMenuProps> = ({ menuList }) => {
  const tempHandle = (index: number) => {
    console.log(index);
  };

  return (
    <>
      {menuList.map((item: menuItem, index: number) => (
        <IconWrapStyle
          key={index}
          onClick={() => {
            tempHandle(index);
          }}
        >
          {item.item}
        </IconWrapStyle>
      ))}
    </>
  );
};

export default BoardSelectMenu;
