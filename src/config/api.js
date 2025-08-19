// Configuração da API
// Permite alternar rapidamente entre diferentes URLs

// URLs disponíveis
const API_URLS = {
  localhost: 'http://localhost:5000',  // Backend local (Flask)
  render: 'https://lovelove-back-1.onrender.com',  // Backend no Render
  // Adicione mais URLs conforme necessário
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

// Função para alternar rapidamente a URL
export const switchApiUrl = (urlKey) => {
  if (API_URLS[urlKey]) {
    localStorage.setItem('forcedApiUrl', API_URLS[urlKey]);
    console.log(`🌐 API URL alterada para: ${API_URLS[urlKey]}`);
    // Recarrega a página para aplicar a mudança
    window.location.reload();
  } else {
    console.error(`❌ URL não encontrada: ${urlKey}. URLs disponíveis:`, Object.keys(API_URLS));
  }
};

// Função para resetar para a URL padrão
export const resetApiUrl = () => {
  localStorage.removeItem('forcedApiUrl');
  console.log('🔄 API URL resetada para padrão');
  window.location.reload();
};

// Função para mostrar a URL atual
export const getCurrentApiUrlInfo = () => {
  const currentUrl = getCurrentApiUrl();
  const isForced = localStorage.getItem('forcedApiUrl');
  return {
    url: currentUrl,
    isForced: !!isForced,
    availableUrls: Object.keys(API_URLS)
  };
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
  switchApiUrl,
  resetApiUrl,
  getCurrentApiUrlInfo,
  API_URLS
};
