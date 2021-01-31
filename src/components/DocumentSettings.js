import React from 'react';

import '../App.css';

// Componente que renderiza las opciones de configuración del documento PDF (Ver numero de pagina actual, cambiar el numero de pagina)
export const DocumentSettings = (props = {}) => {
  const {
    pageNumber,
    setPageNumber,
    numPages
  } = props;

  return (
    <div className="content__options-document-pages">
      <span>Número de pagina</span>
      <div className="content__options-document-pages-buttons">
        <button className="btn btn-info ml-0" onClick={() => {
          if (pageNumber > 1) setPageNumber(pageNumber-1)
        }}>{"<"}</button>
        <span>{pageNumber} / {numPages}</span>
        <button className="btn btn-info" onClick={() => {
          if (pageNumber < numPages) setPageNumber(pageNumber+1)
        }}>{">"}</button>
      </div>
    </div>
  );
};