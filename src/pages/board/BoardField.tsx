import styled from "@emotion/styled";
import Test from "Test";
import React from "react";

const FieldStyle = styled.div`
  width: 100%;
  height: 100%;
`;

const BoardField = (): JSX.Element => {
  return (
    <FieldStyle>
      <Test></Test>
    </FieldStyle>
  );
};

export default BoardField;
