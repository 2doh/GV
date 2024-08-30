import styled from "@emotion/styled";
import React from "react";

const HeaderStyle = styled.div`
  z-index: 99999;
  position: absolute;
  width: 100%;
  height: 100%;
  max-height: 120px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Header = () => {
  return <HeaderStyle>Header</HeaderStyle>;
};

export default Header;
