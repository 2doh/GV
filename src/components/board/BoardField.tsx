import styled from "@emotion/styled";
import {
  Firestore,
  collection,
  doc,
  setDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import boardColorState from "store/boardColorState";
import boardState from "store/boardState";
import { floodFill } from "util/floodFill";
import { db } from "firebaseConfig"; // Firebase config import

const FieldStyle = styled.canvas`
  background-color: wheat;
`;

const BoardField = ({ canvasState, updateCanvasState }: any): JSX.Element => {
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
  const [drawingPath, setDrawingPath] = useState<{ x: number; y: number }[]>(
    [],
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    if (cursorState) {
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
    if (cursorState === "circle") {
      setRectStartX(offsetX);
      setRectStartY(offsetY);
    }
    setDrawingPath([{ x: offsetX, y: offsetY }]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || ctx === null) {
      return;
    }
    const { offsetX, offsetY } = e.nativeEvent;
    console.log(e.nativeEvent);
    if (cursorState === "pen") {
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
      setDrawingPath(prevPath => [...prevPath, { x: offsetX, y: offsetY }]);
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
      ctx.rect(rectStartX, rectStartY, width, height);
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
      ctx.arc(
        rectStartX + width / 2,
        rectStartY + height / 2,
        Math.sqrt(width ** 2 + height ** 2) / 2,
        0,
        2 * Math.PI,
      );
      ctx.stroke();
    }
  };

  const handleMouseUp = async () => {
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
    setIsDrawing(false);
    ctx?.beginPath();

    // Firestore에 현재 경로 저장
    const newDocRef = doc(collection(db, "canvas", "current", "paths"));
    await setDoc(newDocRef, {
      color: color,
      path: drawingPath,
    });

    setDrawingPath([]); // Reset drawing path after saving
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
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    if (cursorState === "palette") {
      setColor(colorState);
    }
  }, [colorState, cursorState]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        setCtx(context);
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Firestore에서 모든 경로를 불러와서 캔버스에 그리기
        const pathsQuery = query(collection(db, "canvas", "current", "paths"));
        const unsubscribe = onSnapshot(pathsQuery, snapshot => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          snapshot.forEach(doc => {
            const drawing = doc.data();
            context.beginPath();
            context.strokeStyle = drawing.color;
            drawing.path.forEach((point: { x: number; y: number }) => {
              context.lineTo(point.x, point.y);
              context.stroke();
            });
          });
        });

        return () => {
          unsubscribe();
        };
      }
    }
  }, [canvasState]);

  return (
    <>
      <FieldStyle
        ref={canvasRef}
        onMouseDown={e => handleMouseDown(e)}
        onMouseMove={e => handleMouseMove(e)}
        onMouseUp={() => handleMouseUp()}
      />
    </>
  );
};

export default BoardField;
