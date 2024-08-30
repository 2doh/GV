import styled from "@emotion/styled";
import React from "react";

interface HomeProps {
  children: string;
}

const HomeBtnStyle = styled.div`
  width: 210px;
  height: 75px;
  background-color: #3e00ed;
  color: white;
  padding: 25px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media (max-width: 900px) {
    width: 150px;
    height: 70px;
    font-size: 15px;
    padding: 15px;
  }
  @media (max-width: 540px) {
    width: 80px;
    height: 50px;
    font-size: 10px;
    padding: 5px;
  }
`;

const HomeBtn = ({ children }: HomeProps): JSX.Element => {
  const handleBtClick = (children: string) => {
    if (children === "참여하기") {
      alert("dd");
    }
    if (children === "요금제 및 가격") {
      alert("준비중입니다");
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
