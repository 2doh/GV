import styled from "@emotion/styled";
import AuthContainer from "components/user/AuthContainer";
import AuthInput from "components/user/AuthInput";
import React from "react";

const ModalWrapStyle = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 100vw;
  z-index: 999999;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalStyle = styled.div`
  /* width: 100%;
  height: 100%; */
  padding: 30px;
  border-radius: 5px;
  background-color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: row;
`;

const Modal = (): JSX.Element => {
  return (
    <ModalWrapStyle>
      <ModalStyle></ModalStyle>
    </ModalWrapStyle>
  );
};

export default Modal;
