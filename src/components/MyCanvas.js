import React, { useState, useRef, useEffect, useContext } from 'react';
import { AppDispatchContext } from '../context/MyContext';
import { DrawingDirection } from '../utils/canvas-utils.ts'

export const MyCanvas = (props = {}) => {
  const {
    width = 612,
    height = 792,
    pixelRatio = window.devicePixelRatio,
  } = props;

  const [firstPoint, setFirstPoint] = useState({ x: -1, y: -1 });
  const [secondPoint, setSecondPoint] = useState({ x: -1, y: -1 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingDirection, setDrawingDirection] = useState("");

  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const setVertexCoords = useContext(AppDispatchContext);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");

    context.scale(pixelRatio, pixelRatio);

    contextRef.current = context;
  }, [pixelRatio]);

  const resetPoints = () => {
    setFirstPoint({ x: -1, y: -1 });
    setSecondPoint({ x: -1, y: -1 });
    setVertexCoords({
      vertexCoordsCanvasRelative: {
        topLeft: { x: -1, y: -1 }, topRight: { x: -1, y: -1 },
        bottomLeft: { x: -1, y: -1 }, bottomRight: { x: -1, y: -1 }
      },
      vertexCoordsViewportRelative: {
        topLeft: { x: -1, y: -1 }, topRight: { x: -1, y: -1 },
        bottomLeft: { x: -1, y: -1 }, bottomRight: { x: -1, y: -1 }
      }
    });
  };

  const detectDrawingDirection = () => {
    if (secondPoint.x - firstPoint.x > 0) {
      if (secondPoint.y - firstPoint.y > 0) {
        setDrawingDirection(DrawingDirection.BOTTOM_RIGHT);
      } else if (secondPoint.y - firstPoint.y === 0) {
        setDrawingDirection(DrawingDirection.RIGHT);
      } else {
        setDrawingDirection(DrawingDirection.TOP_RIGHT);
      }
    } else if (secondPoint.x - firstPoint.x < 0) {
      if (secondPoint.y - firstPoint.y > 0) {
        setDrawingDirection(DrawingDirection.BOTTOM_LEFT);
      } else if (secondPoint.y - firstPoint.y === 0) {
        setDrawingDirection(DrawingDirection.LEFT);
      } else {
        setDrawingDirection(DrawingDirection.TOP_LEFT);
      }
    } else {
      if (secondPoint.y - firstPoint.y > 0) {
        setDrawingDirection(DrawingDirection.BOTTOM);
      } else {
        setDrawingDirection(DrawingDirection.TOP);
      }
    }
  };

  const setVertexCoordsBasedOnDirection = (e) => {
    switch (drawingDirection) {
      case DrawingDirection.BOTTOM_RIGHT:
        setVertexCoords({
          vertexCoordsCanvasRelative: { topLeft: { x: firstPoint.x, y: firstPoint.y }, topRight: { x: secondPoint.x, y: firstPoint.y }, bottomLeft: { x: firstPoint.x, y: secondPoint.y }, bottomRight: { x: secondPoint.x, y: secondPoint.y } },
          vertexCoordsViewportRelative: { topLeft: { x: e.pageX + firstPoint.x, y: e.pageY + firstPoint.y }, topRight: { x: e.pageX + secondPoint.x, y: e.pageY + firstPoint.y }, bottomLeft: { x: e.pageX + firstPoint.x, y: e.pageY + secondPoint.y }, bottomRight: { x: e.pageX + secondPoint.x, y: e.pageY + secondPoint.y } }
        });
        break;
      case DrawingDirection.TOP_RIGHT:
        setVertexCoords({
          vertexCoordsCanvasRelative: { topLeft: { x: firstPoint.x, y: secondPoint.y }, topRight: { x: secondPoint.x, y: secondPoint.y }, bottomLeft: { x: firstPoint.x, y: firstPoint.y }, bottomRight: { x: secondPoint.x, y: firstPoint.y } },
          vertexCoordsViewportRelative: { topLeft: { x: e.pageX + firstPoint.x, y: e.pageY + secondPoint.y }, topRight: { x: e.pageX + secondPoint.x, y: e.pageY + secondPoint.y }, bottomLeft: { x: e.pageX + firstPoint.x, y: e.pageY + firstPoint.y }, bottomRight: { x: e.pageX + secondPoint.x, y: e.pageY + firstPoint.y } }
        });
        break;
      case DrawingDirection.BOTTOM_LEFT:
        setVertexCoords({
          vertexCoordsCanvasRelative: { topLeft: { x: secondPoint.x, y: firstPoint.y }, topRight: { x: firstPoint.x, y: firstPoint.y }, bottomLeft: { x: secondPoint.x, y: secondPoint.y }, bottomRight: { x: firstPoint.x, y: secondPoint.y } },
          vertexCoordsViewportRelative: { topLeft: { x: e.pageX + secondPoint.x, y: e.pageY + firstPoint.y }, topRight: { x: e.pageX + firstPoint.x, y: e.pageY + firstPoint.y }, bottomLeft: { x: e.pageX + secondPoint.x, y: e.pageY + secondPoint.y }, bottomRight: { x: e.pageX + firstPoint.x, y: e.pageY + secondPoint.y } }
        });
        break;
      case DrawingDirection.TOP_LEFT:
        setVertexCoords({
          vertexCoordsCanvasRelative: { topLeft: { x: secondPoint.x, y: secondPoint.y }, topRight: { x: firstPoint.x, y: secondPoint.y }, bottomLeft: { x: secondPoint.x, y: firstPoint.y }, bottomRight: { x: firstPoint.x, y: firstPoint.y } },
          vertexCoordsViewportRelative: { topLeft: { x: e.pageX + secondPoint.x, y: e.pageY + secondPoint.y }, topRight: { x: e.pageX + firstPoint.x, y: e.pageY + secondPoint.y }, bottomLeft: { x: e.pageX + secondPoint.x, y: e.pageY + firstPoint.y }, bottomRight: { x: e.pageX + firstPoint.x, y: e.pageY + firstPoint.y } }
        });
        break;
      case DrawingDirection.TOP:
        setVertexCoords({
          vertexCoordsCanvasRelative: { topLeft: { x: secondPoint.x, y: secondPoint.y }, topRight: { x: secondPoint.x, y: secondPoint.y }, bottomLeft: { x: firstPoint.x, y: firstPoint.y }, bottomRight: { x: firstPoint.x, y: firstPoint.y } },
          vertexCoordsViewportRelative: { topLeft: { x: e.pageX + secondPoint.x, y: e.pageY + secondPoint.y }, topRight: { x: e.pageX + secondPoint.x, y: e.pageY + secondPoint.y }, bottomLeft: { x: e.pageX + firstPoint.x, y: e.pageY + firstPoint.y }, bottomRight: { x: e.pageX + firstPoint.x, y: e.pageY + firstPoint.y } }
        });
        break;
      case DrawingDirection.RIGHT:
        setVertexCoords({
          vertexCoordsCanvasRelative: { topLeft: { x: firstPoint.x, y: firstPoint.y }, topRight: { x: secondPoint.x, y: secondPoint.y }, bottomLeft: { x: firstPoint.x, y: firstPoint.y }, bottomRight: { x: secondPoint.x, y: secondPoint.y } },
          vertexCoordsViewportRelative: { topLeft: { x: e.pageX + firstPoint.x, y: e.pageY + firstPoint.y }, topRight: { x: e.pageX + secondPoint.x, y: e.pageY + secondPoint.y }, bottomLeft: { x: e.pageX + firstPoint.x, y: e.pageY + firstPoint.y }, bottomRight: { x: e.pageX + secondPoint.x, y: e.pageY + secondPoint.y } }
        });
        break;
      case DrawingDirection.BOTTOM:
        setVertexCoords({
          vertexCoordsCanvasRelative: { topLeft: { x: firstPoint.x, y: firstPoint.y }, topRight: { x: firstPoint.x, y: firstPoint.y }, bottomLeft: { x: secondPoint.x, y: secondPoint.y }, bottomRight: { x: secondPoint.x, y: secondPoint.y } },
          vertexCoordsViewportRelative: { topLeft: { x: e.pageX + firstPoint.x, y: e.pageY + firstPoint.y }, topRight: { x: e.pageX + firstPoint.x, y: e.pageY + firstPoint.y }, bottomLeft: { x: e.pageX + secondPoint.x, y: e.pageY + secondPoint.y }, bottomRight: { x: e.pageX + secondPoint.x, y: e.pageY + secondPoint.y } }
        });
        break;
      case DrawingDirection.LEFT:
        setVertexCoords({
          vertexCoordsCanvasRelative: { topLeft: { x: secondPoint.x, y: secondPoint.y }, topRight: { x: firstPoint.x, y: firstPoint.y }, bottomLeft: { x: secondPoint.x, y: secondPoint.y }, bottomRight: { x: firstPoint.x, y: firstPoint.y } },
          vertexCoordsViewportRelative: { topLeft: { x: e.pageX + secondPoint.x, y: e.pageY + secondPoint.y }, topRight: { x: e.pageX + firstPoint.x, y: e.pageY + firstPoint.y }, bottomLeft: { x: e.pageX + secondPoint.x, y: e.pageY + secondPoint.y }, bottomRight: { x: e.pageX + firstPoint.x, y: e.pageY + firstPoint.y } }
        });
        break;
      default:
        break;
    }
  };

  const drawSquare = ({
    width,
    height,
    offsetX,
    offsetY,
    alpha = 0.3,
    fillStyle = "#0d47a1",
    strokeStyle = "#0d47a1"
  }) => {
    contextRef.current.beginPath();

    contextRef.current.globalAlpha = alpha;

    contextRef.current.rect(
      firstPoint.x + offsetX,
      firstPoint.y + offsetY,
      width,
      height
    );
    contextRef.current.fillStyle = fillStyle;
    contextRef.current.fill();

    contextRef.current.lineWidth = 1;
    contextRef.current.strokeStyle = strokeStyle;
    contextRef.current.stroke();

    contextRef.current.closePath();
  };

  const drawCircle = ({ x, y, alpha = 1, fillStyle = "red" }) => {
    contextRef.current.beginPath();

    contextRef.current.globalAlpha = alpha;

    contextRef.current.arc(x, y, 4, 0, Math.PI * 2);
    contextRef.current.fillStyle = fillStyle;
    contextRef.current.fill();

    contextRef.current.closePath();
  };

  const clearCanvas = () => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  const draw = ({ clear = false }) => {
    if (clear) {
      clearCanvas();
    }

    const w = secondPoint.x - firstPoint.x;
    const h = secondPoint.y - firstPoint.y;

    const offsetX = w < 0 ? w : 0;
    const offsetY = h < 0 ? h : 0;
    const width = Math.abs(w);
    const height = Math.abs(h);

    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    drawSquare({
      width,
      height,
      offsetX,
      offsetY
    });

    drawCircle({
      x: firstPoint.x,
      y: firstPoint.y
    });

    drawCircle({
      x: secondPoint.x,
      y: secondPoint.y
    });
  };

  const drawFirstPoint = (e) => {
    clearCanvas();
    resetPoints();

    setIsDrawing(true);
    const rect = e.target.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setFirstPoint({ x, y });
    setSecondPoint({ x, y });

    draw({ clear: false });

    setVertexCoords({
      vertexCoordsCanvasRelative: {
        topLeft: { x, y }, topRight: { x, y },
        bottomLeft: { x, y }, bottomRight: { x, y }
      },
      vertexCoordsViewportRelative: {
        topLeft: { x: e.pageX + x, y: e.pageY + y }, topRight: { x: e.pageX + x, y: e.pageY + y },
        bottomLeft: { x: e.pageX + x, y: e.pageY + y }, bottomRight: { x: e.pageX + x, y: e.pageY + y }
      }
    });
  };

  const drawRect = (e) => {
    if (isDrawing) {
      const rect = e.target.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setSecondPoint({ x, y });

      detectDrawingDirection();
      setVertexCoordsBasedOnDirection(e);

      draw({ clear: true });
    }
  };

  const drawSecondPoint = (e) => {
    if (isDrawing) {
      setIsDrawing(false);

      if (firstPoint.x === secondPoint.x && firstPoint.y === secondPoint.y) {
        clearCanvas();
        resetPoints();
        return;
      }

      const rect = e.target.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setSecondPoint({ x, y });

      draw({ clear: false });
      contextRef.current.closePath();
    }
  };

  const dw = Math.floor(pixelRatio * width);
  const dh = Math.floor(pixelRatio * height);
  const style = { width, height, };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        border: '1px solid #333'
      }}
    >
      <canvas
        ref={canvasRef}
        width={dw}
        height={dh}
        style={style}
        onMouseDown={drawFirstPoint}
        onMouseMove={drawRect}
        onMouseUp={drawSecondPoint}
        onMouseLeave={drawSecondPoint}
      />
    </div>
  );
};