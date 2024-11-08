import styled from "@emotion/styled";
import React from "react";
import HomeBtn from "./HomeBtn";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";

const BannerWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  @media (max-width: 540px) {
    height: 100vw;
  }
`;

const BannerInnerStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const BannerBtnWrap = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  gap: 5%;
`;

const SpanStyle = styled.span`
  width: 100%;
  height: 100%;
  color: white;
  font-size: 50px;
  font-weight: 500;
  text-align: center;
  line-height: 70px;
  @media (max-width: 900px) {
    font-size: 30px;
    height: 15.73vw;
  }
  @media (max-width: 540px) {
    font-size: 20px;
  }
  @media (max-width: 350px) {
    font-size: 15px;
  }
`;

const QuestionStyle = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 30px;
  right: 30px;
`;

const HomeBanner = (): JSX.Element => {
  return (
    <BannerWrap>
      <BannerInnerStyle>
        <SpanStyle>
          당신의 아이디어를 공유하고 소통해보세요 <br />
          여러분의 무한한 가능성을 지원합니다
        </SpanStyle>
        <BannerBtnWrap>
          <HomeBtn>참여하기</HomeBtn>
          <HomeBtn>요금제 및 가격</HomeBtn>
        </BannerBtnWrap>
        <QuestionStyle>
          <HiMiniQuestionMarkCircle style={{ height: "100%", width: "100%" }} />
        </QuestionStyle>
      </BannerInnerStyle>
    </BannerWrap>
  );
};

export default HomeBanner;
