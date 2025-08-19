import React, { useState, useEffect } from 'react';

const BackendStatus = () => {
  const [status, setStatus] = useState('checking');
  const [lastCheck, setLastCheck] = useState(null);

  const checkBackend = async () => {
    try {
      setStatus('checking');
      
      const response = await fetch('https://lovelove-back-1.onrender.com/health', {
        method: 'GET',
        timeout: 5000
      });

      if (response.ok) {
        setStatus('online');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Erro ao verificar backend:', error);
      setStatus('offline');
    }
    
    setLastCheck(new Date());
  };

  useEffect(() => {
    checkBackend();
    const interval = setInterval(checkBackend, 30000); // Verificar a cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'online': return '#51cf66';
      case 'offline': return '#ff6b6b';
      case 'error': return '#ffd43b';
      default: return '#495057';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'online': return 'ONLINE';
      case 'offline': return 'OFFLINE';
      case 'error': return 'ERRO';
      default: return 'VERIFICANDO...';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
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
        <strong>🖥️ Backend Status</strong>
      </div>
      
      <div style={{ marginBottom: '4px' }}>
        <span>Status: </span>
        <span style={{ 
          color: getStatusColor(),
          fontWeight: 'bold'
        }}>
          {getStatusText()}
        </span>
      </div>

      {lastCheck && (
        <div style={{ marginBottom: '8px', fontSize: '10px', opacity: 0.7 }}>
          Última verificação: {lastCheck.toLocaleTimeString()}
        </div>
      )}

      <button
        onClick={checkBackend}
        style={{
          padding: '4px 8px',
          fontSize: '10px',
          background: '#495057',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        Verificar Agora
      </button>
    </div>
  );
};

export default BackendStatus;
