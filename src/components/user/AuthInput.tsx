import styled from "@emotion/styled";
import usePlaceholder from "hook/usePlaceholder";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import AuthErrMsg from "./AuthErrMsg";
import { PhoneNumber } from "util/helper";

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
  title: string;
}

const AuthInput = ({ children, register, title }: AuthData): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const [visiblePass, setVisiblePass] = useState<boolean>(false);
  const clearInput = () => {
    setInputValue("");
  };

  // console.log(title);
  // console.log(register(title));

  const { placeholder, handleFocus, handleBlur } = usePlaceholder(children);

  // console.log(title);

  return (
    <AuthInputWrap>
      <AuthInputStyle
        {...register(title)}
        value={inputValue}
        placeholder={placeholder}
        onFocus={() => handleFocus()}
        onBlur={() => handleBlur()}
        // onChange={e => {
        //   const formattedValue =
        //     title === "userPhone" ? PhoneNumber(e) : e.target.value;
        //   setInputValue(formattedValue);
        //   register(title).onChange({ target: { value: formattedValue } });
        // }}
        onChange={e => {
          setInputValue(e.target.value), register(title).onChange(e);
        }}
        type={
          children.includes("비밀번호")
            ? visiblePass
              ? "text"
              : "password"
            : "text"
        }
        maxLength={
          (children.includes("비밀번호") && 12,
          children.includes("전화번호") && 13)
        }
      />
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
