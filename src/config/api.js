// Configuração da API

// URL do backend via ngrok
const API_BASE_URL = 'https://0a22eca0af3c.ngrok-free.app';

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
