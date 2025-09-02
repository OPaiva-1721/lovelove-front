// Configuração da API

// URL do backend - usa variável de ambiente ou fallback para local
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
  getUploadUrl
};
