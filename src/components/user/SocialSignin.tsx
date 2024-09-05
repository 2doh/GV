import { GoogleAuthProvider } from "@firebase/auth";
import facebook from "../../images/devicon_facebook.svg";
import google from "../../images/devicon_google.svg";
import git from "../../images/mdi_github.svg";
import "../../scss/user/socialsignin.scss";
import { SigninGoogle } from "api/user/socialSignin";
import { auth } from "firebaseConfig";
import { useNavigate } from "react-router";

const SocialSignin = (): JSX.Element => {
  const navi = useNavigate();

  const googleSocialHandler = async () => {
    const provider = new GoogleAuthProvider();
    const response = await SigninGoogle(provider);
    console.log(response);
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
          <div className="login-panel-social-git">
            <img src={git} alt="git login" className="giticon" />
          </div>
          <div className="login-panel-social-facebook">
            <img src={facebook} alt="facebook login" className="facebookicon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialSignin;
