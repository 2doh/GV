import styled from "@emotion/styled";
import React from "react";
import { useNavigate } from "react-router";
import userState from "store/userState";

interface HomeProps {
  children: string;
}

const HomeBtnStyle = styled.div`
  width: 210px;
  padding: 15px;
  min-height: 55px;
  background-color: #3e00ed;
  color: white;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media (max-width: 900px) {
    width: 150px;
    height: 55px;
    font-size: 15px;
  }
  @media (max-width: 540px) {
    width: 150px;
    height: 35px;
    font-size: 15px;
  }
`;

const HomeBtn = ({ children }: HomeProps): JSX.Element => {
  const navi = useNavigate();
  const handleBtClick = (children: string) => {
    if (children === "참여하기") {
      alert("dd");
    }
    if (children === "요금제 및 가격") {
      alert("준비중입니다");
    }
    if (children === "로그인") {
      navi("/signin");
    }
  };

  return (
    <HomeBtnStyle
      className="br10"
      onClick={() => {
        handleBtClick(children);
      }}
    >
      {children}
    </HomeBtnStyle>
  );
};

export default HomeBtn;
