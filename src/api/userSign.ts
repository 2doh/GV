import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "firebaseConfig";
import { doc, setDoc } from "firebase/firestore"; // Firestore를 사용하는 경우
import { db } from "firebaseConfig"; // Firestore의 인스턴스 가져오기
import { userSign } from "interface/userSignInterface";

export const localSignup = async (data: userSign) => {
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
    return response;
  } catch (error) {
    // Firebase 인증 에러를 `setErrorMsg`를 통해 상태에 설정
    if (error instanceof Error) {
      alert(error.message);
      //   setFbErrorMsg("");
    } else {
      alert("알 수 없는 오류가 발생했습니다.");
    }
  }
};

export const localSignin = async (data: userSign) => {
  try {
    const response = await signInWithEmailAndPassword(
      auth,
      data.userMail,
      data.userPass,
    );
    console.log(response);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
      //   setFbErrorMsg("");
    } else {
      alert("알 수 없는 오류가 발생했습니다.");
    }
  }
};
