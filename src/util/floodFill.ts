export const floodFill = (
  x: number,
  y: number,
  fillColor: string,
  canvasRef: HTMLCanvasElement | null,
) => {
  const ctx = canvasRef?.getContext("2d");
  if (!ctx) return;

  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const data = imageData.data;
  const targetColor = getColorAtPixel(x, y, canvasRef);

  const stack = [[x, y]];

  while (stack.length > 0) {
    const [px, py] = stack.pop()!;
    const index = (py | 0) * imageData.width * 4 + (px | 0) * 4;

    if (
      data[index] === targetColor.r &&
      data[index + 1] === targetColor.g &&
      data[index + 2] === targetColor.b &&
      data[index + 3] === targetColor.a
    ) {
      data[index] = parseInt(fillColor.slice(1, 3), 16);
      data[index + 1] = parseInt(fillColor.slice(3, 5), 16);
      data[index + 2] = parseInt(fillColor.slice(5, 7), 16);
      data[index + 3] = 255;

      stack.push([px + 1, py]);
      stack.push([px - 1, py]);
      stack.push([px, py + 1]);
      stack.push([px, py - 1]);
    }
  }

  ctx.putImageData(imageData, 0, 0);
};

const getColorAtPixel = (
  x: number,
  y: number,
  canvasRef: HTMLCanvasElement | null,
) => {
  const ctx = canvasRef?.getContext("2d");
  if (!ctx) return { r: 0, g: 0, b: 0, a: 255 };

  const imageData = ctx.getImageData(x, y, 1, 1).data;
  return {
    r: imageData[0],
    g: imageData[1],
    b: imageData[2],
    a: imageData[3],
  };
};
