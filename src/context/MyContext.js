import React, { createContext, useState } from "react";

const AppStateContext = createContext(null);
const AppDispatchContext = createContext(null);

function AppContextProvider({ children }) {
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