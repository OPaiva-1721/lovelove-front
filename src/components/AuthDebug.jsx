import React, { useState, useEffect } from 'react';

const AuthDebug = () => {
  const [authInfo, setAuthInfo] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user_id');
      
      setAuthInfo({
        token: token ? `${token.substring(0, 20)}...` : 'Não encontrado',
        userId: userId || 'Não encontrado',
        isLoggedIn: !!token,
        tokenLength: token ? token.length : 0
      });
    };

    checkAuth();
    // Verificar a cada 2 segundos
    const interval = setInterval(checkAuth, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    window.location.reload();
  };

  const handleTestAPI = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Nenhum token encontrado!');
        return;
      }

      const response = await fetch('https://lovelove-back-1.onrender.com/api/posts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('✅ API funcionando! Token válido.');
      } else {
        alert(`❌ Erro na API: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      alert(`❌ Erro de conexão: ${error.message}`);
    }
  };

  if (!authInfo) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
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
        <strong>🔐 Auth Debug</strong>
      </div>
      
      <div style={{ marginBottom: '4px' }}>
        <span>Status: </span>
        <span style={{ 
          color: authInfo.isLoggedIn ? '#51cf66' : '#ff6b6b',
          fontWeight: 'bold'
        }}>
          {authInfo.isLoggedIn ? 'LOGADO' : 'NÃO LOGADO'}
        </span>
      </div>

      <div style={{ marginBottom: '4px' }}>
        <span>User ID: </span>
        <span style={{ color: '#ffd43b' }}>
          {authInfo.userId}
        </span>
      </div>

      <div style={{ marginBottom: '8px' }}>
        <span>Token: </span>
        <span style={{ color: '#74c0fc' }}>
          {authInfo.token}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '4px' }}>
        <button
          onClick={handleTestAPI}
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
          Testar API
        </button>
        
        <button
          onClick={handleLogout}
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
          Logout
        </button>
      </div>
    </div>
  );
};

export default AuthDebug;
