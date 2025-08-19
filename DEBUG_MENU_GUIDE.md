# 🔧 Guia do Menu de Debug

## 🎯 **Como Usar o Menu de Debug**

### **📍 Localização**
- **Botão**: Canto superior direito da tela
- **Ícone**: ⚙️ (quando fechado) / 🔧 (quando aberto)

### **🚀 Funcionalidades**

#### **1. 🌐 API URL Switcher**
- **O que faz**: Alterna entre URLs do backend
- **URLs disponíveis**:
  - `localhost` - Backend local (http://localhost:5000)
  - `render` - Backend no Render (https://lovelove-back-1.onrender.com)
- **Como usar**:
  1. Clique em "🌐 API URL" no menu
  2. Clique no botão da URL desejada
  3. Use "🔄 Resetar" para voltar ao padrão

#### **2. 🖥️ Backend Status**
- **O que faz**: Monitora o status do backend
- **Recursos**:
  - Verificação automática a cada 30s
  - Botão para verificar manualmente
  - Indicadores visuais (🟢 Online / 🔴 Offline / ⚠️ Erro)
- **Como usar**:
  1. Clique em "🖥️ Backend Status" no menu
  2. Veja o status atual
  3. Clique em "Verificar" para testar manualmente

#### **3. 🔐 Auth Debug**
- **O que faz**: Debug de autenticação
- **Recursos**:
  - Status de login (LOGADO / DESLOGADO)
  - User ID atual
  - Token JWT
  - Botão para testar API
  - Botão de logout
- **Como usar**:
  1. Clique em "🔐 Auth Debug" no menu
  2. Verifique se está logado
  3. Use "Testar API" para verificar conectividade
  4. Use "Logout" para sair

#### **4. 💬 Message Test**
- **O que faz**: Testa funcionalidades de mensagens
- **Recursos**:
  - Enviar mensagens de teste
  - Buscar mensagens
  - Verificar informações do usuário
  - Testar saúde do backend
  - Testar posts
- **Como usar**:
  1. Clique em "💬 Message Test" no menu
  2. Digite uma mensagem e clique "Enviar"
  3. Use "Buscar" para ver mensagens
  4. Use "Health", "Posts", "User Info" para testes específicos

#### **5. 🆔 User ID Fix**
- **O que faz**: Corrige problemas de User ID
- **Recursos**:
  - Definição manual do User ID
  - Detecção automática via API
  - Campo de entrada para User ID
- **Como usar**:
  1. Clique em "🆔 User ID Fix" no menu
  2. Digite um User ID manualmente
  3. Ou use "Detectar Automaticamente"
  4. Clique "Aplicar" para salvar

#### **6. 📱 Offline Mode**
- **O que faz**: Modo offline para desenvolvimento
- **Recursos**:
  - Salvar dados localmente
  - Contador de mensagens e posts
  - Exportar dados
  - Limpar dados locais
- **Como usar**:
  1. Clique em "📱 Offline Mode" no menu
  2. Ative/desative o modo offline
  3. Veja contadores de dados
  4. Use "Exportar" para baixar dados
  5. Use "Limpar" para apagar dados locais

## 🎮 **Controles do Menu**

### **Botão Principal**
- **Clique**: Abre/fecha o menu
- **Posição**: Canto superior direito
- **Ícones**:
  - ⚙️ = Menu fechado
  - 🔧 = Menu aberto

### **Navegação**
- **Clique em uma ferramenta**: Abre/fecha a ferramenta
- **Ferramenta ativa**: Destacada em verde
- **Múltiplas ferramentas**: Podem estar abertas simultaneamente

### **Fechar Menu**
- **Botão "❌ Fechar Menu"**: Fecha todo o menu
- **Clique no botão principal**: Alterna visibilidade

## 💡 **Dicas de Uso**

### **Para Desenvolvimento**
1. **API URL**: Use `localhost` para desenvolvimento local
2. **Backend Status**: Monitore se o backend está funcionando
3. **Auth Debug**: Verifique se está logado corretamente
4. **Message Test**: Teste funcionalidades específicas
5. **User ID Fix**: Corrija problemas de autenticação
6. **Offline Mode**: Continue desenvolvendo sem backend

### **Para Debug**
1. **Abra o console** (F12) para ver logs detalhados
2. **Use as ferramentas** para identificar problemas
3. **Teste endpoints** específicos
4. **Monitore status** do backend
5. **Verifique autenticação** se necessário

### **Para Produção**
1. **Use `render`** como URL padrão
2. **Desative modo offline** se não necessário
3. **Monitore status** do backend
4. **Teste funcionalidades** antes de usar

## 🔧 **Personalização**

### **Posição do Menu**
Para alterar a posição, edite o arquivo `src/components/DebugMenu.jsx`:

```javascript
// Posição do botão principal
position: 'fixed',
top: '10px',        // Distância do topo
right: '10px',      // Distância da direita

// Posição do menu dropdown
top: '70px',        // Distância do topo
right: '10px',      // Distância da direita
```

### **Cores e Estilo**
Para personalizar cores e estilo:

```javascript
// Cor de fundo do menu
background: 'rgba(0, 0, 0, 0.95)',

// Cor de destaque
background: '#51cf66',  // Verde para itens ativos

// Cor de erro
background: '#ff6b6b',  // Vermelho para botões de fechar
```

## 🎉 **Benefícios**

### **✅ Organizado**
- Todas as ferramentas em um só lugar
- Interface limpa e intuitiva
- Fácil navegação

### **✅ Flexível**
- Abrir/fechar ferramentas individualmente
- Múltiplas ferramentas abertas
- Menu pode ser fechado completamente

### **✅ Funcional**
- Todas as funcionalidades preservadas
- Melhor experiência de usuário
- Interface mais profissional

### **✅ Responsivo**
- Funciona em diferentes tamanhos de tela
- Botões bem dimensionados
- Texto legível

## 🚀 **Próximos Passos**

1. **Teste o menu** clicando no botão ⚙️
2. **Explore as ferramentas** disponíveis
3. **Use para debug** quando necessário
4. **Personalize** conforme sua preferência

**O menu está pronto para uso!** 🎯
