import styled from "@emotion/styled";
import {
  Firestore,
  collection,
  doc,
  setDoc,
  onSnapshot,
  query,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import boardColorState from "store/boardColorState";
import boardState from "store/boardState";
import { floodFill } from "util/floodFill";
import { db } from "firebaseConfig"; // Firebase config import
import { Canvas, Rect } from "fabric";

const FieldStyle = styled.canvas`
  background-color: wheat;
`;

const BoardField = ({ canvasState, updateCanvasState }: any): JSX.Element => {
  const { cursorState } = boardState();
  const { colorState } = boardColorState();
  // const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [drawingPath, setDrawingPath] = useState<{ x: number; y: number }[]>(
    [],
  );
  const eraserSize = 20;

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
    setDrawingPath([{ x: offsetX, y: offsetY }]);
  };

  const handleMouseMove = async (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || ctx === null) {
      return;
    }
    const { offsetX, offsetY } = e.nativeEvent;
    // console.log(e.nativeEvent);
    if (cursorState === "pen") {
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
      setDrawingPath(prevPath => [...prevPath, { x: offsetX, y: offsetY }]);
    }
    if (cursorState === "eraser") {
      ctx.clearRect(
        offsetX - eraserSize / 2,
        offsetY - eraserSize / 2,
        eraserSize,
        eraserSize,
      );
      setDrawingPath(prevPath => [...prevPath, { x: offsetX, y: offsetY }]);
    }
  };

  const handleMouseUp = async () => {
    setIsDrawing(false);
    ctx?.beginPath();

    if (cursorState === "pen") {
      // Firestore에 현재 경로 저장
      const newDocRef = doc(collection(db, "canvas", "current", "paths"));
      await setDoc(newDocRef, {
        color: color,
        path: drawingPath,
      });
    }
    if (cursorState === "eraser") {
      await deletePathFromDB(drawingPath);
    }
    setDrawingPath([]); // Reset drawing path after saving
  };

  const deletePathFromDB = async (erasedArea: { x: number; y: number }[]) => {
    const pathsQuery = query(collection(db, "canvas", "current", "paths"));
    const snapshot = await getDocs(pathsQuery);

    snapshot.forEach(docSnapshot => {
      const pathData = docSnapshot.data();
      const path = pathData.path; // Firestore에 저장된 경로

      // 지운 영역과 경로가 겹치는지 확인
      const isInErasedArea = path.some((point: { x: number; y: number }) => {
        return erasedArea.some(
          erasedPoint =>
            Math.abs(point.x - erasedPoint.x) < 20 && // 지우개 크기에 따라 범위 조절
            Math.abs(point.y - erasedPoint.y) < 20,
        );
      });

      if (isInErasedArea) {
        // 경로가 지워진 영역에 포함되면 Firestore에서 삭제
        deleteDoc(doc(db, "canvas", "current", "paths", docSnapshot.id));
      }
    });
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
