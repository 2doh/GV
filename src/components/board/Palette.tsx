import styled from "@emotion/styled";
import React from "react";
import { FaPalette } from "react-icons/fa";

const PaletteStyle = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  border: none;
  border-radius: 100%;
  width: 16px;
  height: 16px;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 100%;
  }

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-moz-color-swatch {
    border: none;
    border-radius: 100%;
  }
`;

const Palette = () => {
  return (
    <>
      <PaletteStyle type="color" />
    </>
  );
};

export default Palette;
