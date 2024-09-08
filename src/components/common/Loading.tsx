import styled from "@emotion/styled";
import { BeatLoader, PulseLoader } from "react-spinners";

const LoadingStyle = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Loading = () => {
  return (
    <LoadingStyle>
      <h1>잠시만 기다려 주세요</h1>
      <br />
      <br />
      <PulseLoader color="#000" margin={6} />
    </LoadingStyle>
  );
};

export default Loading;
