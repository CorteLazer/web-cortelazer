import React, { useState, useEffect, useContext  } from 'react';
import './mostrarImagen.css';
import { useNavigate } from 'react-router-dom';
import { globalContext } from '../../hooks/provider';


const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const {setFile} = useContext(globalContext);
  const navigate = useNavigate();
  
  const handleFileChange = (event) => {
    setError("");
    const file = event.target.files[0];
    if(!file.name.endsWith(".dxf")){
      setError("La extension de este archivo no es .dxf");
      return;
    }
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Por favor, selecciona una imagen antes de subir.');
      console.log('Por favor, selecciona una imagen antes de subir.');
      return;
    }
    try { 
      setFile(selectedFile);
      navigate("/Cotizando");
    }catch (error) {
      console.error('Error uploading image:', error);
      setError('ERROR AL SUBIR LA IMAGEN');
    }
  };

  return (
    <div className='file-uploader'>
      <input type='file' onChange={handleFileChange} />
      <button onClick={handleUpload} className='button-files'>SUBIR</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ImageUploader;
