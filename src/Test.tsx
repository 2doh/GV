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
import { db } from "firebaseConfig";
import { fabric } from "fabric";

const FieldStyle = styled.canvas`
  background-color: wheat;
`;

const Test = ({ canvasState, updateCanvasState }: any): JSX.Element => {
  const { cursorState } = boardState();
  const { colorState } = boardColorState();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvas = new fabric.Canvas(canvasRef.current);
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
    if (!ctx) {
      return;
    } // Firestore에 사각형 정보 저장
    if (rectStartX !== null && rectStartY !== null) {
      const newDocRef = doc(collection(db, "canvas", "current", "shapes"));
      await setDoc(newDocRef, {
        type: "rectangle",
        color: color,
        startX: rectStartX,
        startY: rectStartY,
        width: rectFinX - rectStartX,
        height: rectFinY - rectStartY,
      });
    }

    // 원 그리기 종료
    if (
      cursorState === "circle" &&
      rectStartX !== null &&
      rectStartY !== null
    ) {
      ctx.stroke();

      // Firestore에 원 정보 저장
      const newDocRef = doc(collection(db, "canvas", "current", "shapes"));
      await setDoc(newDocRef, {
        type: "circle",
        color: color,
        centerX: rectStartX + (rectFinX - rectStartX) / 2,
        centerY: rectStartY + (rectFinY - rectStartY) / 2,
        radius:
          Math.sqrt(
            (rectFinX - rectStartX) ** 2 + (rectFinY - rectStartY) ** 2,
          ) / 2,
      });
    }

    // 색 채우기 작업 종료 시 Firestore에 저장
    if (cursorState === "fill") {
      const newDocRef = doc(collection(db, "canvas", "current", "shapes"));
      await setDoc(newDocRef, {
        type: "fill",
        color: color,
        x: rectStartX, // 시작 좌표 기록
        y: rectStartY, // 시작 좌표 기록
      });
    }

    setIsDrawing(false);
    ctx.beginPath();

    // 기존 path 저장 로직
    const newDocRef = doc(collection(db, "canvas", "current", "paths"));
    await setDoc(newDocRef, {
      color: color,
      path: drawingPath,
    });

    setDrawingPath([]); // 저장 후 경로 초기화
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

        // Firestore에서 모든 경로 및 도형을 불러와서 캔버스에 그리기
        const pathsQuery = query(collection(db, "canvas", "current", "paths"));
        const shapesQuery = query(
          collection(db, "canvas", "current", "shapes"),
        );

        // 선 경로 불러오기
        const unsubscribePaths = onSnapshot(pathsQuery, snapshot => {
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

        // 도형 불러오기
        const unsubscribeShapes = onSnapshot(shapesQuery, snapshot => {
          snapshot.forEach(doc => {
            const shape = doc.data();
            context.beginPath();
            context.strokeStyle = shape.color;

            if (shape.type === "rectangle") {
              context.rect(
                shape.startX,
                shape.startY,
                shape.width,
                shape.height,
              );
              context.stroke();
            } else if (shape.type === "circle") {
              context.arc(
                shape.centerX,
                shape.centerY,
                shape.radius,
                0,
                2 * Math.PI,
              );
              context.stroke();
            } else if (shape.type === "fill") {
              // 색 채우기 로직 (이건 추가 구현 필요)
            }
          });
        });

        return () => {
          unsubscribePaths();
          unsubscribeShapes();
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

export default Test;
