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

### Comandos úteis

```bash
# Parar todos os containers
docker-compose down

# Rebuild dos containers
docker-compose build

# Ver logs
docker-compose logs frontend
docker-compose logs frontend-dev

# Rebuild completo (sem cache)
docker-compose build --no-cache
```

## 💻 Desenvolvimento Local (sem Docker)

```bash
# Instalar dependências
pnpm install

# Rodar em modo desenvolvimento
pnpm dev
```

## 🎨 Funcionalidades

- ✅ **HomePage**: Página inicial com contador de relacionamento
- ✅ **Feed**: Timeline de posts do casal
- ✅ **Chat**: Conversa privada entre o casal
- ✅ **Login/Registro**: Sistema de autenticação
- ✅ **Upload de Fotos**: Compartilhamento de imagens
- ✅ **Sistema de Likes**: Curtir posts
- ✅ **Comentários**: Sistema de comentários nos posts

## 🌐 API

O frontend se conecta automaticamente ao backend em:
- **Desenvolvimento**: http://localhost:5000
- **Produção**: https://lovelove-back-1.onrender.com

## 🎯 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── HomePage.jsx     # Página inicial
│   ├── FeedPage.jsx     # Feed de posts
│   ├── ChatPage.jsx     # Chat do casal
│   ├── LoginPage.jsx    # Página de login
│   └── RegisterPage.jsx # Página de registro
├── config/
│   └── api.js          # Configuração da API
├── assets/
│   └── images/         # Imagens do projeto
├── App.jsx             # Componente principal
├── main.jsx            # Entry point
├── App.css             # Estilos principais
└── index.css           # Estilos globais
```

## 🎨 Tema

O projeto usa um tema romântico personalizado com:
- Cores suaves e românticas
- Animações delicadas
- Design responsivo
- Ícones do Lucide React

## 🚀 Deploy

O projeto está configurado para deploy automático no Render.com através do Docker.
