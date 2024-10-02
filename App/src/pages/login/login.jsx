import React, { useState } from 'react';
import './login.css';
import ParticleComponent from '../../components/particles/particles';

const LoginPage = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí puedes implementar la lógica de autenticación
    // Por ahora, simplemente estableceremos un usuario ficticio
    setUser({ username, role: 'Usuario' });
  };

  return (
    <div className="login-container">
    <label className="login-label">Usuario:</label>
    <input className="login-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
    <br />
    <label className="login-label">Contraseña:</label>
    <input className="login-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    <br />
    <button className="login-button" type="button" onClick={handleLogin}>
        Iniciar Sesión
    </button>
    <ParticleComponent  />
    </div>
  );
};

export default LoginPage;
