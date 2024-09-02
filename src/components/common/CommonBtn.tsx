import styled from "@emotion/styled";
import React from "react";

const BtnStyle = styled.div`
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
`;

interface CommonBtn {
  children: React.ReactNode;
}

const CommonBtn = ({ children }: CommonBtn): JSX.Element => {
  return <BtnStyle className="br10">{children}</BtnStyle>;
};

export default CommonBtn;
