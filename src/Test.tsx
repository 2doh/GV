import styled from "@emotion/styled";
import { Canvas, Line, Rect } from "fabric";
import { useEffect, useRef, useState } from "react";
import boardColorState from "store/boardColorState";
import boardState from "store/boardState";
import "../src/scss/board/canvas.scss";

const Test = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { cursorState } = boardState();
  const { colorState } = boardColorState();
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [color, setColor] = useState("#000000");
  const [isDrawing, setIsDrawing] = useState(false);
  const [line, setLine] = useState<Line | null>(null);
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current);
      initCanvas.backgroundColor = "#fff";
      initCanvas.renderAll();
      setCanvas(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  if (canvas && cursorState) {
    canvas.on("mouse:down", e => {
      setStartX(e.scenePoint.x);
      setStartY(e.scenePoint.y);
      // console.log(e);
    });
  }

  useEffect(() => {
    if (cursorState === "palette") {
      setColor(colorState);
    }
    console.log(cursorState);
    console.log(color);
  }, [colorState, cursorState]);

  console.log(startX, startY);

  useEffect(() => {
    if (cursorState === "quadrangle" && startX && startY) {
      const rect = new Rect({
        top: startY,
        left: startX,
        width: 100,
        height: 60,
        fill: "black",
        borderColor: "black",
      });
      canvas?.add(rect);
    }
  }, [cursorState]);
  return <canvas id="canvas" ref={canvasRef} className="field" />;
};

export default Test;
