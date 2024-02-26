import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './carousel.css';

import image1 from '../../assets/carousel-images/image1.webp';
import image2 from '../../assets/carousel-images/image2.webp';
import image3 from '../../assets/carousel-images/image3.webp';

const CustomPrevArrow = (props) => (
  <button {...props} className="custom-prev-arrow">
    <FaChevronLeft />
  </button>
);

const CustomNextArrow = (props) => (
  <button {...props} className="custom-next-arrow">
    <FaChevronRight />
  </button>
);

const phrases = [
  'Acelere su proyecto. Proceso fluido, precisión incomparable, velocidad inmejorable. Convierta su diseño en realidad comenzando su viaje con nosotros hoy.',
    'Corte láser de precisión. Nuestro equipo de expertos utiliza tecnología de vanguardia para ofrecer resultados precisos y de alta calidad.',
    'Corte láser de alta velocidad. Nuestro equipo de última generación nos permite ofrecer resultados rápidos sin comprometer la calidad.',
  // Otras frases para las siguientes imágenes del carrusel
];

const Carousel = () => {
  const images = [image1, image2, image3];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index} className="carousel-item">
          <img src={image} alt={`Image ${index + 1}`} className='imagen-carrusel' />
          <p className="carousel-caption">{phrases[index]}</p>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
