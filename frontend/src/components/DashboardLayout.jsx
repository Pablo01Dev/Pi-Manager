import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; // Supondo que o Header está na mesma pasta

const DashboardLayout = () => {
  return (
    <div className="app">
      <div className="main">
        <Header />
        <div className="content">
          <Outlet /> {/* Aqui serão renderizadas as páginas aninhadas */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
