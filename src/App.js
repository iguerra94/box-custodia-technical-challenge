import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import './App.css';
import pictureAsPdf from './images/picture_as_pdf.svg';

const App = () => {
  const [file, setFile] = useState(null);

  function onFileChange(event) { setFile(event.target.files[0]); }

  return (
    <>
      <div className="header">
        <h1 className="title">Prueba Técnica Box Custodia</h1>

        <div className="input-container">
          <button id="selectFileBtn">Seleccionar Archivo</button>
          <input id="pdfFile" type="file" onChange={onFileChange} />
        </div>
      </div>

      <div className="content">
        <Document
          file={file}
          noData={
            <div className="noDataContent">
              <img src={pictureAsPdf} className="noDataContent__picture" />
              <h4 className="noDataContent__text">Aún no has seleccionado ningún archivo</h4>
            </div>
          }
          className="Document"
          >
          <Page
            renderTextLayer={false}
            pageNumber={1}
            scale={1}
            className="pageElem"
          />
        </Document>

      </div>
    </>
  );
}

export default App;