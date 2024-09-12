import { GoogleAuthProvider } from "@firebase/auth";
import { SigninGoogle } from "api/user/socialSignin";
import { sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router";
import facebook from "../../images/devicon_facebook.svg";
import google from "../../images/devicon_google.svg";
import git from "../../images/mdi_github.svg";
import "../../scss/user/socialsignin.scss";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "firebaseConfig";
import userState from "store/userState";
import { setCookie } from "util/cookie";
import { userStateInterface } from "interface/userSignInterface";

const SocialSignin = (): JSX.Element => {
  const navi = useNavigate();

  const googleSocialHandler = async () => {
    const provider = new GoogleAuthProvider();
    const response = await SigninGoogle(provider);
    // console.log(response);
    if (response?.user) {
      await setDoc(doc(db, "users", response.user.uid), {
        userMail: response.user.email,
        userName: response.user.displayName,
        userPhone: null,
      });
      const accessToken = await response.user.getIdToken();
      // console.log(accessToken);
      userState.getState().setAccessToken(accessToken);
      setCookie("accesstoken", accessToken);
      const userDocRef = doc(db, "users", response.user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        // 유저 문서가 존재하는 경우, 유저 정보를 처리
        const userData = userDoc.data() as userStateInterface;
        userState.getState().setUserMail(userData.userMail);
        userState.getState().setUserName(userData.userName);
        setCookie("userName", userData.userName);
        setCookie("userMail", userData.userMail);
      } else {
        console.log("유저 정보가 존재하지 않습니다.");
        return;
      }
    }
    if (response?.operationType === "signIn") {
      navi("/");
    }
  };

  return (
    <div className="login-wrap-panel">
      <div className="login-wrap-panel-social">
        <div className="login-panel-social-title">간편 로그인</div>
        <div className="login-panel-social-list">
          {/* <div className="login-panel-social-naver">
            <img src={naver} />
          </div>
          <div className="login-panel-social-kakao">
            <img src={kakao} />
          </div> */}
          <div
            className="login-panel-social-google"
            onClick={() => googleSocialHandler()}
          >
            <img src={google} alt="google login" />
          </div>
          <div
            className="login-panel-social-git"
            onClick={() => {
              alert("미구현입니다.");
            }}
          >
            <img src={git} alt="git login" className="giticon" />
          </div>
          <div
            className="login-panel-social-facebook"
            onClick={() => {
              alert("미구현입니다.");
            }}
          >
            <img src={facebook} alt="facebook login" className="facebookicon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialSignin;
