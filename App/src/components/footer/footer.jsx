import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';  // Importar directamente en JSX
import './footer.css';

const Footer = () => {
    return (
        <footer className="bg-dark text-center text-white">
            <div className="container p-4">
                <section className="mb-4">
                    <p>
                    Cortelazer | Especialistas en Corte Láser de Precisión
                    </p>
                </section>

                {/* Información de contacto */}
                <div className="row text-center text-md-start">
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Contacto</h5>
                        <p>
                            <i className="fas fa-map-marker-alt me-2"></i> <strong>Dirección:</strong> Cra. 11b #40-131 <br />
                            <i className="fas fa-phone me-2"></i> <strong>Teléfono:</strong> 3154090383<br />
                            <i className="fas fa-envelope me-2"></i> <strong>Correo Electrónico:</strong> cortelazerpereira@gmail.com
                        </p>
                    </div>

                    {/* Redes sociales */}
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Síguenos</h5>
                        <p>
                            <a href="https://www.facebook.com/cortelazerpereira/" className="text-white me-4">
                                <i className="fab fa-facebook"></i> Facebook
                            </a>
                            <a href="[Enlace de Twitter]" className="text-white me-4">
                                <i className="fab fa-twitter"></i> Twitter
                            </a>
                            <a href="[Enlace de Instagram]" className="text-white me-4">
                                <i className="fab fa-instagram"></i> Instagram
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Derechos de autor */}
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © {new Date().getFullYear()} Cortelazer. Todos los derechos reservados.
            </div>
        </footer>
    );
}

export default Footer;
