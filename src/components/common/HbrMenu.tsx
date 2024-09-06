import styled from "@emotion/styled";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const HbrMenuStyle = styled.div`
  width: 80px;
  height: 80px;
  cursor: pointer;
  @media (max-width: 540px) {
    width: 90px;
    height: 40px;
  }
`;

const HbrMenu = (): JSX.Element => {
  const hbrHandler = () => {
    alert("준비중입니다(마이페이지).");
  };

  return (
    <HbrMenuStyle>
      <RxHamburgerMenu
        style={{ height: "100%", width: "100%" }}
        onClick={() => hbrHandler()}
      />
    </HbrMenuStyle>
  );
};

export default HbrMenu;
