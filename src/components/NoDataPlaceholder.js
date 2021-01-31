import React from 'react';
import '../App.css';

import pictureAsPdf from '../images/picture_as_pdf.svg';

// Componente que renderiza el placeholder cuando no hay ningun archivo seleccionado. (Se muestra por defecto al cargar el proyecto)
export const NoDataPlaceholder = () => (
  <div className="noDataContent">
    <img src={pictureAsPdf} alt="Pdf file" className="noDataContent__picture" />
    <h4 className="noDataContent__text">Aún no has seleccionado ningún archivo</h4>
  </div>
);