import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

import { MyCanvas } from './components/MyCanvas';
import { LoadingFileSpinner } from './components/LoadingFileSpinner';
import { CanvasSelectionData } from './components/CanvasSelectionData';
import { NoDataPlaceholder } from './components/NoDataPlaceholder';
import { DocumentSettings } from './components/DocumentSettings';

import { AppContextProvider, AppStateContext } from "./context/MyContext";

import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [isLoadingFile, setLoadingFile] = useState(false);
  const [numPages, setNumPages] = useState(null);
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
                  <p style={{fontSize: '1.2rem', fontWeight: '600', }}>Opciones de configuración</p>
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