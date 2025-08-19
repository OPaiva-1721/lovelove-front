import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import FeedPage from './components/FeedPage';
import ChatPage from './components/ChatPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DebugMenu from './components/DebugMenu';

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  // Debug: Log da rota atual
  console.log('Rota atual:', location.pathname);

  const handleNavigate = (path) => {
    console.log('Navegando para:', path);
    navigate(path);
  };

  return (
    <div className="App">
      <DebugMenu />
      <Routes>
        {/* Página Inicial (HomePage) */}
        <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />

        {/* Página de Feed */}
        <Route path="/feed" element={<FeedPage onNavigate={handleNavigate} />} />

        {/* Página de Chat */}
        <Route path="/chat" element={<ChatPage onNavigate={handleNavigate} />} />

        {/* Página de Login */}
        <Route path="/login" element={<LoginPage onNavigate={handleNavigate} />} />

        {/* Página de Registro */}
        <Route path="/register" element={<RegisterPage onNavigate={handleNavigate} />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
