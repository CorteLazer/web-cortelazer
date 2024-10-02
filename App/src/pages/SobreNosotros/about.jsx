import Maquina from "../../assets/maquina.webp";
import Maquina2 from "../../assets/maquina-2.webp";

import "./about.css";

function About() {
  return (
    <>
    <div className='titulo-parte-1'>
      <h1 className="titulo-parte-1">Conoce más sobre</h1>
    </div>
    <div className='titulo-parte-2-fondo'>
      <h1 className="titulo-parte-2">nosotros</h1>
      <div className="contenido-about">
        <p className="contenido-about-letra-1">En Cortelazer, llevamos la excelencia en corte láser a nuevos horizontes. Con un compromiso inquebrantable con la calidad y la precisión, nos destacamos como especialistas en el arte de transformar materiales como madera y metal en obras maestras personalizadas.
        <br /> <br />
        Nuestra misión es simple: proporcionar soluciones de corte láser que superen las expectativas. Contamos con tecnología de vanguardia y un equipo de expertos apasionados que trabajan en estrecha colaboración con cada cliente para dar vida a sus proyectos de manera única.</p>
        <img src={ Maquina } alt="Maquina-1" className="about-image-1" />
      </div>
      <div className="contenido-about">
        <img src={ Maquina2 } alt="Maquina-2" className="about-image-2" />
        <p className="contenido-about-letra-2">En Cortelazer, llevamos la excelencia en corte láser a nuevos horizontes. Con un compromiso inquebrantable con la calidad y la precisión, nos destacamos como especialistas en el arte de transformar materiales como madera y metal en obras maestras personalizadas.
        <br /> <br />
        Descubre la excelencia en el corte láser con Cortelazer. Explora nuestro sitio para conocer más sobre nuestros servicios y cómo podemos ayudarte a llevar tus proyectos al siguiente nivel.</p>
      </div>
      <div className="button-cotizar-container">
      <button className="boton-cotizar" > <a href="/" className="boton-cotizar" >Cotizar</a></button>
      </div>
      <br />
    </div>
    </>
  );
}

export default About;