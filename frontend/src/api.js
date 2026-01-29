import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor de Requisição: Adiciona o token em todas as chamadas
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('pi_token'); // Usando a chave 'pi_token'
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Resposta: Trata erros 401 (Não autorizado)
api.interceptors.response.use(
  (response) => {
    // Se a resposta for sucesso, apenas a retorna
    return response;
  },
  (error) => {
    // Verifica se o erro é 401 (Token inválido/expirado)
    if (error.response && error.response.status === 401) {
      console.error("Erro 401: Não autorizado. Redirecionando para o login.");
      // Limpa o token do storage
      localStorage.removeItem('pi_token');
      // Redireciona o usuário para a página de login
      // Usamos window.location para forçar o recarregamento, limpando qualquer estado
      window.location.href = '/'; 
    }
    // Para outros erros, apenas rejeita a promise
    return Promise.reject(error);
  }
);

export default api;

