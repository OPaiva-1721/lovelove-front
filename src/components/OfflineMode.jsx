import React, { useState, useEffect } from 'react';

const OfflineMode = () => {
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [localMessages, setLocalMessages] = useState([]);
  const [localPosts, setLocalPosts] = useState([]);

  useEffect(() => {
    // Carregar dados salvos localmente
    const savedMessages = localStorage.getItem('offline_messages');
    const savedPosts = localStorage.getItem('offline_posts');
    
    if (savedMessages) {
      setLocalMessages(JSON.parse(savedMessages));
    }
    
    if (savedPosts) {
      setLocalPosts(JSON.parse(savedPosts));
    }
  }, []);

  const toggleOfflineMode = () => {
    const newMode = !isOfflineMode;
    setIsOfflineMode(newMode);
    localStorage.setItem('offline_mode', newMode.toString());
    
    if (newMode) {
      alert('🔄 Modo offline ativado! Os dados serão salvos localmente.');
    } else {
      alert('🌐 Modo online ativado! Tentando conectar ao backend.');
    }
  };

  const addLocalMessage = (message) => {
    const newMessage = {
      id: Date.now(),
      content: message,
      sender_id: localStorage.getItem('user_id') || '1',
      timestamp: new Date().toISOString(),
      subject: 'Mensagem offline'
    };
    
    const updatedMessages = [...localMessages, newMessage];
    setLocalMessages(updatedMessages);
    localStorage.setItem('offline_messages', JSON.stringify(updatedMessages));
  };

  const addLocalPost = (content) => {
    const newPost = {
      id: Date.now(),
      content: content,
      author: 'Você',
      created_date: new Date().toISOString(),
      likes: 0,
      comments: []
    };
    
    const updatedPosts = [newPost, ...localPosts];
    setLocalPosts(updatedPosts);
    localStorage.setItem('offline_posts', JSON.stringify(updatedPosts));
  };

  const clearLocalData = () => {
    if (confirm('Tem certeza que deseja limpar todos os dados offline?')) {
      setLocalMessages([]);
      setLocalPosts([]);
      localStorage.removeItem('offline_messages');
      localStorage.removeItem('offline_posts');
      alert('🗑️ Dados offline limpos!');
    }
  };

  const exportLocalData = () => {
    const data = {
      messages: localMessages,
      posts: localPosts,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lovelove_offline_data_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{
      position: 'fixed',
      top: '120px',
      left: '10px',
      background: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      padding: '10px',
      borderRadius: '8px',
      fontSize: '11px',
      zIndex: 9999,
      fontFamily: 'monospace',
      maxWidth: '300px'
    }}>
      <div style={{ marginBottom: '8px' }}>
        <strong>📱 Offline Mode</strong>
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <span>Status: </span>
        <span style={{ 
          color: isOfflineMode ? '#ffd43b' : '#51cf66',
          fontWeight: 'bold'
        }}>
          {isOfflineMode ? 'OFFLINE' : 'ONLINE'}
        </span>
      </div>

      <div style={{ marginBottom: '8px', fontSize: '10px' }}>
        <div>Mensagens: {localMessages.length}</div>
        <div>Posts: {localPosts.length}</div>
      </div>

      <div style={{ display: 'flex', gap: '4px', marginBottom: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={toggleOfflineMode}
          style={{
            padding: '4px 8px',
            fontSize: '10px',
            background: isOfflineMode ? '#ffd43b' : '#51cf66',
            color: isOfflineMode ? 'black' : 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isOfflineMode ? 'Online' : 'Offline'}
        </button>
        
        <button
          onClick={clearLocalData}
          style={{
            padding: '4px 8px',
            fontSize: '10px',
            background: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Limpar
        </button>

        <button
          onClick={exportLocalData}
          style={{
            padding: '4px 8px',
            fontSize: '10px',
            background: '#74c0fc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Exportar
        </button>
      </div>

      {isOfflineMode && (
        <div style={{
          fontSize: '10px',
          padding: '4px',
          background: '#333',
          borderRadius: '4px',
          marginBottom: '8px'
        }}>
          💡 Dados salvos localmente
        </div>
      )}
    </div>
  );
};

export default OfflineMode;


