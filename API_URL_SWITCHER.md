# 🌐 API URL Switcher - Guia Rápido

## Como Usar

### 1. Interface Visual (Recomendado)
- Um botão circular aparecerá no canto superior direito da tela
- Clique no botão **🌐** para mostrar/esconder o painel de configuração
- No painel, clique nos botões para alternar rapidamente entre as URLs:
  - **localhost**: `http://localhost:5000` (Backend local Flask)
  - **render**: `https://lovelove-back-1.onrender.com` (Backend no Render)
- Use o botão "🔄 Resetar" para voltar à URL padrão
- Use o botão **👁️** para esconder o painel novamente

### 2. Console do Navegador
Você também pode alternar via console do navegador:

```javascript
// Importar as funções
import { switchApiUrl, resetApiUrl, getCurrentApiUrlInfo } from './src/config/api';

// Alternar para localhost
switchApiUrl('localhost');

// Alternar para render
switchApiUrl('render');

// Resetar para URL padrão
resetApiUrl();

// Ver informações atuais
getCurrentApiUrlInfo();
```

### 3. Variável de Ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
```

## URLs Disponíveis

- **localhost**: `http://localhost:5000` (Backend local Flask)
- **render**: `https://lovelove-back-1.onrender.com` (Backend no Render)

## Como Adicionar Novas URLs

Edite o arquivo `src/config/api.js` e adicione novas URLs no objeto `API_URLS`:

```javascript
const API_URLS = {
  localhost: 'http://localhost:5000',  // Backend local Flask
  render: 'https://lovelove-back-1.onrender.com',  // Backend no Render
  // Adicione aqui suas novas URLs
  novaUrl: 'https://sua-nova-url.com',
};
```

## Prioridade das Configurações

1. **URL forçada** (localStorage) - maior prioridade
2. **Variável de ambiente** (`VITE_API_URL`)
3. **URL padrão** (desenvolvimento vs produção)

## Dicas

- A página será recarregada automaticamente quando você alternar a URL
- URLs forçadas ficam salvas no localStorage até você resetar
- Use o console do navegador para debug: `getCurrentApiUrlInfo()`
