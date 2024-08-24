import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { globalContext } from '../../hooks/provider';
import './mostrarImagen.css';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const { setFile } = useContext(globalContext);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setError("");
    const file = event.target.files[0];
    if (file && !file.name.endsWith(".dxf")) {
      setError("Por favor, seleccione un archivo con extensión .dxf");
      return;
    }
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Por favor, seleccione un archivo antes de continuar.');
      return;
    }
    try {
      setFile(selectedFile);
      navigate("/Cotizando");
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
      setError('Ha ocurrido un error al cargar el archivo. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className='file-uploader'>
      <h2>Carga de archivo DXF</h2>
      <div className='file-input-container'>
        <label htmlFor='file-input' className='file-input-label'>
          {selectedFile ? selectedFile.name : 'Seleccionar archivo'}
        </label>
        <input 
          id='file-input'
          type='file' 
          onChange={handleFileChange} 
          accept='.dxf'
          className='file-input'
        />
      </div>
      <button onClick={handleUpload} className='upload-button'>
        Cargar archivo
      </button>
      {error && <p className='error-message'>{error}</p>}
    </div>
  );
};

export default ImageUploader;
