import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

// Componente que renderiza el canvas donde se dibujara la seleccion sobre el documento PDF
import { MyCanvas } from './components/MyCanvas';

// Componente que renderiza el spinner de carga antes de mostrar el archivo seleccionado en la pantalla
import { LoadingFileSpinner } from './components/LoadingFileSpinner';

// Componente que renderiza los datos de la seleccion realizada por el usuario sobre el documento
import { CanvasSelectionData } from './components/CanvasSelectionData';

// Componente que renderiza el placeholder cuando no hay ningun archivo seleccionado. (Se muestra por defecto al cargar el proyecto)
import { NoDataPlaceholder } from './components/NoDataPlaceholder';

// Componente que renderiza las opciones de configuración del documento PDF (Ver numero de pagina actual, cambiar el numero de pagina)
import { DocumentSettings } from './components/DocumentSettings';

// Contexto que permite compartir el estado con las coordenadas de la selección realizada en el documento.
// El estado se comparte con los componentes que estan debajo en la jerarquia de componentes del componente `Provider`
import { AppContextProvider, AppStateContext } from "./context/MyContext";

import './App.css';

function App() {
  // Estado con el archivo PDF seleccionado por el usuario
  const [file, setFile] = useState(null);
  
  // Estado que indica si se esta cargando el archivo seleccionado
  const [isLoadingFile, setLoadingFile] = useState(false);
  
  // Estado que maneja la cantidad de paginas que contiene el archivo PDF
  const [numPages, setNumPages] = useState(null);
  
  // Estado que maneja el numero de pagina que se esta visualizando actualmente en el documento PDF
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setPageNumber(1);
    setNumPages(numPages);
  }

  function onFileChange(event) {
    setLoadingFile(true);

    setTimeout(() => {
      setFile(event.target.files[0]);
      setLoadingFile(false);
    }, 1200);
  }

  return (
    <>
      <div className="header">
        <h1 className="title">Prueba Técnica Box Custodia</h1>

        <div className="input-container">
          <button id="selectFileBtn">Seleccionar Archivo</button>
          <input id="pdfFileInput" type="file" onChange={onFileChange} />
        </div>
      </div>

      <div className="content">
        {(isLoadingFile) ?

          <LoadingFileSpinner /> :

          <div className="content__columns">
            <AppContextProvider>
              <Document
                file={file}
                noData={<NoDataPlaceholder />}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={""}
                className="Document">
                <Page
                  renderTextLayer={false}
                  pageNumber={pageNumber}
                  loading={""}
                  className="Page">

                  <MyCanvas />

                </Page>
              </Document>
              {(numPages) &&
                <div className="content__options">
                  <p classNamestyle={{fontSize: '1.2rem', fontWeight: '600', }}>Opciones de configuración</p>
                  <DocumentSettings pageNumber={pageNumber} setPageNumber={setPageNumber} numPages={numPages} />
                  <p style={{fontSize: '1.2rem', fontWeight: '600'}}>Datos de la selección</p>
                  <AppStateContext.Consumer>
                    { vertexCoords => <CanvasSelectionData vertexCoords={vertexCoords} /> }
                  </AppStateContext.Consumer>
                </div>
              }
            </AppContextProvider>
          </div>
        }
      </div>
    </>
  );
}

export default App;