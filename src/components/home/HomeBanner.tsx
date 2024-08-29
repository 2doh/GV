import styled from "@emotion/styled";
import React from "react";
import HomeBtn from "./HomeBtn";

const BannerWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
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
    font-size: 15px;
  }
`;

const HomeBanner = () => {
  const handleBtClick = () => {
    if (children === "참여하기") {
      alert("dd");
    }
    if (children === "요금제 및 가격") {
      alert("준비중입니다");
    }
  };

  return (
    <BannerWrap>
      <BannerInnerStyle>
        <SpanStyle>
          당신의 아이디어를 공유하고 소통해보세요 <br />
          여러분의 무한한 가능성을 지원합니다
        </SpanStyle>
        <BannerBtnWrap>
          <HomeBtn handleBtClick={handleBtClick}>참여하기</HomeBtn>
          <HomeBtn handleBtClick={handleBtClick}>요금제 및 가격</HomeBtn>
        </BannerBtnWrap>
      </BannerInnerStyle>
    </BannerWrap>
  );
};

export default HomeBanner;
