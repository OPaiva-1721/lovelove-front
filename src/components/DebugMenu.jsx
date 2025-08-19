import React, { useState, useEffect } from 'react';
import { switchApiUrl, resetApiUrl, getCurrentApiUrlInfo } from '../config/api';
import BackendStatus from './BackendStatus';
import AuthDebug from './AuthDebug';
import MessageTest from './MessageTest';
import UserIdFix from './UserIdFix';
import OfflineMode from './OfflineMode';

const DebugMenu = () => {
  const [apiInfo, setApiInfo] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTool, setActiveTool] = useState(null);

  useEffect(() => {
    setApiInfo(getCurrentApiUrlInfo());
  }, []);

  const handleSwitch = (urlKey) => {
    switchApiUrl(urlKey);
    setApiInfo(getCurrentApiUrlInfo());
  };

  const handleReset = () => {
    resetApiUrl();
    setApiInfo(getCurrentApiUrlInfo());
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    if (!isVisible) {
      setActiveTool(null);
    }
  };

  const openTool = (toolName) => {
    setActiveTool(activeTool === toolName ? null : toolName);
  };

  const tools = [
    { key: 'api', name: '🌐 API URL', icon: '🌐' },
    { key: 'backend', name: '🖥️ Backend Status', icon: '🖥️' },
    { key: 'auth', name: '🔐 Auth Debug', icon: '🔐' },
    { key: 'messages', name: '💬 Message Test', icon: '💬' },
    { key: 'userid', name: '🆔 User ID Fix', icon: '🆔' },
    { key: 'offline', name: '📱 Offline Mode', icon: '📱' }
  ];

  if (!apiInfo) return null;

  return (
    <>
      {/* Botão principal do menu */}
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
          width: '50px',
          height: '50px',
          fontSize: '20px',
          cursor: 'pointer',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
        }}
        title="Menu de Debug"
      >
        {isVisible ? '🔧' : '⚙️'}
      </button>

      {/* Menu dropdown */}
      {isVisible && (
        <div style={{
          position: 'fixed',
          top: '70px',
          right: '10px',
          background: 'rgba(0, 0, 0, 0.95)',
          color: 'white',
          padding: '15px',
          borderRadius: '12px',
          fontSize: '14px',
          zIndex: 9999,
          fontFamily: 'monospace',
          minWidth: '250px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          {/* Cabeçalho */}
          <div style={{ 
            marginBottom: '15px', 
            textAlign: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.2)',
            paddingBottom: '10px'
          }}>
            <strong style={{ fontSize: '16px' }}>🔧 Debug Menu</strong>
          </div>

          {/* Lista de ferramentas */}
          <div style={{ marginBottom: '15px' }}>
            {tools.map(tool => (
              <button
                key={tool.key}
                onClick={() => openTool(tool.key)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  margin: '2px 0',
                  fontSize: '13px',
                  background: activeTool === tool.key ? '#51cf66' : 'rgba(255,255,255,0.1)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (activeTool !== tool.key) {
                    e.target.style.background = 'rgba(255,255,255,0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTool !== tool.key) {
                    e.target.style.background = 'rgba(255,255,255,0.1)';
                  }
                }}
              >
                <span style={{ fontSize: '16px' }}>{tool.icon}</span>
                {tool.name}
              </button>
            ))}
          </div>

          {/* Ferramentas ativas */}
          {activeTool === 'api' && (
            <div style={{
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: '12px',
              marginTop: '10px',
              background: 'rgba(255,255,255,0.05)'
            }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                🌐 API URL Switcher
              </div>
              
              <div style={{ marginBottom: '8px', fontSize: '12px' }}>
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

          {activeTool === 'backend' && (
            <div style={{
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: '12px',
              marginTop: '10px',
              background: 'rgba(255,255,255,0.05)'
            }}>
              <BackendStatus />
            </div>
          )}

          {activeTool === 'auth' && (
            <div style={{
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: '12px',
              marginTop: '10px',
              background: 'rgba(255,255,255,0.05)'
            }}>
              <AuthDebug />
            </div>
          )}

          {activeTool === 'messages' && (
            <div style={{
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: '12px',
              marginTop: '10px',
              background: 'rgba(255,255,255,0.05)'
            }}>
              <MessageTest />
            </div>
          )}

          {activeTool === 'userid' && (
            <div style={{
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: '12px',
              marginTop: '10px',
              background: 'rgba(255,255,255,0.05)'
            }}>
              <UserIdFix />
            </div>
          )}

          {activeTool === 'offline' && (
            <div style={{
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: '12px',
              marginTop: '10px',
              background: 'rgba(255,255,255,0.05)'
            }}>
              <OfflineMode />
            </div>
          )}

          {/* Botão para fechar */}
          <button
            onClick={toggleVisibility}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '10px',
              fontSize: '12px',
              background: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            ❌ Fechar Menu
          </button>
        </div>
      )}
    </>
  );
};

export default DebugMenu;


