import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import CommonBtn from "components/common/CommonBtn";
import Logo from "components/common/Logo";
import LogoBlack from "components/common/LogoBlack";
import { useLocation } from "react-router";
import CheckBox from "components/common/CheckBox";
import AuthErrMsg from "./AuthErrMsg";

const AuthWrap = styled.div`
  width: 100%;
  height: 100%;
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
  min-height: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  /* margin: 10px auto; */
`;

interface AuthContainerProp {
  children: React.ReactNode;
  propData: {
    title?: string;
    msg?: string;
    errorMsg: string | null;
  };
}

const AuthContainer = ({
  children,
  propData,
}: AuthContainerProp): JSX.Element => {
  const location = useLocation();
  const [rememberId, setRememberId] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  useEffect(() => {
    //   if (location.pathname === "/signin") {
    //     setRememberId(true);
    //   } else {
    //     setRememberId(false);
    //   }
    // }, [location.pathname]);
    const hiddenPaths = ["/signin", "/signup", "/findid"];
    setRememberId(hiddenPaths.includes(location.pathname));
  }, [location.pathname]);

  return (
    <AuthWrap>
      <AuthFieldWrap>
        <AuthFieldInnerStyle>{children}</AuthFieldInnerStyle>
        <AuthErrMsg errorMsg={propData.errorMsg}></AuthErrMsg>
        {rememberId && (
          <CheckBox
            title={propData.title}
            msg={propData.msg}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          ></CheckBox>
        )}
        {/* <CommonBtn>로그인</CommonBtn> */}
      </AuthFieldWrap>
    </AuthWrap>
  );
};

export default AuthContainer;
