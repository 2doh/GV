import React from "react";
import kakao from "../../images/ri_kakao-talk-fill.svg";
import naver from "../../images/simple-icons_naver.svg";
import google from "../../images/devicon_google.svg";
import "../../scss/user/socialsignin.scss";
const SocialSignin = () => {
  return (
    <div className="login-wrap-panel">
      <div className="login-wrap-panel-social">
        <div className="login-panel-social-title">간편 로그인</div>
        <div className="login-panel-social-list">
          <div className="login-panel-social-naver">
            <img src={naver} />
          </div>
          <div className="login-panel-social-kakao">
            <img src={kakao} />
          </div>
          <div className="login-panel-social-google">
            <img src={google} alt="Google login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialSignin;
