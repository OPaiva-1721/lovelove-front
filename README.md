# Lovelove Frontend

Frontend React para a aplicação Lovelove - uma rede social para casais apaixonados.

## 🚀 Tecnologias

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React (ícones)
- Docker

## 📋 Pré-requisitos

- Docker e Docker Compose instalados
- Backend rodando em: https://lovelove-back-1.onrender.com

## 🐳 Usando Docker

### Desenvolvimento

Para rodar em modo de desenvolvimento com hot-reload:

```bash
# Build e start do container de desenvolvimento
docker-compose up frontend-dev

# Ou para rodar em background
docker-compose up -d frontend-dev
```

A aplicação estará disponível em: http://localhost:5173

### Produção

Para rodar em modo de produção:

```bash
# Build e start do container de produção
docker-compose up frontend

# Ou para rodar em background
docker-compose up -d frontend
```

A aplicação estará disponível em: http://localhost:3000

### 🌐 Expondo com Ngrok

Para expor sua aplicação publicamente usando ngrok:

```bash
# Desenvolvimento com ngrok
pnpm run ngrok:dev

# Produção com ngrok
pnpm run ngrok:prod

# Ambos os ambientes com ngrok
pnpm run ngrok:both

# Parar todos os serviços
pnpm run ngrok:stop

# Ver logs do ngrok
pnpm run ngrok:logs
```

**URLs do ngrok:**
- Interface web (produção): http://localhost:4040
- Interface web (desenvolvimento): http://localhost:4041
- URLs públicas: Acesse as interfaces web acima para ver as URLs públicas

**Configuração opcional:**
1. Crie um arquivo `.env` baseado no `env.example`
2. Adicione seu token do ngrok: `NGROK_AUTHTOKEN=seu_token_aqui`
3. Isso permitirá URLs fixas e mais recursos

**⚠️ Solução para erro de host bloqueado:**
Se você receber o erro "Solicitação bloqueada. Este host não é permitido", execute:
```bash
# Rebuild do container com as novas configurações
pnpm run rebuild:dev

# Ou manualmente
docker-compose build --no-cache frontend-dev
docker-compose up -d frontend-dev
```

### Comandos úteis

```bash
# Parar todos os containers
docker-compose down

# Rebuild dos containers
docker-compose build

# Ver logs
docker-compose logs frontend
docker-compose logs frontend-dev

# Entrar no container
docker-compose exec frontend-dev sh
```

## 🔧 Desenvolvimento Local (sem Docker)

Se preferir rodar localmente:

```bash
# Instalar dependências
pnpm install

# Rodar em desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Preview da build
pnpm preview
```

## 🌐 Configuração da API

A aplicação está configurada para usar o backend em:
- **Produção**: https://lovelove-back-1.onrender.com
- **Desenvolvimento**: Pode ser alterado via variável de ambiente `VITE_API_URL`

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=https://lovelove-back-1.onrender.com
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes de UI reutilizáveis
│   ├── HomePage.jsx    # Página inicial
│   ├── ChatPage.jsx    # Página de chat
│   ├── FeedPage.jsx    # Página do feed
│   ├── LoginPage.jsx   # Página de login
│   └── RegisterPage.jsx # Página de registro
├── config/
│   └── api.js          # Configuração da API
├── hooks/              # Custom hooks
├── lib/                # Utilitários
└── assets/             # Recursos estáticos
```

## 🚀 Deploy

### Render

1. Conecte seu repositório ao Render
2. Configure como "Static Site"
3. Build Command: `docker build -t lovelove-frontend .`
4. Publish Directory: `dist`

### Vercel

1. Conecte seu repositório ao Vercel
2. Framework Preset: Vite
3. Build Command: `pnpm build`
4. Output Directory: `dist`

## 🔍 Debug

Para debugar problemas:

1. Verifique os logs do container:
   ```bash
   docker-compose logs frontend-dev
   ```

2. Abra o console do navegador (F12) e verifique:
   - Logs de navegação
   - Erros de API
   - Status das requisições

3. Verifique se o backend está respondendo:
   ```bash
   curl https://lovelove-back-1.onrender.com/api/relationship
   ```

## 📝 Notas

- A aplicação usa React Router para navegação
- Todas as requisições para a API são feitas via HTTPS
- O chat tem fallbacks para funcionar offline
- Imagens são carregadas do backend via `/static/uploads/`

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request
