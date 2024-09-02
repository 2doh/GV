import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import CommonBtn from "components/common/CommonBtn";
import Logo from "components/common/Logo";
import LogoBlack from "components/common/LogoBlack";
import { useLocation } from "react-router";
import CheckBox from "components/common/CheckBox";

const AuthWrap = styled.div`
  width: 100%;
  /* height: 100vw; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* background-color: red; */
`;

const AuthFieldWrap = styled.div`
  margin-top: 20px;
  width: 100%;
  /* height: 100vw; */
  /* max-height: 550px; */
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  flex-direction: column;
`;

const AuthFieldInnerStyle = styled.div`
  width: 100%;
  /* height: 100%; */
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  /* margin: 10px auto; */
`;

interface AuthContainerProp {
  children: React.ReactNode;
}

const AuthContainer = ({ children }: AuthContainerProp): JSX.Element => {
  const location = useLocation();
  const [rememberId, setRememberId] = useState(false);
  useEffect(() => {
    if (location.pathname === "/signin") {
      setRememberId(true);
    } else {
      setRememberId(false);
    }
  }, [location.pathname]);

  const loginObj = {
    title: "아이디 저장",
    msg: "개인정보 보호를 위해 개인 PC에서만 사용하세요.",
  };

  return (
    <AuthWrap>
      <LogoBlack />
      <AuthFieldWrap>
        <AuthFieldInnerStyle>{children}</AuthFieldInnerStyle>
        {rememberId && (
          <CheckBox title={loginObj.title} msg={loginObj.msg}></CheckBox>
        )}
        <CommonBtn>로그인</CommonBtn>
      </AuthFieldWrap>
    </AuthWrap>
  );
};

export default AuthContainer;
