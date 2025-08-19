import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Heart } from 'lucide-react';
import { buildApiUrl, getUploadUrl } from '../config/api';

const ChatPage = ({ onNavigate }) => {
  const [messages, setMessages] = useState([]);  // Armazena as mensagens
  const [newMessage, setNewMessage] = useState('');  // Mensagem a ser enviada
  const [receiverId, setReceiverId] = useState(2);  // ID do destinatário, altere conforme necessário
  const [senderId, setSenderId] = useState(localStorage.getItem('user_id') || '1');  // ID do usuário logado com fallback
  const [loading, setLoading] = useState(true);  // Estado de carregamento
  const [error, setError] = useState(null);  // Estado de erro
  const [renderError, setRenderError] = useState(false);  // Estado de erro de renderização
  const messagesEndRef = useRef(null);  // Ref para rolar até o final das mensagens

  // Debug: Log quando o componente é montado
  useEffect(() => {
    try {
      console.log('ChatPage montada com sucesso');
      console.log('senderId:', senderId);
      console.log('receiverId:', receiverId);
      console.log('Token:', localStorage.getItem('token'));
    } catch (err) {
      console.error('Erro ao montar ChatPage:', err);
      setRenderError(true);
    }
  }, []);

  // Buscar mensagens do servidor quando o receiverId mudar
  useEffect(() => {
    try {
      console.log('Iniciando busca de mensagens para receiverId:', receiverId);
      if (receiverId) {
        fetchMessages(receiverId);
      }
    } catch (err) {
      console.error('Erro ao buscar mensagens:', err);
      setRenderError(true);
    }
  }, [receiverId]);

  // Função para buscar mensagens do backend
  const fetchMessages = async (receiverId) => {
    try {
      console.log('fetchMessages chamada com receiverId:', receiverId);
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      console.log('Token encontrado:', !!token);
      
      if (!token) {
        console.warn('Token não encontrado, usando dados mock');
        // Dados mock para demonstração
        const mockMessages = [
          {
            id: 1,
            content: "Oi amor! ❤️",
            sender_id: receiverId,
            timestamp: new Date().toISOString()
          },
          {
            id: 2,
            content: "Oi meu bem! Como você está?",
            sender_id: senderId,
            timestamp: new Date().toISOString()
          }
        ];
        console.log('Definindo mensagens mock:', mockMessages);
        setMessages(mockMessages);
        setLoading(false);
        return;
      }

      console.log('Fazendo requisição para API...');
      const response = await fetch(buildApiUrl(`/api/messages/${receiverId}`), {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      console.log('Resposta da API:', response.status, response.statusText);

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Dados recebidos da API:', data);
      setMessages(data);
    } catch (err) {
      console.error('Erro ao buscar mensagens:', err);
      setError('Erro ao carregar mensagens. Verifique sua conexão.');
      
      // Dados mock em caso de erro
      const fallbackMessages = [
        {
          id: 1,
          content: "Oi amor! ❤️",
          sender_id: receiverId,
          timestamp: new Date().toISOString()
        },
        {
          id: 2,
          content: "Oi meu bem! Como você está?",
          sender_id: senderId,
          timestamp: new Date().toISOString()
        }
      ];
      console.log('Definindo mensagens de fallback:', fallbackMessages);
      setMessages(fallbackMessages);
    } finally {
      console.log('Finalizando carregamento');
      setLoading(false);
    }
  };

  // Função para enviar uma nova mensagem
  const handleSendMessage = async () => {
    let tempMessage = null;
    
    try {
      if (!newMessage.trim()) return;  // Não envia mensagem vazia

      console.log('Enviando mensagem:', newMessage);
      const currentSenderId = localStorage.getItem('user_id') || senderId;
      const recipientId = receiverId;

      if (!recipientId) {
        console.error("O ID do destinatário não foi definido.");
        return;
      }

      // Verificar se está em modo offline
      const isOfflineMode = localStorage.getItem('offline_mode') === 'true';
      
      if (isOfflineMode) {
        // Modo offline - salvar localmente
        const offlineMessage = {
          id: Date.now(),
          content: newMessage,
          sender_id: currentSenderId,
          timestamp: new Date().toISOString(),
          subject: 'Mensagem offline'
        };
        
        // Salvar no localStorage
        const savedMessages = JSON.parse(localStorage.getItem('offline_messages') || '[]');
        savedMessages.push(offlineMessage);
        localStorage.setItem('offline_messages', JSON.stringify(savedMessages));
        
        // Adicionar à lista local
        setMessages(prev => [...prev, offlineMessage]);
        setNewMessage('');
        console.log('Mensagem salva em modo offline');
        return;
      }

      // Adiciona a mensagem localmente imediatamente para melhor UX
      tempMessage = {
        id: Date.now(),
        content: newMessage,
        sender_id: currentSenderId,
        timestamp: new Date().toISOString()
      };
      
      console.log('Adicionando mensagem temporária:', tempMessage);
      setMessages(prev => [...prev, tempMessage]);
      setNewMessage('');  // Limpa a mensagem após o envio

      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('Token não encontrado, mensagem salva apenas localmente');
        return;
      }

      console.log('Enviando requisição para:', buildApiUrl('/api/messages'));
      console.log('Dados enviados:', {
        content: newMessage,
        sender_id: currentSenderId,
        receiver_id: recipientId,
      });

      const response = await fetch(buildApiUrl('/api/messages'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newMessage,
          subject: 'Mensagem do chat', // Campo obrigatório
          sender_id: currentSenderId,
          receiver_id: recipientId,
        }),
      });

      console.log('Resposta da API:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro detalhado:', errorText);
        console.error('Status:', response.status);
        console.error('Headers:', response.headers);
        throw new Error(`Erro ${response.status}: ${response.statusText} - ${errorText}`);
      }

      const responseData = await response.json();
      console.log('Resposta da API (dados):', responseData);

      // Se o envio foi bem-sucedido, não precisa recarregar tudo
      // A mensagem já foi adicionada localmente
      console.log('Mensagem enviada com sucesso!');
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      // Em caso de erro, mantém a mensagem localmente mas marca como não enviada
      if (tempMessage) {
        setMessages(prev => prev.map(msg => 
          msg.id === tempMessage.id 
            ? { ...msg, failed: true, error: 'Falha no envio' }
            : msg
        ));
      }
      setNewMessage(newMessage); // Restaura a mensagem no input
      alert('Erro ao enviar mensagem. A mensagem foi salva localmente.');
    }
  };

  // Função para rolar automaticamente até o final da lista de mensagens
  const scrollToBottom = () => {
    try {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      console.error('Erro ao rolar para o final:', err);
    }
  };

  // Função para formatar o timestamp das mensagens
  const formatTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (err) {
      console.error('Erro ao formatar timestamp:', err);
      return '--:--';
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  console.log('Renderizando ChatPage com:', {
    loading,
    error,
    messagesCount: messages.length,
    senderId,
    receiverId,
    renderError
  });

  // Fallback de emergência se houver erro de renderização
  if (renderError) {
    return (
      <div className="romantic-theme min-h-screen flex flex-col">
        <header className="romantic-header py-4 px-4 flex-shrink-0">
          <div className="max-w-2xl mx-auto flex items-center">
            <button
              onClick={() => onNavigate('/')}
              className="romantic-button-secondary p-2 mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="romantic-title text-2xl">Chat</h1>
              <p className="romantic-body text-sm opacity-70">
                Erro de carregamento
              </p>
            </div>
            <Heart className="w-6 h-6 text-romantic-accent" />
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="romantic-body text-lg mb-4">Ops! Algo deu errado.</p>
            <button
              onClick={() => window.location.reload()}
              className="romantic-button"
            >
              Recarregar página
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Se estiver carregando, mostra um indicador
  if (loading && messages.length === 0) {
    console.log('Mostrando tela de carregamento');
    return (
      <div className="romantic-theme min-h-screen flex flex-col">
        <header className="romantic-header py-4 px-4 flex-shrink-0">
          <div className="max-w-2xl mx-auto flex items-center">
            <button
              onClick={() => onNavigate('/')}
              className="romantic-button-secondary p-2 mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="romantic-title text-2xl">Chat</h1>
              <p className="romantic-body text-sm opacity-70">
                Carregando conversa... ❤️
              </p>
            </div>
            <Heart className="w-6 h-6 text-romantic-accent" />
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-romantic-accent mx-auto mb-4"></div>
            <p className="romantic-body">Carregando mensagens...</p>
          </div>
        </main>
      </div>
    );
  }

  console.log('Renderizando chat principal');
  return (
    <div className="romantic-theme min-h-screen flex flex-col">
      {/* Cabeçalho */}
      <header className="romantic-header py-4 px-4 flex-shrink-0">
        <div className="max-w-2xl mx-auto flex items-center">
          <button
            onClick={() => onNavigate('/')}
            className="romantic-button-secondary p-2 mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="romantic-title text-2xl">Chat</h1>
            <p className="romantic-body text-sm opacity-70">
              Conversinha do casal ❤️
            </p>
            {error && (
              <p className="romantic-body text-xs text-red-500 mt-1">
                {error}
              </p>
            )}
          </div>
          <Heart className="w-6 h-6 text-romantic-accent" />
        </div>
      </header>

      {/* Área de Mensagens */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-6">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 text-romantic-accent mx-auto mb-4" />
              <p className="romantic-body text-lg">Nenhuma mensagem ainda</p>
              <p className="romantic-body text-sm opacity-70">Seja o primeiro a enviar uma mensagem! ❤️</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={message.id || index}
                className={`flex ${message.sender_id === senderId ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-xs lg:max-w-md">
                  <div
                    className={`romantic-message-bubble ${
                      message.sender_id === senderId
                        ? 'romantic-message-sent'
                        : 'romantic-message-received'
                    }`}
                  >
                    <p className="romantic-body text-sm leading-relaxed">{message.content}</p>
                  </div>
                  <p
                    className={`text-xs opacity-60 mt-1 ${
                      message.sender_id === senderId ? 'text-right' : 'text-left'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input de Mensagem */}
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Digite sua mensagem..."
              className="romantic-input w-full resize-none"
              rows="2"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="romantic-button p-3 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
