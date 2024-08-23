import React, { useContext, useEffect, useState, useRef } from 'react';
import { globalContext } from '../../hooks/provider';
import { Helmet } from 'react-helmet';
import './Cotiza.css';
import { useMaterial } from '../../hooks/materialHooks';
import { v4 as uuidv4 } from 'uuid';
import { useDeleteImage } from '../../hooks/imageHooks';
import { PaymentProvider, paymentContext } from '../../hooks/paymentProvider';
import { PaymentButton } from '../../components/payment/paymentButton';

const Cotiza = () => {
  return (
    <PaymentProvider>
      <CotizaComponent />
    </PaymentProvider>
  );
};

function CotizaComponent() {
  const { getId, setFile, getValue, getMessage, setExtra, URL } = useContext(globalContext);
  const { setString } = useContext(paymentContext);
  const DELETEIMAGE = useDeleteImage({ getId });
  const { materialNames, getMaterial, getSymbol, getThickness, setMaterial } = useMaterial();
  const thicknessRef = useRef(null);
  const amountRef = useRef(null);

  useEffect(() => {
    // Restore data from localStorage on mount
    const savedMaterial = localStorage.getItem('material');
    const savedThickness = localStorage.getItem('thickness');
    const savedAmount = localStorage.getItem('amount');
    if (savedMaterial) setMaterial(savedMaterial);
    if (savedThickness) thicknessRef.current.value = savedThickness;
    if (savedAmount) amountRef.current.value = savedAmount;

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
  }, [DELETEIMAGE, setFile, setMaterial]);

  useEffect(() => {
    // Save data to localStorage whenever they change
    localStorage.setItem('material', getMaterial);
    localStorage.setItem('thickness', thicknessRef.current?.value || '');
    localStorage.setItem('amount', amountRef.current?.value || '');
  }, [getMaterial]);

  function changeHandle(e) {
    setMaterial(e.target.value);
  }

  function uploadHandle(e) {
    e.preventDefault();
    const thickness = thicknessRef.current.value;
    const amount = parseInt(amountRef.current.value);
    if (thickness === "None" || isNaN(amount) || amount === 0) return;
    const object = {
      material: getSymbol,
      amount: amount,
      thickness: thickness
    };
    setExtra(object);
  }

  const subtotal = getValue / 100;
  const total = subtotal;

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
          <div className="cotiza-form">
            <div className="input-group">
              <div className="input-container">
                <label className="cotiza-label" htmlFor="material">Material</label>
                <select onChange={changeHandle} id="material">
                  <option value="None" hidden disabled>Selecciona un material</option>
                  {materialNames.map((item) => (
                    <option key={uuidv4()} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="input-container">
                <label className="cotiza-label" htmlFor="thickness">Espesor</label>
                <select ref={thicknessRef} id="thickness">
                  <option value="None" hidden disabled>Selecciona el espesor</option>
                  {getThickness.map((item) => (
                    <option key={uuidv4()} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className='input-container'>
                <label className="cotiza-label" htmlFor="amount">Cantidad</label>
                <input type='number' placeholder='Cantidad' ref={amountRef} id="amount" />
              </div>
            </div>
          </div>
        </div>

        <div className="cotiza-cart">
          <div className="cotiza-container13">
            <h1 className="cotiza-text08">Cotización</h1>
          </div>
          <div className="cotiza-price-breakdown">
            <h2>Detalles de la cotización</h2>
            <p>Material: {getMaterial}</p>
            <p>Espesor: {thicknessRef.current?.value}</p>
            <p>Cantidad: {amountRef.current?.value}</p>
            {getValue > 0 && (
              <>
                <p className="total">Total COP: ${total.toLocaleString('es-CO', { maximumFractionDigits: 0 })}</p>
              </>
            )}
          </div>
          <div className="cotiza-container15">
            <button type="button" className="cotiza-button button" onClick={uploadHandle}>
              Calcular cotización
            </button>
            <PaymentButton />
          </div>
        </div>
      </div>
      <div className="cotiza-container16"></div>
    </form>
  );
}

export default Cotiza;
