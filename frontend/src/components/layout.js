/* eslint-disable no-duplicate-case */
// src/components/Layout.js
import React, { useState } from 'react';
import ResponsiveAppBar from './appbar';
import GestionarUsuario from './gestionarUsuario';
import GestionProforma from './gestionarProforma';
import BuscarProforma from './buscarProforma';
import CrearPropiedad from './crearPropiedad';
import VerPropiedades from './verPropiedades';
import GestionarVendedores from './gestionarVendedores';
import GestionarPropiedades from './gestionarPropiedades';

function Layout() {
  const [currentComponent, setCurrentComponent] = useState(null);

  const handleMenuClick = (componentName) => {
    switch(componentName) {
      case 'Gestionar Usuarios':
        setCurrentComponent(<GestionarUsuario />);
        break;
      case 'Crear Proformas':
        setCurrentComponent(<GestionProforma />);
        break;
      case 'Gestionar Proformas':
        setCurrentComponent(<BuscarProforma />);      
        break;
      case 'Crear Propiedades':
        setCurrentComponent(<CrearPropiedad />);
        break;
      case 'Ver Propiedades':
        setCurrentComponent(<VerPropiedades />);
        break;
      case 'Gestionar Vendedores':
        setCurrentComponent(<GestionarVendedores />);
        break;
      case 'Gestionar Propiedades':
        setCurrentComponent(<GestionarPropiedades />);
        break;
      default:
        setCurrentComponent(null);
    }
  };

  return (
    <>
      <ResponsiveAppBar onMenuClick={handleMenuClick} />
      {currentComponent}
    </>
  );
}

export default Layout;