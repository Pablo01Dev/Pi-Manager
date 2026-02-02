import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem('pi_token');

  // Se estiver autenticado, renderiza o conteúdo da rota (Outlet)
  // Se não, redireciona para a página de login
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;

