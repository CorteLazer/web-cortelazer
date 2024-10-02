import React, { useState, useEffect } from 'react';
import './home.css';
import ImageUploader from '../../components/mostrarImagen/mostrarImagen';
import HomeLazer from '../../assets/home-lazer.png'
import ParticleComponent from '../../components/particles/particles';
import { FaInfoCircle } from 'react-icons/fa'; // Importa el icono de información de React Icons
import Carousel from '../../components/carousel/carousel';



const Home = () => {
  const [currentColor, setCurrentColor] = useState(getRandomNeonColor());
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newColor = getRandomNeonColor();
      setCurrentColor(newColor);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  function getRandomNeonColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <>
      <div style={{ padding: '20px', textAlign: 'center' }} className='main-title animate__animated animate__fadeIn'>
        <h1 style={{ color: currentColor, transition: 'color 0.8s ease-in-out' }} className='main-title'>
          Corte
        </h1>
        <h1 className='main-title'>Lazer</h1>
      </div>

      <div
        style={{
          boxShadow: `0px 0px 10px 0px ${currentColor}`,
          transition: 'box-shadow 0.8s ease-in-out',
        }}
        className='file-container animate__animated animate__fadeIn'
      >
        <p className='file-title'>Seleccione aquí una imagen que desee cotizar</p>
        < ImageUploader />
      </div>

      <div className='description-cortalazer animate__animated animate__fadeInLeft'>
        <div>
          <div className='title-container-description'>
            <div className='description-title'>¿Qué significa </div>
            <div className='big-titles'>
              <h3 className='description-title cambiar-color-palabras '> "Corte" </h3>
              <h3 className='description-title'> ? </h3>
            </div>
          </div>
          <p className='description-body'>
          En el contexto del corte por láser, el término "corte" se refiere al ancho del material eliminado o vaporizado durante el proceso. Básicamente, la ranura es el espacio que se crea cuando el rayo láser corta el material.
          <br /> <br />
          En Cortelazer, nos dedicamos a brindar soluciones de corte láser de primera categoría para satisfacer las necesidades más exigentes de nuestros clientes. Nos destacamos como líderes en la industria gracias a nuestra combinación única de tecnología avanzada, experiencia especializada y un compromiso inquebrantable con la calidad.
          </p>
        </div>
        <div>
          <img src={ HomeLazer} alt="lazer image" className='lazer-image' />
        </div>
      </div>
      <div className='alert-container'>
        <div className='alert yellow'>
          <FaInfoCircle className='info-icon' /> {/* Agrega el icono */}
          <p>
            NO necesita compensar el corte en sus archivos de corte por láser .
          </p>
        </div>
      </div>
      < Carousel /> <br /> <br />
      < ParticleComponent />
    </>
  );
};

export default Home;
