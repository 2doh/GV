import styled from "@emotion/styled";
import usePlaceholder from "hook/usePlaceholder";
import React, { useState } from "react";
import { MdCancel } from "react-icons/md";

const AuthInputStyle = styled.input`
  width: 100%;
  border: none;
  padding: 10px;
`;

const AuthInputWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-right: 10px;
  cursor: pointer;
`;

interface AuthData {
  children: string;
}

const AuthInput = ({ children }: AuthData): JSX.Element => {
  const [inputValue, setInputValue] = useState("");
  const clearInput = () => {
    setInputValue("");
  };

  const { placeholder, handleFocus, handleBlur } = usePlaceholder(children);

  return (
    <AuthInputWrap>
      <AuthInputStyle
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder={placeholder}
        onFocus={() => handleFocus()}
        onBlur={() => handleBlur()}
        type={children === "비밀번호를 입력해 주세요" ? "password" : "text"}
      ></AuthInputStyle>
      {inputValue && (
        <MdCancel
          style={{ width: "25px", height: "25px" }}
          onClick={() => clearInput()}
        />
      )}
    </AuthInputWrap>
  );
};

export default AuthInput;
