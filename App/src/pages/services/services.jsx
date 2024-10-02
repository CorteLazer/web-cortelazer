import React from 'react';
import './services.css';
import MaterialList from '../../components/standardMaterials/materials';
import ServicesHome from '../../assets/services-home.webp';
/* import AvellanadoImage from '../../assets/avellanado-example.webp';  // Ejemplo de imagen
import RoscadoImage from '../../assets/roscado-example.webp';  // Ejemplo de imagen
import PlegadoImage from '../../assets/plegado-example.webp';  // Ejemplo de imagen
import RemachadoImage from '../../assets/remachado-example.webp';  // Ejemplo de imagen */
import { FaInfoCircle } from 'react-icons/fa'; // Importa el icono de información de React Icons
import ParticleComponent from '../../components/particles/particles';

const Services = () => {
    return (
        <section className="services-section">
            <h3 className='description-title text-center animate__animated animate__fadeIn'> Nuestros servicios </h3>

            <div className='services-container animate__animated animate__fadeIn'>
                <div className='service-left'>
                    {/* Left big image */}
                    <img src={ServicesHome} alt='Big Service Image' className='big-service-image' />
                </div>
                <div className='service-right'>
                    {/* Right 2x2 divs with image, title, and description */}
                    <div className='service-item'>
                       {/*  <img src={AvellanadoImage} alt="Avellanado" className="service-image" /> */}
                        <h4>Avellanado</h4>
                        <p>El avellanado es una operación que permite crear una cavidad cónica en la pieza para que los tornillos o remaches se alineen a ras de la superficie.</p>
                    </div>
                    <div className='service-item'>
{/*                         <img src={RoscadoImage} alt="Roscado" className="service-image" /> */}
                        <h4>Roscado</h4>
                        <p>El roscado es un proceso en el que se crean roscas en el interior de agujeros para permitir la inserción de tornillos u otros elementos roscados.</p>
                    </div>
                    <div className='service-item'>
                       {/*  <img src={PlegadoImage} alt="Plegado" className="service-image" /> */}
                        <h4>Plegado</h4>
                        <p>El plegado es un proceso que permite doblar la chapa metálica con precisión, creando ángulos definidos según las especificaciones del proyecto.</p>
                    </div>
                    <div className='service-item'>
                        {/* <img src={RemachadoImage} alt="Remachado" className="service-image" /> */}
                        <h4>Remachado</h4>
                        <p>El remachado es un método de ensamblaje que utiliza remaches para unir de forma permanente dos o más piezas de material.</p>
                    </div>
                </div>
            </div>

            <div className="container animate__animated animate__fadeIn">
                <div className="services-container">
                    <div className="service-item">
                        <h3>Servicio de Corte Láser</h3>
                        <p>Utilizamos tecnología de vanguardia para ofrecer cortes precisos en materiales como madera y metal.</p>
                    </div>
                    <div className="service-item">
                        <h3>Personalización a Medida</h3>
                        <p>Nos especializamos en soluciones personalizadas, adaptándonos a tus necesidades específicas en cada proyecto.</p>
                    </div>
                    <div className="service-item">
                        <h3>Versatilidad de Materiales</h3>
                        <p>Trabajamos con una amplia gama de materiales, brindando opciones versátiles para tus proyectos.</p>
                    </div>
                </div>
            </div>

            <h3 className='description-title text-center'> Materiales</h3>
            <MaterialList />
            <br />

            <div className='alert-container'>
                <div className='alert yellow'>
                    <FaInfoCircle className='info-icon' /> {/* Agrega el icono */}
                    <p>
                        CorteLazer garantiza una tolerancia de corte de +/-0.5 mm en toda la pieza.
                        Los tamaños de los agujeros, las dimensiones exteriores, de agujero a agujero, ¡todo! La mayoría de las piezas se fabrican con tolerancias mucho más estrictas, alrededor de +/-0,2 mm.
                    </p>
                </div>
            </div>

            <br /><br />
            <ParticleComponent />
        </section>
    );
}

export default Services;
