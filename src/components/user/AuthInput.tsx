import styled from "@emotion/styled";
import usePlaceholder from "hook/usePlaceholder";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
  register: any;
  error?: string;
}

const AuthInput = ({ children, register, error }: AuthData): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const [visiblePass, setVisiblePass] = useState<boolean>(false);
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
        type={
          children.includes("비밀번호")
            ? visiblePass
              ? "text"
              : "password"
            : "text"
        }
      ></AuthInputStyle>
      <div style={{ gap: "10px", display: "flex" }}>
        {children.includes("비밀번호") &&
          inputValue &&
          (!visiblePass ? (
            <FaEyeSlash
              style={{ width: "20px", height: "20px" }}
              onClick={() => setVisiblePass(true)}
            />
          ) : (
            <FaEye
              style={{ width: "20px", height: "20px" }}
              onClick={() => setVisiblePass(false)}
            />
          ))}
        {inputValue && (
          <MdCancel
            style={{ width: "20px", height: "20px" }}
            onClick={() => clearInput()}
          />
        )}
      </div>
    </AuthInputWrap>
  );
};

export default AuthInput;
