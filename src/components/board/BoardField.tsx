import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import boardColorState from "store/boardColorState";
import boardState from "store/boardState";
import { floodFill } from "util/floodFill";

const FieldStyle = styled.canvas`
  /* height: 100vh;
  width: 100vw; */
  background-color: wheat;
`;

const BoardField = (): JSX.Element => {
  const { cursorState } = boardState();
  const { colorState } = boardColorState();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [rectStartX, setRectStartX] = useState<number | null>(null);
  const [rectStartY, setRectStartY] = useState<number | null>(null);
  const [rectFinX, setRectFinX] = useState<number>(0);
  const [rectFinY, setRectFinY] = useState<number>(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    console.log(cursorState);
    // console.log(ctx);
    if (cursorState) {
      // 작업 시작
      setIsDrawing(true);
    }
    if (ctx === null) {
      return;
    }
    const { offsetX, offsetY } = e.nativeEvent;
    if (cursorState === "pen") {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.moveTo(offsetX, offsetY);
    }
    if (cursorState === "fill") {
      floodFill(offsetX, offsetY, color, canvasRef.current);
    }
    if (cursorState === "quadrangle") {
      setRectStartX(offsetX);
      setRectStartY(offsetY);
    }
  };
  // console.log(color);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }
    if (ctx === null) {
      return;
    }
    const { offsetX, offsetY } = e.nativeEvent;
    if (cursorState === "pen") {
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    }
    if (
      cursorState === "quadrangle" &&
      rectStartX !== null &&
      rectStartY !== null
    ) {
      setRectFinX(offsetX);
      setRectFinY(offsetY);
      ctx.strokeStyle = color;
      ctx.beginPath();
      const width = rectFinX - rectStartX;
      const height = rectFinY - rectStartY;
      // console.log(width, height);
      // ctx?.stroke();
      ctx?.rect(rectStartX, rectStartY, width, height);
    }
    if (
      cursorState === "circle" &&
      rectStartX !== null &&
      rectStartY !== null
    ) {
      setRectFinX(offsetX);
      setRectFinY(offsetY);
      ctx.strokeStyle = color;
      ctx.beginPath();
      const width = rectFinX - rectStartX;
      const height = rectFinY - rectStartY;
      // console.log(width, height);
      // ctx?.stroke();
      ctx?.rect(rectStartX, rectStartY, width, height);
    }
    // console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const handleMouseUp = () => {
    if (
      cursorState === "quadrangle" &&
      rectStartX !== null &&
      rectStartY !== null
    ) {
      ctx?.stroke();
    }
    if (
      cursorState === "circle" &&
      rectStartX !== null &&
      rectStartY !== null
    ) {
      ctx?.stroke();
    }
    // onMouseUp === 작업중단
    setIsDrawing(false);
    // 새로운 경로 시작
    ctx?.beginPath();
  };

  const resizeCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setCtx(canvas.getContext("2d"));
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때와 화면 크기가 변경될 때 캔버스 크기 조정
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    if (cursorState === "palette") {
      setColor(colorState);
    }
  }, [handleMouseDown]);

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
