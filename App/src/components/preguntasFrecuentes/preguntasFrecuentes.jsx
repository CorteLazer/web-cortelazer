import { Accordion, Card, Button } from 'react-bootstrap';
import './preguntasFrecuentes.css';

const PreguntasFrecuentes = () => {
  return (
    <>
        <h3 className='description-title text-center animate__animated animate__fadeIn'> Preguntas frecuentes </h3>
        <Accordion defaultActiveKey="0" className='acordeon'>
        {/* ... Otras preguntas frecuentes ... */}
        
        {/* Nueva pregunta sobre tolerancia de corte */}
        <Accordion.Item eventKey="3">
            <Accordion.Header>¿Cuál es nuestra tolerancia de corte?</Accordion.Header>
            <Accordion.Body>
            Nuestra tolerancia de corte estándar es 0,005". Puede obtener más información sobre qué esperar de sus piezas cortadas con láser en nuestra página de servicios: <a href="tu_enlace_aqui">¡Aquí!</a>
            </Accordion.Body>
        </Accordion.Item>

        {/* Nueva pregunta sobre desbarbado */}
        <Accordion.Item eventKey="4">
            <Accordion.Header>¿Ofrecen desbarbado?</Accordion.Header>
            <Accordion.Body>
            ¡Absolutamente! Nuestro proceso de desbarbado y acabado no tiene costo adicional para usted. Utilizamos una variedad de técnicas para eliminar defectos menores, raspaduras y bordes ásperos que quedan del proceso de corte. Si su pieza cumple con los requisitos de desbarbado, será seleccionada para este proceso automáticamente.
            </Accordion.Body>
        </Accordion.Item>

        {/* Nueva pregunta sobre partes incorrectas */}
        <Accordion.Item eventKey="5">
            <Accordion.Header>Mi parte no es la que esperaba, ¿qué hago?</Accordion.Header>
            <Accordion.Body>
            Nuestra principal prioridad es su satisfacción, por eso ofrecemos una garantía del 100% para un reembolso completo o el reemplazo de sus piezas. En algunos casos, podremos solicitar fotografías de su componente o una breve explicación de los aspectos con los que no quedó satisfecho, para que podamos identificar el problema y evitar que vuelva a suceder en el futuro.
            </Accordion.Body>
        </Accordion.Item>
        </Accordion>
        <h3 className='description-title text-center animate__animated animate__fadeIn'> Terminos de pago     </h3>
        <div className='terminos-pago'>
            <p>Ofrecemos varias opciones y términos de pago para pedidos grandes y personalizados y pedidos superiores a $4’500.000, que incluyen:</p>
            <ul>
                <li>Pago contraentrega</li>
                <li>Pago a 30 días</li>
                <li>Transferencia bancaria</li>
            </ul>
            <p>Comuníquese con <a href="mailto:cortelazerpereira@gmail.com">cortelazerpereira@gmail.com</a> antes de realizar un pedido si está interesado en un método o condiciones de pago alternativos.</p>
        </div>
    </>
  );
};

export default PreguntasFrecuentes;
