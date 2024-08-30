import styled from "@emotion/styled";
import Logo from "components/common/Logo";
import HomeBtn from "components/home/HomeBtn";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const HeaderStyle = styled.div`
  padding: 10px;
  z-index: 99999;
  position: absolute;
  width: 100%;
  height: 100%;
  max-height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  @media (max-width: 540px) {
    height: 14.8vw;
    font-size: 15px;
  }
`;

const HeaderMenuWrap = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 5%;
  svg {
    max-width: 100px;
    & path {
      color: #fff;
    }
  }
`;

const HbrMenuStyle = styled.div`
  width: 80px;
  height: 80px;
  cursor: pointer;
  @media (max-width: 540px) {
    width: 90px;
    height: 40px;
  }
`;

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 540) {
        setIsVisible(false);
      }
      if (window.innerWidth > 540) {
        setIsVisible(true);
      }
    };
    window.addEventListener("resize", handleResize);
  }, []);
  return (
    <HeaderStyle>
      <Logo />
      <HeaderMenuWrap>
        {isVisible ? <HomeBtn>로그인</HomeBtn> : null}
        <HbrMenuStyle>
          <RxHamburgerMenu style={{ height: "100%", width: "100%" }} />
        </HbrMenuStyle>
      </HeaderMenuWrap>
    </HeaderStyle>
  );
};

export default Header;
