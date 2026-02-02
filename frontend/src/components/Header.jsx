import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from '../styles/Header.module.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpa o token do localStorage
    localStorage.removeItem('pi_token');
    // Redireciona para a página de login
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => isActive ? styles.activeLink : styles.link}
          end // 'end' garante que ele só fica ativo na rota exata
        >
          Imóveis
        </NavLink>
        <NavLink 
          to="/dashboard/placas" 
          className={({ isActive }) => isActive ? styles.activeLink : styles.link}
        >
          Placas
        </NavLink>
      </nav>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Sair
      </button>
    </header>
  );
};

export default Header;


