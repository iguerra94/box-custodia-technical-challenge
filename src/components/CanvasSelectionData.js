import React from 'react';

export const CanvasSelectionData = (props = {}) => {
  const { vertexCoords = {} } = props;

  return (
    <div className="content__options-document-selection-data">
      <span className="fw-500">Coordenadas relativas al canvas</span>
      <div className="content__options-document-selection-data-vertices">
        Vertice Superior Izquierdo:
        {
          (vertexCoords.vertexCoordsCanvasRelative.topLeft.x >= 0 || vertexCoords.vertexCoordsCanvasRelative.topLeft.y >= 0) ?
            ` (${vertexCoords.vertexCoordsCanvasRelative.topLeft.x}, ${vertexCoords.vertexCoordsCanvasRelative.topLeft.y})` :
            ` (-, -)`
        }
        <br /><br />
        Vertice Superior Derecho:
        {
          (vertexCoords.vertexCoordsCanvasRelative.topRight.x >= 0 || vertexCoords.vertexCoordsCanvasRelative.topRight.y >= 0) ?
            ` (${vertexCoords.vertexCoordsCanvasRelative.topRight.x}, ${vertexCoords.vertexCoordsCanvasRelative.topRight.y})` :
            ` (-, -)`
      }
        <br /><br />
        Vertice Inferior Izquierdo:
        {
          (vertexCoords.vertexCoordsCanvasRelative.bottomLeft.x >= 0 || vertexCoords.vertexCoordsCanvasRelative.bottomLeft.y >= 0) ?
            ` (${vertexCoords.vertexCoordsCanvasRelative.bottomLeft.x}, ${vertexCoords.vertexCoordsCanvasRelative.bottomLeft.y})` :
            ` (-, -)`
        }
        <br /><br />
        Vertice Inferior Derecho:
        {
          (vertexCoords.vertexCoordsCanvasRelative.bottomRight.x >= 0 || vertexCoords.vertexCoordsCanvasRelative.bottomRight.y >= 0) ?
            ` (${vertexCoords.vertexCoordsCanvasRelative.bottomRight.x}, ${vertexCoords.vertexCoordsCanvasRelative.bottomRight.y})` :
            ` (-, -)`
        }
      </div>
      <span className="fw-500">Coordenadas relativas a la pantalla</span>
      <div className="content__options-document-selection-data-vertices">
        Vertice Superior Izquierdo:
        {
          (vertexCoords.vertexCoordsViewportRelative.topLeft.x >= 0 || vertexCoords.vertexCoordsViewportRelative.topLeft.y >= 0) ?
            ` (${vertexCoords.vertexCoordsViewportRelative.topLeft.x}, ${vertexCoords.vertexCoordsViewportRelative.topLeft.y})` :
            ` (-, -)`
        }
        <br /><br />
        Vertice Superior Derecho:
        {
          (vertexCoords.vertexCoordsViewportRelative.topRight.x >= 0 || vertexCoords.vertexCoordsViewportRelative.topRight.y >= 0) ?
            ` (${vertexCoords.vertexCoordsViewportRelative.topRight.x}, ${vertexCoords.vertexCoordsViewportRelative.topRight.y})` :
            ` (-, -)`
        }
        <br /><br />
        Vertice Inferior Izquierdo:
        {
          (vertexCoords.vertexCoordsViewportRelative.bottomLeft.x >= 0 || vertexCoords.vertexCoordsViewportRelative.bottomLeft.y >= 0) ?
            ` (${vertexCoords.vertexCoordsViewportRelative.bottomLeft.x}, ${vertexCoords.vertexCoordsViewportRelative.bottomLeft.y})` :
            ` (-, -)`
        }
        <br /><br />
        Vertice Inferior Derecho:
        {
          (vertexCoords.vertexCoordsViewportRelative.bottomRight.x >= 0 || vertexCoords.vertexCoordsViewportRelative.bottomRight.y >= 0) ?
            ` (${vertexCoords.vertexCoordsViewportRelative.bottomRight.x}, ${vertexCoords.vertexCoordsViewportRelative.bottomRight.y})` :
            ` (-, -)`
        }
      </div>
    </div>
  );
};