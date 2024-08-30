import styled from "@emotion/styled";
import { useNavigate } from "react-router";

const LogoStyle = styled.div`
  width: 127px;
  height: 60px;
  border: 3px solid #fff;
  color: #fff;
  font-weight: 500;
  font-size: 47px;
  text-align: center;
  padding: 0 auto 0;
  cursor: pointer;
  @media (max-width: 540px) {
    width: 90px;
    height: 40px;
    font-size: 28px;
  }
`;

const Logo = () => {
  const navi = useNavigate();
  return <LogoStyle onClick={() => navi("/")}>GV</LogoStyle>;
};

export default Logo;
