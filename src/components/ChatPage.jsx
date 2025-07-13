import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Heart } from 'lucide-react';

const ChatPage = ({ onNavigate }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sender, setSender] = useState('ela'); // 'ele' ou 'ela'
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = () => {
    fetch('http://localhost:5000/api/messages')
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error('Erro ao buscar mensagens:', err));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    fetch('http://localhost:5000/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: newMessage,
        sender: sender
      }),
    })
      .then(res => res.json())
      .then(() => {
        setNewMessage('');
        fetchMessages();
      })
      .catch(err => console.error('Erro ao enviar mensagem:', err));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="romantic-theme min-h-screen flex flex-col">
      {/* Header */}
      <header className="romantic-header py-4 px-4 flex-shrink-0">
        <div className="max-w-2xl mx-auto flex items-center">
          <button 
            onClick={() => onNavigate('home')}
            className="romantic-button-secondary p-2 mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="romantic-title text-2xl">Chat</h1>
            <p className="romantic-body text-sm opacity-70">
              Conversinha do casal ❤️
            </p>
          </div>
          <Heart className="w-6 h-6 text-romantic-accent" />
        </div>
      </header>

      {/* Área de Mensagens */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-6">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'ela' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="max-w-xs lg:max-w-md">
                <div 
                  className={`romantic-message-bubble ${
                    message.sender === 'ela' 
                      ? 'romantic-message-sent' 
                      : 'romantic-message-received'
                  }`}
                >
                  <p className="romantic-body text-sm leading-relaxed">
                    {message.content}
                  </p>
                </div>
                <p className={`text-xs opacity-60 mt-1 ${
                  message.sender === 'ela' ? 'text-right' : 'text-left'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Seletor de Remetente */}
        <div className="mb-4">
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setSender('ela')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                sender === 'ela' 
                  ? 'romantic-button' 
                  : 'romantic-button-secondary'
              }`}
            >
              Ela 💕
            </button>
            <button
              onClick={() => setSender('ele')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                sender === 'ele' 
                  ? 'romantic-button' 
                  : 'romantic-button-secondary'
              }`}
            >
              Ele 💙
            </button>
          </div>
        </div>

        {/* Input de Mensagem */}
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
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

      {/* Estado vazio */}
      {messages.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Heart className="w-16 h-16 mx-auto mb-4 text-romantic-accent opacity-50" />
            <p className="romantic-subtitle text-lg mb-2">Nenhuma mensagem ainda</p>
            <p className="romantic-body opacity-70">
              Que tal começar uma conversa? 💕
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;

