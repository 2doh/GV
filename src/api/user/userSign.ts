import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore"; // Firestore를 사용하는 경우
import { auth, db } from "firebaseConfig";
import { userSign, userStateInterface } from "interface/userSignInterface";
import userState from "store/userState";
import { getCookie, removeCookie, setCookie } from "util/cookie";

export const localSignup = async (data: userSign) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      data.userMail,
      data.userPass,
    );
    const user = response.user;
    await sendEmailVerification(user);
    await setDoc(doc(db, "users", response.user.uid), {
      userMail: data.userMail,
      userName: data.userName,
      userPhone: data.userPhone,
    });
    console.log(response);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      alert("알 수 없는 오류가 발생했습니다.");
      console.log(error.message);
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
    const user = response.user;
    if (user.emailVerified) {
      // 이메일 인증이 완료된 경우 로그인 성공
      // console.log("로그인 성공");
      const accessToken = await response.user.getIdToken();
      // console.log(accessToken);
      userState.getState().setAccessToken(accessToken);
      setCookie("accesstoken", accessToken);
      const db = getFirestore();
      const userDocRef = doc(db, "users", response.user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        // 유저 문서가 존재하는 경우, 유저 정보를 처리
        const userData = userDoc.data() as userStateInterface;
        userState.getState().setUserMail(userData.userMail);
        userState.getState().setUserName(userData.userName);
        setCookie("userName", userData.userName);
        setCookie("userMail", userData.userMail);
        // console.log("유저 정보:", userData);
        // console.log(userData.userName);
      } else {
        console.log("유저 정보가 존재하지 않습니다.");
        return;
      }
      // console.log(userState);
      return response;
    } else {
      // 이메일 인증이 완료되지 않은 경우 로그아웃
      await auth.signOut();
      alert("이메일 인증이 필요합니다. 메일을 확인해주세요.");
      return null;
    }
  } catch (error) {
    alert("알 수 없는 오류가 발생했습니다.");
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const localSignout = async () => {
  try {
    await signOut(auth);
    userState.getState().setUserMail("");
    userState.getState().setUserName("");
    userState.getState().setAccessToken("");
    removeCookie("userName");
    removeCookie("userid");
    removeCookie("accesstoken");
  } catch (error) {
    console.error("로그아웃 오류:", error);
    alert("로그아웃 중 오류가 발생했습니다.");
  }
};
