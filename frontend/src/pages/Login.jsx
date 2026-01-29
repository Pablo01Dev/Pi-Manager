import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Supondo que você tenha um arquivo api.js
import styles from '../styles/Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth/login', { email, password });
      
      // Salva o token no LocalStorage
      localStorage.setItem('authToken', response.data.token);
      
      // Redireciona para o dashboard
      navigate('/dashboard');

    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Credenciais inválidas. Verifique seu e-mail e senha.');
      } else {
        setError('Erro ao fazer login. Tente novamente mais tarde.');
      }
      console.error("Erro no login:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.subtitle}>Acesse sua conta para continuar</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.loginButton} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
