import styled from "@emotion/styled";
import LogoBlack from "components/common/LogoBlack";
import Divider from "components/layout/Divider";
import AuthContainer from "components/user/AuthContainer";
import AuthInput from "components/user/AuthInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebaseConfig";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore"; // Firestore를 사용하는 경우
import { db } from "firebaseConfig"; // Firestore의 인스턴스 가져오기
import CommonBtn from "components/common/CommonBtn";
import AuthErrMsg from "components/user/AuthErrMsg";

const SigninWrapStyle = styled.div`
  margin: 200px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignupFormStyle = styled.form`
  width: 100%;
  max-width: 500px;
  height: 100%;
`;

const initSignupState = {
  userMail: "",
  userPass: "",
  userName: "",
  userPhone: "",
};

const signupSchema = yup.object().shape({
  // userId: yup
  //   .string()
  //   .required("아이디를 입력해주세요.")
  //   .matches(
  //     /^[a-zA-Z0-9]{6,8}$/,
  //     "아이디는 6~8자 영어와 숫자의 조합으로 입력해 주세요.",
  //   ),
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
  userName: yup
    .string()
    .required("이름을 입력해주세요.")
    .matches(/^[가-힣a-zA-Z\s]+$/, "이름은 한글 또는 영문만 입력해 주세요."),
  userPhone: yup
    .string()
    .required("휴대폰 번호를 입력해주세요.")
    .matches(/^[0-1]{3}-[0-9]{3,4}-[0-9]{4}$/, "유효한 전화번호를 입력하세요."),
});

const Signup = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const propData = {
    title: "약관 동의",
    msg: "필수 약관에 모두 동의하셨습니다.",
    errorMsg: errorMsg,
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: initSignupState,
    resolver: yupResolver(signupSchema),
    mode: "onChange",
  });

  const handleOnSubmit = async (data: {
    userMail: string;
    userPass: string;
    userName: string;
    userPhone: string;
  }) => {
    console.log("gd");
    console.log(data);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.userMail,
        data.userPass,
      );
      await setDoc(doc(db, "users", response.user.uid), {
        userName: data.userName,
        userPhone: data.userPhone,
        userMail: data.userMail,
      });
      console.log(response);
    } catch (error) {
      // Firebase 인증 에러를 `setErrorMsg`를 통해 상태에 설정
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <SigninWrapStyle>
      <LogoBlack />
      <SignupFormStyle onSubmit={handleSubmit(handleOnSubmit)}>
        <AuthContainer propData={propData}>
          {/* <SignupTitleStyle>이메일</SignupTitleStyle> */}
          <AuthInput
            error={errors.userMail?.message}
            register={register("userMail")}
          >
            이메일을 입력해 주세요
          </AuthInput>
          <Divider />
          <AuthInput
            register={register("userPass")}
            error={errors.userPass?.message}
          >
            비밀번호를 입력해 주세요
          </AuthInput>
          <Divider />
          <AuthInput
            register={register("userName")}
            error={errors.userName?.message}
          >
            이름을 입력해 주세요
          </AuthInput>
          <Divider />
          <AuthInput
            register={register("userPhone")}
            error={errors.userPhone?.message}
          >
            전화번호를 입력해 주세요
          </AuthInput>
        </AuthContainer>
        <CommonBtn>회원가입</CommonBtn>
      </SignupFormStyle>
    </SigninWrapStyle>
  );
};

export default Signup;
