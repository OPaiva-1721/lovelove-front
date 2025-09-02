// Configuração da API

// URLs disponíveis
const API_URLS = {
  localhost: 'http://localhost:5000',  // Backend local (Flask)
  render: 'https://lovelove-back-1.onrender.com',  // Backend no Render
};

// Função para obter a URL atual
const getCurrentApiUrl = () => {
  // 1. Primeiro, verifica se há uma URL forçada no localStorage
  const forcedUrl = localStorage.getItem('forcedApiUrl');
  if (forcedUrl) {
    return forcedUrl;
  }

  // 2. Verifica se há uma variável de ambiente específica
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) {
    return envUrl;
  }

  // 3. Usa a lógica padrão de desenvolvimento vs produção
  const isDevelopment = import.meta.env.DEV;
  return isDevelopment ? API_URLS.localhost : API_URLS.render;
};

const API_BASE_URL = getCurrentApiUrl();

// Função para construir URLs completas
export const buildApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

// Função para obter URL de uploads
export const getUploadUrl = (filename) => {
  return `${API_BASE_URL}/static/uploads/${filename}`;
};

export default {
  BASE_URL: API_BASE_URL,
  buildApiUrl,
  getUploadUrl,
  API_URLS
};
