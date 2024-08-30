import styled from "@emotion/styled";

const SigninWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SigninInnerStyle = styled.div`
  width: 100%;
  max-width: 700px;
  height: 100%;
  max-height: 550px;
  background-color: red;
`;

const Signin = () => {
  return (
    <SigninWrap>
      <SigninInnerStyle></SigninInnerStyle>
    </SigninWrap>
  );
};

export default Signin;
