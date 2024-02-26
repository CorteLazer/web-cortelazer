import React from 'react';
import './MaterialList.css'; // Asegúrate de tener un archivo CSS para los estilos
import Aluminio from '../../assets/aluminio.png';
import StainlessSteel from '../../assets/Steel.png';
import Steel from '../../assets/Steel1.png';

const MaterialCard = ({ material, alloy, thicknesses, imageUrl, surfaceFinish }) => (
  <div className="card">
    <div className="card-body">
      <div className="left-section">
        <img
          className='materials-images'
          src={imageUrl}
          alt={material}
        />
      </div>
      <div className="right-section">
        <div className="card-title">{material}</div>
        <div className="card-text">
          <strong>Alloy:</strong> {alloy}
        </div>
        <div className="card-text">
          <strong>Thicknesses:</strong>{' '}
          {thicknesses.map((thickness, index) => (
            <span key={index} className="badge mx-1">
              {thickness}
            </span>
          ))}
        </div>
        <div className="surface-finish-text">
          <strong>Surface Finish:</strong> {surfaceFinish}
        </div>
      </div>
    </div>
  </div>
);

const MaterialList = () => (
  <div className='materials-description'>
    < div className='material-container' >
      <div className="material-list">
        <div className="row">
          <div className="col">
            <MaterialCard
              material="Aluminum 6061-T6"
              alloy="6061-T6"
              thicknesses={['0.04"', '0.063"', '0.08"', '0.09"', '0.1"', '0.125"', '0.187"', '0.25"']}
              imageUrl={Aluminio}
              surfaceFinish="Smooth"
            />
          </div>
          <div className="col">
            <MaterialCard
              material="Stainless Steel 304-2B"
              alloy="304-2B"
              thicknesses={['0.048"', '0.06"', '0.074"', '0.12"']}
              imageUrl={StainlessSteel}
              surfaceFinish="Unset"
            />
          </div>
          <div className="col">
            <MaterialCard
              material="Steel 1008"
              alloy="1008"
              thicknesses={['0.048"', '0.059"', '0.074"', '0.104"', '0.119"', '0.135"', '0.187"', '0.25"']}
              imageUrl={Steel}
              surfaceFinish="Unset"
            />
          </div>  
          <p className='materials-description-body'><strong>Acabado en la superficie <br /></strong>Cuando recibe nuestras piezas cortadas con láser, puede esperar un acabado superficial liso y limpio con mínimas rebabas y zonas afectadas por el calor (HAZ). Nuestra avanzada tecnología de corte por láser garantiza que sus piezas se corten con precisión según sus especificaciones, lo que da como resultado un ancho de corte mínimo y bordes consistentes. Opcionalmente, aplicamos técnicas de posprocesamiento, como desbarbado y limpieza, para mejorar aún más la calidad superficial de sus piezas.</p>

        </div>
      </div>
    </ div>
  </div>
);

export default MaterialList;
