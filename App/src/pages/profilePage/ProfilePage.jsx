import React from 'react';
import './profilePage.css'; // Asegúrate de tener un archivo CSS para estilos
import defaultImage from '../../assets/perfil.png'; // Reemplaza con tu imagen por defecto

const ProfilePage = ({ name = 'Nombre por Defecto', role = 'Rol por Defecto', imageUrl = defaultImage }) => {
  return (
    <div className="profile-card">
      <div className="profile-picture">
        <img src={imageUrl} alt="Perfil" />
      </div>
      <div className="profile-name">{name}</div>
      <div className="profile-info">{role}</div>
    </div>
  );
};

export default ProfilePage;
