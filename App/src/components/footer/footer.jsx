import "./footer.css";

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
                <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Contacto</h5>
                        <p className="align-left">
                            <strong>Dirección:</strong> Cra. 11b #40-131 <br />
                            <strong>Teléfono:</strong> 3154090383<br />
                            <strong>Correo Electrónico:</strong> cortelazerpereira@gmail.com
                        </p>
                    </div>

                    {/* Redes sociales */}
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Síguenos</h5>
                        <p>
                            <a href="https://www.facebook.com/cortelazerpereira/" className="text-white me-4">Facebook</a>
                            <a href="[Enlace de red social]" className="text-white me-4">Twitter</a>
                            <a href="[Enlace de red social]" className="text-white me-4">Instagram</a>
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
