import React from 'react';
import './services.css';
import MaterialList from '../../components/standardMaterials/materials';
import ServicesHome from '../../assets/services-home.webp';
import { FaInfoCircle } from 'react-icons/fa'; // Importa el icono de información de React Icons
import ParticleComponent from '../../components/particles/particles';

const Services = () => {
    return (
        <section className="services-section">
                    <h3 className='description-title text-center animate__animated animate__fadeIn'> Nuestros servicios </h3>

            <div className='services-container animate__animated animate__fadeIn'>
                <div className='service-left'>
                {/* Left big image */}
                <img src={ ServicesHome } alt='Big Service Image' className='big-service-image' />
                </div>
                <div className='service-right'>
                {/* Right 2x2 divs */}
                <div className='service-item'>Service 1</div>
                <div className='service-item'>Service 2</div>
                <div className='service-item'>Service 3</div>
                <div className='service-item'>Service 4</div>
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
            < MaterialList /> <br />
            <div className='alert-container'>
                <div className='alert yellow'>
                <FaInfoCircle className='info-icon' /> {/* Agrega el icono */}
                <p> 
                CorteLazer garantiza una tolerancia de corte de +/-0.5 mm en toda la pieza.
                Los tamaños de los agujeros, las dimensiones exteriores, de agujero a agujero, ¡todo! La mayoría de las piezas se fabrican con tolerancias mucho más estrictas, alrededor de +/-0,2 mm.
                </p>
                </div>
            </div>
            <br /> <br />
            < ParticleComponent />
        </section>
    );
}

export default Services;
