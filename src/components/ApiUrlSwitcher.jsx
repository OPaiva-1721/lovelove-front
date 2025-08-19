import React, { useState, useEffect } from 'react';
import { switchApiUrl, resetApiUrl, getCurrentApiUrlInfo } from '../config/api';

const ApiUrlSwitcher = () => {
  const [apiInfo, setApiInfo] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setApiInfo(getCurrentApiUrlInfo());
  }, []);

  const handleSwitch = (urlKey) => {
    switchApiUrl(urlKey);
  };

  const handleReset = () => {
    resetApiUrl();
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  if (!apiInfo) return null;

  return (
    <>
      {/* Botão para mostrar/esconder */}
      <button
        onClick={toggleVisibility}
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          fontSize: '16px',
          cursor: 'pointer',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        title="Mostrar/Esconder API URL Switcher"
      >
        {isVisible ? '👁️' : '🌐'}
      </button>

      {/* Painel principal */}
      {isVisible && (
        <div style={{
          position: 'fixed',
          top: '60px',
          right: '10px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '10px',
          borderRadius: '8px',
          fontSize: '12px',
          zIndex: 9999,
          fontFamily: 'monospace'
        }}>
          <div style={{ marginBottom: '8px' }}>
            <strong>🌐 API URL Switcher</strong>
          </div>
      
      <div style={{ marginBottom: '8px' }}>
        <span>Atual: </span>
        <span style={{ 
          color: apiInfo.isForced ? '#ff6b6b' : '#51cf66',
          fontWeight: 'bold'
        }}>
          {apiInfo.url}
        </span>
        {apiInfo.isForced && <span style={{ color: '#ff6b6b' }}> (forçada)</span>}
      </div>

      <div style={{ marginBottom: '8px' }}>
        {apiInfo.availableUrls.map(urlKey => (
          <button
            key={urlKey}
            onClick={() => handleSwitch(urlKey)}
            style={{
              margin: '2px',
              padding: '4px 8px',
              fontSize: '10px',
              background: apiInfo.url.includes(urlKey) ? '#51cf66' : '#495057',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {urlKey}
          </button>
        ))}
      </div>

      {apiInfo.isForced && (
        <button
          onClick={handleReset}
          style={{
            padding: '4px 8px',
            fontSize: '10px',
            background: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          🔄 Resetar
                 </button>
       )}
     </div>
       )}
     </>
   );
 };

export default ApiUrlSwitcher;
