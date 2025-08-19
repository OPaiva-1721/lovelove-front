# 🚀 Lovelove Frontend - Guia Completo

## 📋 Pré-requisitos

- Node.js 18+
- pnpm
- Docker (opcional)
- Ngrok (instalado automaticamente)

## 🚀 Início Rápido

### **Desenvolvimento Local**
```bash
# Instalar dependências
pnpm install

# Iniciar aplicação
pnpm run start:local
```

### **Com Docker**
```bash
# Desenvolvimento
pnpm run docker:dev

# Produção
pnpm run docker:prod
```

## 🌐 Expondo com Ngrok

### **Passo a passo:**
1. **Inicie a aplicação:**
   ```bash
   pnpm run start:local
   ```

2. **Em outro terminal, use ngrok:**
   ```bash
   pnpm run ngrok:local
   ```

3. **Compartilhe a URL pública!** 🌍

### **Comandos ngrok:**
```bash
pnpm run ngrok:local    # Script batch (recomendado)
pnpm run ngrok:ps       # PowerShell (alternativa)
pnpm run ngrok:test     # Teste de conectividade
```

## 🔧 Comandos Disponíveis

### **Desenvolvimento**
```bash
pnpm run dev            # Desenvolvimento local
pnpm run start:local    # Alias para dev
pnpm run build          # Build para produção
pnpm run preview        # Preview da build
```

### **Docker**
```bash
pnpm run docker:dev     # Desenvolvimento com Docker
pnpm run docker:prod    # Produção com Docker
pnpm run docker:build   # Build dos containers
pnpm run docker:down    # Parar containers
pnpm run rebuild:dev    # Rebuild do container dev
```

### **Ngrok**
```bash
pnpm run ngrok:local    # Expor aplicação
pnpm run ngrok:ps       # Expor (PowerShell)
pnpm run ngrok:test     # Testar conectividade
```

### **Manutenção**
```bash
pnpm run cleanup        # Limpar arquivos desnecessários
pnpm run lint           # Verificar código
```

## 🌐 URLs Importantes

- **Aplicação local**: http://localhost:5173
- **Interface ngrok**: http://localhost:4040
- **URL pública**: Será mostrada no terminal

## 🔧 Solução de Problemas

### **Problemas comuns:**
- **Aplicação não carrega**: Execute `pnpm run start:local`
- **Ngrok não funciona**: Execute `pnpm run ngrok:test`
- **Host não permitido**: Execute `pnpm run rebuild:dev`

### **Para mais detalhes:**
- Veja `TROUBLESHOOTING.md` para soluções detalhadas
- Veja `README_NGROK.md` para guia específico do ngrok

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes de UI
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

### **Render/Vercel**
1. Conecte o repositório
2. Configure como "Static Site"
3. Build Command: `pnpm build`
4. Output Directory: `dist`

## 📝 Notas

- Backend configurado para: https://lovelove-back-1.onrender.com
- Todas as requisições são feitas via HTTPS
- O chat tem fallbacks para funcionar offline
- Imagens são carregadas do backend

## 🎯 Próximos Passos

1. **Teste localmente**: `pnpm run start:local`
2. **Exponha com ngrok**: `pnpm run ngrok:local`
3. **Compartilhe a URL!** 🌍
