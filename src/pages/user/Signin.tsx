import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { localSignin } from "api/user/userSign";
import CommonBtn from "components/common/CommonBtn";
import LogoBlack from "components/common/LogoBlack";
import Divider from "components/layout/Divider";
import AuthContainer from "components/user/AuthContainer";
import AuthInput from "components/user/AuthInput";
import FindUserInfo from "components/user/FindUserInfo";
import SocialSignin from "components/user/SocialSignin";
import { userSign } from "interface/userSignInterface";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";

const SigninWrapStyle = styled.div`
  margin: 200px auto 0;
  width: 100%;
  max-width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignupFormStyle = styled.form`
  width: 100%;
  max-width: 500px;
  height: 100%;
`;

const initSigninState = {
  userMail: "",
  userPass: "",
};

const signinSchema = yup.object().shape({
  userMail: yup
    .string()
    .email("유효한 이메일 형식이 아닙니다.")
    .required("이메일을 입력해주세요."),
  userPass: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .matches(
      /^[a-zA-Z0-9]{8,12}$/,
      "비밀번호는 8~12자 영어와 숫자의 조합으로 입력해 주세요.",
    ),
});

const Signin = (): JSX.Element => {
  const navi = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: initSigninState,
    resolver: yupResolver(signinSchema),
    mode: "onChange",
  });

  const propData = {
    title: "로그인 유지",
    msg: "개인정보 보호를 위해 개인 PC에서만 사용하세요.",
  };

  const tempArr = [
    {
      title: "userMail",
      msg: "이메일을 입력해 주세요",
    },
    {
      title: "userPass",
      msg: "비밀번호를 입력해 주세요",
    },
  ];

  const handleOnSubmit = async (data: userSign) => {
    const result = await localSignin(data);
    console.log(result);
    if (result?.operationType === "signIn") {
      // console.log("로그인");
      // alert("로그인 되었습니다.");
      // console.log("로그인완료");
      // console.log("화면이동");
      navi("/");
    }
    if (!result) {
      alert("로그인 오류 발생");
      return;
    }
  };

  return (
    <SigninWrapStyle>
      <LogoBlack />
      <SignupFormStyle onSubmit={handleSubmit(handleOnSubmit)}>
        <AuthContainer propData={propData}>
          {tempArr.map((item, index) => (
            <>
              <AuthInput
                key={item.title}
                register={register}
                title={item.title}
              >
                {item.msg}
              </AuthInput>
              {index < tempArr.length - 1 && <Divider />}
            </>
          ))}
        </AuthContainer>
        <CommonBtn>로그인</CommonBtn>
      </SignupFormStyle>
      <FindUserInfo></FindUserInfo>
      <SocialSignin></SocialSignin>
    </SigninWrapStyle>
  );
};

export default Signin;
