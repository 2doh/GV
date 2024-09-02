import styled from "@emotion/styled";
import React from "react";

const DividerStyle = styled.div`
  border: none;
  border-top: 1px solid #ccc;
`;

const Divider = (): JSX.Element => {
  return <DividerStyle />;
};

export default Divider;
