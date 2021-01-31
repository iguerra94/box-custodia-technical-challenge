import React, { createContext, useState } from "react";

const AppStateContext = createContext(null);
const AppDispatchContext = createContext(null);

// Contexto que permite compartir el estado con las coordenadas de la selección realizada en el documento.
// El estado se comparte con los componentes que estan debajo en la jerarquia de componentes del componente `Provider`
function AppContextProvider({ children }) {

  // Estado que maneja la coordenadas los cuatro vertices de la seleccion realizada sobre el archivo PDF.
  // Se almacenan tanto las coordenadas relativas al archivo PDF, como a la pantalla.
  const [vertexCoords, setVertexCoords] = useState({
    vertexCoordsCanvasRelative: {
      topLeft: { x: -1, y: -1 },  topRight: { x: -1, y: -1 },
      bottomLeft: { x: -1, y: -1 }, bottomRight: { x: -1, y: -1 }
    },
    vertexCoordsViewportRelative: {
      topLeft: { x: -1, y: -1 }, topRight: { x: -1, y: -1 },
      bottomLeft: { x: -1, y: -1 }, bottomRight: { x: -1, y: -1 }
    }
  });

  return (
    <AppStateContext.Provider value={vertexCoords}>
      <AppDispatchContext.Provider value={setVertexCoords}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

export { AppContextProvider, AppStateContext, AppDispatchContext };