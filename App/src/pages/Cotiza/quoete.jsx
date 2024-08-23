import React, { useContext, useEffect, useState } from 'react'
import { globalContext } from '../../hooks/provider'
import { Helmet } from 'react-helmet'
import './Cotiza.css'
import { useMaterial } from '../../hooks/materialHooks'
import { v4 as uuidv4 } from 'uuid';
import { useGetImage, useGetValue, useDeleteImage } from '../../hooks/imageHooks'
import { PaymentProvider, paymentContext } from '../../hooks/paymentProvider'
import { PaymentButton } from '../../components/payment/paymentButton'

const Cotiza = () => {
  return (
    <PaymentProvider>
      <CotizaComponent />
    </PaymentProvider>
  );
}

function CotizaComponent() {
  const { getId, setFile, getValue, getMessage, setExtra, URL } = useContext(globalContext);
  const { setString } = useContext(paymentContext);
  const DELETEIMAGE = useDeleteImage({ getId });
  const { materialNames, getMaterial, getSymbol, getThickness, setMaterial } = useMaterial();

  const [ticketInfo, setTicketInfo] = useState({
    material: '',
    thickness: '',
    amount: 0,
    totalPrice: 0
  });

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
      DELETEIMAGE();
      setFile(null);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [DELETEIMAGE]);

  function changeHandle(e) {
    setMaterial(e.target.value);
  }

  function uploadHandle(e) {
    e.preventDefault();
    const thickness = document.getElementById("thickness").value;
    const amount = document.getElementById("amout").value;
    if (thickness === "None" || amount === "" || amount === 0)
      return;
    const object = {
      material: getSymbol,
      amount: amount,
      thickness: thickness
    }
    setExtra(object);
    setTicketInfo({
      material: getMaterial,
      thickness: thickness,
      amount: amount,
      totalPrice: getValue / 100  // Asumiendo que getValue es el precio en centavos
    });
  }

  return (
    <form className="cotiza-container">
      <Helmet>
        <title>Cotización</title>
        <meta property="og:title" content="Previous Elderly Mandrill" />
      </Helmet>
      <div className="cotiza-container01">
        <div className="cotiza-main">
          <div className="cotiza-imagen">
            <div className="cotiza-container02">
              {<img src={URL} alt='Imagen recibida' className='cotiza-image' />}
            </div>
          </div>
          <div className="cotiza-selectores">
            <div className="superContainer">
              <div className="selectContainer">
                <span className="cotiza-text">Material</span>
                <select onChange={changeHandle} id="material">
                  <option value="None" hidden disabled selected>Material</option>
                  {materialNames.map((item) => {
                    if (getMaterial !== item)
                      return (<option key={uuidv4()} value={item}>{item}</option>);
                    return (<option key={uuidv4()} value={item} selected>{item}</option>);
                  })}
                </select>
              </div>
              <div className="selectContainer">
                <span className="cotiza-text01">Espesor</span>
                <select id="thickness">
                  <option value="None" hidden disabled selected>Espesor</option>
                  {getThickness.map((item) => {
                    const thickness = document.getElementById("thickness").value;
                    if (thickness !== item)
                      return (<option key={uuidv4()} value={item}>{item}</option>);
                    return (<option key={uuidv4()} value={item} selected>{item}</option>);
                  })}
                </select>
              </div>
            </div>
            <div className='inputContainer'>
              <span className="cotiza-text02">Cantidad</span>
              <input type='number' placeholder='Cantidad' id="amout" />
            </div>
          </div>
        </div>
        <div className="cotiza-cart">
          <div className="cotiza-container13">
            <h1 className="cotiza-text08">Cotización</h1>
          </div>
          <div className="cotiza-container14">
            {getMessage}
            {ticketInfo.material && (
              <div className="ticket-details">
                <p>Material: {ticketInfo.material}</p>
                <p>Espesor: {ticketInfo.thickness}</p>
                <p>Cantidad: {ticketInfo.amount}</p>
              </div>
            )}
          </div>
          <div className="cotiza-container15">
            <span>Total COP: ${ticketInfo.totalPrice}</span>
            <button type="button" className="cotiza-button button" onClick={uploadHandle}>
              Cotizar
            </button>
            <PaymentButton />
          </div>
        </div>
      </div>
      <div className="cotiza-container16"></div>
    </form>
  )
}

export default Cotiza
