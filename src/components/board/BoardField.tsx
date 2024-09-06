import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import boardState from "store/boardState";

const FieldStyle = styled.canvas`
  width: 100%;
  height: 100%;
`;

const BoardField = (): JSX.Element => {
  const { cursorState } = boardState();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(
    null,
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    if (cursorState) {
      // 작업 시작
      setIsDrawing(true);
      // canvas의 위치 탐지
      setStartPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (cursorState === "pen") {
      // moveTo(startPos?.x, startPos?.y);
      ctx?.stroke();
    }
  };

  const handleMouseUp = () => {
    // onMouseUp === 작업중단
    setIsDrawing(false);
    // 새로운 경로 시작
    ctx?.beginPath();
  };

  useEffect(() => {
    if (canvasRef.current) {
      // canvasRef.current가 null이 아닌 경우에만 getContext 호출
      setCtx(canvasRef.current.getContext("2d"));
    }
  }, []);

  return (
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
    ></FieldStyle>
  );
};

export default BoardField;
