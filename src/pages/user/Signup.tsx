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
import React, { useState } from "react";
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
    .required("이메일을 입력해주세요.")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "유효한 이메일 형식이 아닙니다."),
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
    .matches(/^[가-힣a-zA-Z\s]+$/, "유효한 이름이 아닙니다."),
  userPhone: yup
    .string()
    .required("휴대폰 번호를 입력해주세요.")
    .matches(/^[0-1]{3}-[0-9]{3,4}-[0-9]{4}$/, "유효한 전화번호를 입력하세요."),
});

const Signup = () => {
  const [fbErrorMsg, setFbErrorMsg] = useState<string | null>("");

  const propData = {
    title: "약관 동의",
    msg: "필수 약관에 모두 동의하셨습니다.",
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
    console.log(data);
    console.log("gd");
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.userMail,
        data.userPass,
      );
      await setDoc(doc(db, "users", response.user.uid), {
        userMail: data.userMail,
        userName: data.userName,
        userPhone: data.userPhone,
      });
      console.log(response);
    } catch (error) {
      // Firebase 인증 에러를 `setErrorMsg`를 통해 상태에 설정
      if (error instanceof Error) {
        alert(error.message);
        setFbErrorMsg("");
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const tempArr = [
    {
      title: "userMail",
      msg: "이메일을 입력해 주세요",
    },
    {
      title: "userPass",
      msg: "비밀번호는 영어,숫자 조합 8~12글자 입니다",
    },
    {
      title: "userName",
      msg: "이름을 입력해 주세요",
    },
    {
      title: "userPhone",
      msg: "전화번호를 입력해 주세요",
    },
  ];

  return (
    <SigninWrapStyle>
      <LogoBlack />
      <SignupFormStyle onSubmit={handleSubmit(handleOnSubmit)}>
        <AuthContainer propData={propData}>
          {/* <SignupTitleStyle>이메일</SignupTitleStyle> */}
          {tempArr.map((item, index) => (
            <React.Fragment key={item.title}>
              <AuthInput
                key={item.title}
                register={register}
                title={item.title}
              >
                {item.msg}
              </AuthInput>
              {index < tempArr.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </AuthContainer>
        <div>{fbErrorMsg}</div>
        {tempArr.map(item => (
          <AuthErrMsg
            errorMsg={(errors as any)[item.title]?.message}
            key={item.title}
          ></AuthErrMsg>
        ))}
        <CommonBtn>회원가입</CommonBtn>
      </SignupFormStyle>
    </SigninWrapStyle>
  );
};

export default Signup;
