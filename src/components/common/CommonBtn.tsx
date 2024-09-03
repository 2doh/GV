import styled from "@emotion/styled";
import React from "react";

const BtnStyle = styled.button`
  width: 100%;
  height: 60px;
  padding: 5px;
  background-color: #3e00ed;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  font-size: 17px;
  cursor: pointer;
`;

interface CommonBtnProps {
  children: React.ReactNode;
}

const CommonBtn = ({ children }: CommonBtnProps): JSX.Element => {
  return <BtnStyle type="submit">{children}</BtnStyle>;
};

export default CommonBtn;
