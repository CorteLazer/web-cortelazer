import React, { useState } from 'react';
import './MaterialList.css'; // Asegúrate de tener un archivo CSS para los estilos
import Aluminio from '../../assets/aluminio.png';
import StainlessSteel from '../../assets/Steel.png';
import Steel from '../../assets/Steel1.png';

const MaterialCard = ({ material, alloy, thicknesses, imageUrl, surfaceFinish }) => {
  const [showAllThicknesses, setShowAllThicknesses] = useState(false);

  const visibleThicknesses = showAllThicknesses ? thicknesses : thicknesses.slice(0, 4);

  return (
    <div className="card material-card">
      <div className="card-body">
        <div className="left-section">
          <img className="materials-images" src={imageUrl} alt={material} />
        </div>
        <div className="right-section">
          <h4 className="card-title">{material}</h4>
          <div className="card-text">
            <strong>Aleación:</strong> {alloy}
          </div>
          <div className="card-text">
            <strong>Espesores disponibles:</strong>{' '}
            {visibleThicknesses.map((thickness, index) => (
              <span key={index} className="badge mx-1 thickness-badge">
                {thickness}
              </span>
            ))}
            {thicknesses.length > 4 && (
              <button
                className="btn btn-link show-more-button"
                onClick={() => setShowAllThicknesses(!showAllThicknesses)}
              >
                {showAllThicknesses ? 'Ver menos' : 'Ver más'}
              </button>
            )}
          </div>
          <div className="surface-finish-text">
            <strong>Acabado superficial:</strong> {surfaceFinish}
          </div>
        </div>
      </div>
    </div>
  );
};

const MaterialList = () => (
  <div className="materials-description">
    <div className="material-container">
      <div className="material-list">
        <div className="row">
          <div className="col">
            <MaterialCard
              material="Aluminio 6061-T6"
              alloy="6061-T6"
              thicknesses={['0.04"', '0.063"', '0.08"', '0.09"', '0.1"', '0.125"', '0.187"', '0.25"']}
              imageUrl={Aluminio}
              surfaceFinish="Liso"
            />
          </div>
          <div className="col">
            <MaterialCard
              material="Acero Inoxidable 304-2B"
              alloy="304-2B"
              thicknesses={['0.048"', '0.06"', '0.074"', '0.12"']}
              imageUrl={StainlessSteel}
              surfaceFinish="Sin definir"
            />
          </div>
          <div className="col">
            <MaterialCard
              material="Acero 1008"
              alloy="1008"
              thicknesses={['0.048"', '0.059"', '0.074"', '0.104"', '0.119"', '0.135"', '0.187"', '0.25"']}
              imageUrl={Steel}
              surfaceFinish="Sin definir"
            />
          </div>
          <p className="materials-description-body">
            <strong>Acabado Superficial de Alta Calidad</strong><br />
            En CorteLazer, garantizamos que nuestras piezas cortadas con láser presenten un acabado superficial excepcionalmente liso y limpio, con mínimas rebabas y una mínima afectación térmica (HAZ). Nuestra avanzada tecnología de corte láser asegura una precisión milimétrica en todas las dimensiones, minimizando el ancho de corte y produciendo bordes perfectamente uniformes y consistentes.<br /><br />
            Además, ofrecemos procesos de posproducción opcionales, como el desbarbado y la limpieza, que mejoran aún más la calidad del acabado superficial de sus piezas. Nos aseguramos de que cada pieza cumpla con las más altas expectativas de calidad y precisión, optimizando los resultados de su proyecto.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default MaterialList;
