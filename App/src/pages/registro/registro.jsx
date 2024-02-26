import React, { useState } from 'react';
import './registro.css';

const RegisterPage = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Aquí puedes implementar la lógica de registro
    // Por ahora, simplemente estableceremos un usuario ficticio
    setUser({ username, role: 'Usuario' });
  };

  return (
    // Para RegisterPage.js
    <div className="register-container">
    <label className="register-label">Usuario:</label>
    <input className="register-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
    <br />
    <label className="register-label">Contraseña:</label>
    <input className="register-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    <br />
    <button className="register-button" type="button" onClick={handleRegister}>
        Registrarse
    </button>
    </div>
  );
};

export default RegisterPage;
