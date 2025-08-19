# 🚀 Ngrok - Guia Rápido

## ✅ Como usar (Funcionando!)

### **Passo 1: Inicie a aplicação**
```bash
pnpm run start:local
```

### **Passo 2: Em outro terminal, use ngrok**
```bash
pnpm run ngrok:local
```

## 🌐 URLs importantes

- **Aplicação local**: http://localhost:5173
- **Interface ngrok**: http://localhost:4040
- **URL pública**: Será mostrada no terminal

## 📊 O que você verá

```
Session Status                online
Account                       (Plan: Free)
Version                       3.x.x
Region                       United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123.ngrok-free.app -> http://localhost:5173
```

## 🎯 Para compartilhar

1. Copie a URL `https://abc123.ngrok-free.app`
2. Compartilhe com qualquer pessoa
3. Eles poderão acessar sua aplicação! 🌍

## 🛑 Para parar

- Pressione `Ctrl+C` no terminal do ngrok

## 🔧 Alternativas

Se o script batch não funcionar, use:
```bash
pnpm run ngrok:ps
```

## 📝 Notas

- Certifique-se que a aplicação está rodando antes de iniciar o ngrok
- A URL muda a cada reinicialização (plano gratuito)
- A interface web mostra todas as requisições em tempo real
