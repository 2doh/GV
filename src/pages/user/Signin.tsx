import styled from "@emotion/styled";
import CommonBtn from "components/common/CommonBtn";
import Logo from "components/common/Logo";
import HomeBtn from "components/home/HomeBtn";
import Divider from "components/layout/Divider";
import AuthContainer from "components/user/AuthContainer";
import AuthInput from "components/user/AuthInput";

const SigninWrapStyle = styled.div`
  width: 100%;
  max-width: 500px;
  height: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const Signin = (): JSX.Element => {
  return (
    <SigninWrapStyle>
      <AuthContainer>
        <AuthInput>이메일을 입력해 주세요</AuthInput>
        <Divider></Divider>
        <AuthInput>비밀번호를 입력해 주세요</AuthInput>
      </AuthContainer>
    </SigninWrapStyle>
  );
};

export default Signin;
