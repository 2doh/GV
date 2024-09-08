import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import boardState from "store/boardState";
import Palette from "./Palette";

const FieldStyle = styled.canvas`
  /* height: 100vh;
  width: 100vw; */
  background-color: wheat;
`;

const BoardField = (): JSX.Element => {
  const { cursorState } = boardState();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    console.log(cursorState);
    // console.log(ctx);
    if (cursorState) {
      // 작업 시작
      setIsDrawing(true);
    }
    if (cursorState === "pen") {
      ctx?.beginPath();
      ctx?.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }
    if (cursorState === "pen") {
      ctx?.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx?.stroke();
    }
    if (cursorState === "palette") {
      return <Palette></Palette>;
    }
    // console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const handleMouseUp = () => {
    // onMouseUp === 작업중단
    setIsDrawing(false);
    // 새로운 경로 시작
    ctx?.beginPath();
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      // 실제 캔버스 크기를 설정
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // canvasRef.current가 null이 아닌 경우에만 getContext 호출
      setCtx(canvasRef.current.getContext("2d"));
    }
  }, []);

  return (
    <>
      <FieldStyle
        ref={canvasRef}
        onMouseDown={e => {
          handleMouseDown(e);
        }}
        onMouseMove={e => {
          handleMouseMove(e);
        }}
        onMouseUp={() => {
          handleMouseUp();
        }}
      />
    </>
  );
};

export default BoardField;
