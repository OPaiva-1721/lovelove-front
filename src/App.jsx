import React, { useState } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import FeedPage from './components/FeedPage';
import ChatPage from './components/ChatPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'feed':
        return <FeedPage onNavigate={handleNavigate} />;
      case 'chat':
        return <ChatPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
