import styled from "@emotion/styled";
import Header from "components/layout/Header";
import React from "react";

const NotFound = () => {
  return (
    <>
      <TextWrapStyle>
        <TextStyle>404 Not Found</TextStyle>
      </TextWrapStyle>
      <canvas />
    </>
  );
};

export default NotFound;

const TextWrapStyle = styled.div`
  position: absolute;
  top: 10%;
  width: 100%;
  text-align: center;
`;

const TextStyle = styled.h1`
  font-size: 80px;
  font-weight: 700;
`;
