import React, { useState } from 'react';

const UserIdFix = () => {
  const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
  const [result, setResult] = useState('');

  const handleSetUserId = () => {
    if (!userId.trim()) {
      setResult('❌ Digite um User ID válido!');
      return;
    }

    localStorage.setItem('user_id', userId);
    setResult(`✅ User ID definido como: ${userId}`);
    
    // Recarregar a página para aplicar as mudanças
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleAutoDetect = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setResult('❌ Nenhum token encontrado!');
        return;
      }

      setResult('🔄 Detectando User ID...');

      // Tentar buscar informações do usuário atual
      const response = await fetch('https://lovelove-back-1.onrender.com/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.id) {
          localStorage.setItem('user_id', data.id);
          setResult(`✅ User ID detectado: ${data.id}`);
          setTimeout(() => window.location.reload(), 1000);
        } else {
          setResult('❌ User ID não encontrado na resposta');
        }
      } else {
        setResult(`❌ Erro ao detectar: ${response.status}`);
      }
    } catch (error) {
      setResult(`❌ Erro: ${error.message}`);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '60px',
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
        <strong>🆔 User ID Fix</strong>
      </div>
      
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Digite o User ID"
        style={{
          width: '100%',
          padding: '4px',
          marginBottom: '8px',
          fontSize: '10px',
          background: '#333',
          color: 'white',
          border: '1px solid #555',
          borderRadius: '4px'
        }}
      />

      <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
        <button
          onClick={handleSetUserId}
          style={{
            padding: '4px 8px',
            fontSize: '10px',
            background: '#495057',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Definir
        </button>
        
        <button
          onClick={handleAutoDetect}
          style={{
            padding: '4px 8px',
            fontSize: '10px',
            background: '#51cf66',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Auto
        </button>
      </div>

      {result && (
        <div style={{
          fontSize: '10px',
          padding: '4px',
          background: '#333',
          borderRadius: '4px',
          wordBreak: 'break-word'
        }}>
          {result}
        </div>
      )}
    </div>
  );
};

export default UserIdFix;
