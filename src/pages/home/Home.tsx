import React from "react";
import styled from "@emotion/styled";
import background from "../../images/startup-3267505_1920.jpg";
import HomeBanner from "components/home/HomeBanner";

const HomeStyle = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: url(${background}) no-repeat center;
  background-size: cover;
`;

const HomeBannerWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
`;

const Home = () => {
  return (
    <HomeStyle>
      <HomeBannerWrap>
        <HomeBanner />
      </HomeBannerWrap>
    </HomeStyle>
  );
};

export default Home;
