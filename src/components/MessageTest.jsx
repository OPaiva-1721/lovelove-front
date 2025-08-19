import React, { useState } from 'react';

const MessageTest = () => {
  const [testMessage, setTestMessage] = useState('Teste de mensagem');
  const [result, setResult] = useState('');

  const testSendMessage = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user_id');

      if (!token) {
        setResult('❌ Nenhum token encontrado!');
        return;
      }

      if (!userId) {
        setResult('❌ Nenhum user_id encontrado!');
        return;
      }

      setResult('🔄 Enviando mensagem...');

      const messageData = {
        content: testMessage,
        subject: 'Teste de mensagem',
        sender_id: userId,
        receiver_id: 2,
      };

      console.log('Dados da mensagem:', messageData);
      console.log('URL da API:', 'https://lovelove-back-1.onrender.com/api/messages');

      const response = await fetch('https://lovelove-back-1.onrender.com/api/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);
      console.log('Headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        setResult(`❌ Erro ${response.status}: ${errorText}`);
        console.error('Erro completo:', errorText);
        return;
      }

      const data = await response.json();
      setResult(`✅ Mensagem enviada! ID: ${data.id || 'N/A'}`);
      console.log('Resposta:', data);

    } catch (error) {
      setResult(`❌ Erro: ${error.message}`);
      console.error('Erro completo:', error);
    }
  };

  const testGetMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setResult('❌ Nenhum token encontrado!');
        return;
      }

      setResult('🔄 Buscando mensagens...');

      const response = await fetch('https://lovelove-back-1.onrender.com/api/messages/2', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        setResult(`❌ Erro ${response.status}: ${errorText}`);
        return;
      }

      const data = await response.json();
      setResult(`✅ ${data.length} mensagens encontradas!`);
      console.log('Mensagens:', data);

    } catch (error) {
      setResult(`❌ Erro: ${error.message}`);
      console.error('Erro completo:', error);
    }
  };

  const testUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setResult('❌ Nenhum token encontrado!');
        return;
      }

      setResult('🔄 Buscando informações do usuário...');

      const response = await fetch('https://lovelove-back-1.onrender.com/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        setResult(`❌ Erro ${response.status}: ${errorText}`);
        return;
      }

      const data = await response.json();
      setResult(`✅ Usuário: ${data.username || data.email || 'N/A'} (ID: ${data.id})`);
      console.log('Dados do usuário:', data);

    } catch (error) {
      setResult(`❌ Erro: ${error.message}`);
      console.error('Erro completo:', error);
    }
  };

  const testBackendHealth = async () => {
    try {
      setResult('🔄 Testando saúde do backend...');

      const response = await fetch('https://lovelove-back-1.onrender.com/health', {
        method: 'GET'
      });

      if (response.ok) {
        const data = await response.text();
        setResult(`✅ Backend OK: ${data}`);
      } else {
        setResult(`❌ Backend com problema: ${response.status}`);
      }

    } catch (error) {
      setResult(`❌ Backend offline: ${error.message}`);
    }
  };

  const testPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setResult('❌ Nenhum token encontrado!');
        return;
      }

      setResult('🔄 Testando posts...');

      const response = await fetch('https://lovelove-back-1.onrender.com/api/posts', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        setResult(`❌ Erro posts ${response.status}: ${errorText}`);
        return;
      }

      const data = await response.json();
      setResult(`✅ Posts OK: ${data.length} posts encontrados`);
      console.log('Posts:', data);

    } catch (error) {
      setResult(`❌ Erro posts: ${error.message}`);
      console.error('Erro completo:', error);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
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
        <strong>💬 Message Test</strong>
      </div>
      
      <input
        type="text"
        value={testMessage}
        onChange={(e) => setTestMessage(e.target.value)}
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

      <div style={{ display: 'flex', gap: '4px', marginBottom: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={testSendMessage}
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
          Enviar
        </button>
        
        <button
          onClick={testGetMessages}
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
          Buscar
        </button>

        <button
          onClick={testUserInfo}
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
          User Info
        </button>

        <button
          onClick={testBackendHealth}
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
          Health
        </button>

        <button
          onClick={testPosts}
          style={{
            padding: '4px 8px',
            fontSize: '10px',
            background: '#ffd43b',
            color: 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Posts
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

export default MessageTest;
