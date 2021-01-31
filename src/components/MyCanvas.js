import React, { useState, useRef, useEffect, useContext } from 'react';
import { AppDispatchContext } from '../context/MyContext';
import { DrawingDirection } from '../utils/canvas-utils.ts'

// Componente que renderiza el canvas donde se dibujara la seleccion sobre el documento PDF
export const MyCanvas = (props = {}) => {
  const {
    width = 612,
    height = 792,
    pixelRatio = window.devicePixelRatio,
  } = props;

  // Estado que contiene las coordenadas del primer punto seleccionado por el usuario sobre el documento
  const [firstPoint, setFirstPoint] = useState({ x: -1, y: -1 });

  // Estado que contiene las coordenadas del segundo punto seleccionado por el usuario sobre el documento
  const [secondPoint, setSecondPoint] = useState({ x: -1, y: -1 });

  // Estado que indica si el usuario esta haciendo una seleccion sobre el documento actualmente
  const [isDrawing, setIsDrawing] = useState(false);

  // Estado que indica la direccion hacia donde el usuario esta realizando la seleccion actualmente
  const [drawingDirection, setDrawingDirection] = useState("");

  // Estado que contiene una referencia al elemento del DOM del canvas donde se realizara la seleccion
  const canvasRef = useRef(null);

  // Estado que contiene una referencia al contexto del canvas donde se realizara la seleccion
  const contextRef = useRef(null);

  // Constante que permite acceder a la funcion del contexto compartido que actualiza las coordenadas de la seleccion
  const setVertexCoords = useContext(AppDispatchContext);

  // Efecto donde se setea el contexto del canvas donde se dibujara la seleccion
  // Se ejecuta cada vez que el pixelRatio cambia
  useEffect(() => {
    const context = canvasRef.current.getContext("2d");

    context.scale(pixelRatio, pixelRatio);

    contextRef.current = context;
  }, [pixelRatio]);

  // Funcion que resetea los estados de los puntos y de las coordenadas de la seleccion
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

  // Funcion que detecta la direccion hacia donde se esta dirigiendo el usuario con la seleccion
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

  // Funcion que setea las coordenadas de los vertices de la seleccion basado en la direccion hacia donde se esta moviendo el usuario
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

  // Funcion que dibuja un rectangulo en el canvas con las coordenadas de la seleccion
  const drawRect = ({
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

  // Funcion que dibuja un circulo en el canvas con las coordenadas (x, y) pasadas como parametro
  const drawCircle = ({ x, y, alpha = 1, fillStyle = "red" }) => {
    contextRef.current.beginPath();

    contextRef.current.globalAlpha = alpha;

    contextRef.current.arc(x, y, 4, 0, Math.PI * 2);
    contextRef.current.fillStyle = fillStyle;
    contextRef.current.fill();

    contextRef.current.closePath();
  };

  // Funcion que limpia el canvas por completo
  const clearCanvas = () => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  // Funcion que dibuja la seleccion completa.
  //   Primero limpia el canvas
  //   Segundo dibuja el rectangulo con opacidad que contiene la seleccion
  //   Por ultimo dibuja dos circulos en las esquinas donde se encuentran el primer y segundo punto de la seleccion
  const draw = () => {
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

    drawRect({
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

  // Funcion que dibuja el primer punto seleccionado en el canvas (Se dibuja al ejecutarse el evento mouseDown en el canvas)
  const drawFirstPoint = (e) => {
    clearCanvas();
    resetPoints();

    setIsDrawing(true);
    const rect = e.target.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setFirstPoint({ x, y });
    setSecondPoint({ x, y });

    draw();

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

  // Funcion que se ejecuta en el evento mouseMove del canvas.
  //   Actualiza el valor del segundo punto en el canvas.
  //   Actualiza las coordenadas de los vertices de la seleccion.
  //   Dibuja la seleccion completa.
  const drawSelection = (e) => {
    if (isDrawing) {
      const rect = e.target.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setSecondPoint({ x, y });

      detectDrawingDirection();
      setVertexCoordsBasedOnDirection(e);

      draw();
    }
  };

  // Funcion que dibuja el segundo punto seleccionado en el canvas (Se dibuja al ejecutarse el evento mouseUp en el canvas)
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

      draw();
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
        onMouseMove={drawSelection}
        onMouseUp={drawSecondPoint}
        onMouseLeave={drawSecondPoint}
      />
    </div>
  );
};