import styled from "@emotion/styled";
import React, { useState } from "react";

const CheckBoxWrapStyle = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const CheckFieldWrap = styled.div`
  /* display: flex; */
`;

const CheckBoxStyle = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1.5px solid gray;
  border-radius: 5px;
  cursor: pointer;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #3e00ed;
  }
`;

interface CheckBoxProp {
  title?: string;
  msg?: string;
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckBox = ({
  title,
  msg,
  setIsChecked,
  isChecked,
}: CheckBoxProp): JSX.Element => {
  return (
    <CheckBoxWrapStyle>
      <CheckFieldWrap>
        <label
          style={{
            display: "flex",
            gap: "10px",
            maxWidth: "120px",
            cursor: "pointer",
          }}
        >
          <CheckBoxStyle
            type="checkbox"
            onClick={() => setIsChecked(!isChecked)}
          ></CheckBoxStyle>
          <p>{title}</p>
        </label>
      </CheckFieldWrap>
      {isChecked && <p style={{ color: "#999", marginTop: "10px" }}>{msg}</p>}
    </CheckBoxWrapStyle>
  );
};

export default CheckBox;
