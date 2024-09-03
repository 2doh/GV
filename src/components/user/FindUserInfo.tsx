import styled from "@emotion/styled";
import React from "react";
import "../../scss/user/finduserinfo.scss";
import { useNavigate } from "react-router";

const FindUserWrap = styled.div`
  margin: 20px auto 0;
  width: 290px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const FindUserInfo = () => {
  const navi = useNavigate();
  return (
    <FindUserWrap>
      <div
        className="find-user-info-navi"
        onClick={() => {
          navi("/findid");
        }}
      >
        아이디 찾기
      </div>
      <div
        className="find-user-info-navi"
        onClick={() => {
          navi("/findpass");
        }}
      >
        비밀번호 찾기
      </div>
      <div
        className="find-user-info-navi"
        onClick={() => {
          navi("/signup");
        }}
      >
        회원가입
      </div>
    </FindUserWrap>
  );
};

export default FindUserInfo;
