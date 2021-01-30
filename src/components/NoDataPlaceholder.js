import React from 'react';
import '../App.css';

import pictureAsPdf from '../images/picture_as_pdf.svg';

export const NoDataPlaceholder = () => (
  <div className="noDataContent">
    <img src={pictureAsPdf} alt="Pdf file" className="noDataContent__picture" />
    <h4 className="noDataContent__text">Aún no has seleccionado ningún archivo</h4>
  </div>
);