import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from "../pages/home/home"
import AppNavbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import About from '../pages/SobreNosotros/about';
import Services from '../pages/services/services';
import Cotiza from "../pages/Cotiza/quoete";
import ProfilePage from '../pages/profilePage/ProfilePage';
import LoginPage from '../pages/login/login';
import RegisterPage from '../pages/registro/registro';
import PreguntasFrecuentes from '../components/preguntasFrecuentes/preguntasFrecuentes';



//Se crean las rutas para la aplicación
const AppRoutes = () => {
    return (
        <BrowserRouter>
            < AppNavbar />
            <Routes>
                <Route exact path="/"               element={<Home/>} />
                <Route exact path="/Sobre-Nosotros" element={<About />} />
                <Route exact path="/Servicios"      element={<Services />} />
                <Route exact path="/Cotizando"      element={<Cotiza />} />
                <Route exact path="/Perfil"      element={<ProfilePage />} />
                <Route exact path="/Iniciar-sesion"      element={<LoginPage />} />
                <Route exact path="/Registrarse"      element={<RegisterPage />} />
                <Route exact path="/Preguntas-frecuentes"      element={<PreguntasFrecuentes />} />
            
            </Routes>
            < Footer />
        </BrowserRouter>
    )
}

export default AppRoutes 
