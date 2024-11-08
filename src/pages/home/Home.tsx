import styled from "@emotion/styled";
import HomeBanner from "components/home/HomeBanner";
import background from "../../images/startup-3267505_1920.jpg";

const HomeStyle = styled.div`
  width: 100%;
  height: 100vh;
  background: url(${background}) no-repeat center;
  background-size: cover;
`;

const HomeBannerWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
`;

const Home = (): JSX.Element => {
  return (
    <HomeStyle>
      <HomeBannerWrap>
        <HomeBanner />
      </HomeBannerWrap>
    </HomeStyle>
  );
};

export default Home;
