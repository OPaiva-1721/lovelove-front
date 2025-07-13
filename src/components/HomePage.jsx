import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Users } from 'lucide-react';
import casal1 from '../assets/images/casal_1.jpg';
import casal2 from '../assets/images/casal_2.jpg';
import casal3 from '../assets/images/casal_3.jpg';

const HomePage = ({ onNavigate }) => {
  const [relationshipData, setRelationshipData] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Busca dados do relacionamento
    fetch('http://localhost:5000/api/relationship')
      .then(res => res.json())
      .then(data => setRelationshipData(data))
      .catch(err => console.error('Erro ao buscar dados do relacionamento:', err));

    // Busca fotos em destaque
    fetch('http://localhost:5000/api/photos/featured')
      .then(res => res.json())
      .then(data => setPhotos(data))
      .catch(err => console.error('Erro ao buscar fotos:', err));
  }, []);

  const formatDays = (days) => {
    if (days === 1) return '1 dia';
    return `${days} dias`;
  };

  return (
    <div className="romantic-theme min-h-screen">
      {/* Header */}
      <header className="romantic-header py-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="romantic-title text-4xl md:text-5xl mb-2">
            lovelove
          </h1>
          <p className="romantic-subtitle text-lg opacity-80">
            Nossa história de amor ❤️
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Galeria de Fotos */}
        <section className="mb-12 fade-in-up">
          <h2 className="romantic-subtitle text-2xl mb-6 text-center">
            Nossos Momentos Especiais
          </h2>
          <div className="romantic-photo-grid">
            <img 
              src={casal1} 
              alt="Momento especial 1" 
              className="romantic-photo romantic-card"
            />
            <img 
              src={casal2} 
              alt="Momento especial 2" 
              className="romantic-photo romantic-card"
            />
            <img 
              src={casal3} 
              alt="Momento especial 3" 
              className="romantic-photo romantic-card"
            />
          </div>
        </section>

        {/* Contador de Relacionamento */}
        <section className="mb-12 fade-in-up">
          <div className="romantic-counter max-w-md mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 mr-3 romantic-heart" />
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">
              {relationshipData ? formatDays(relationshipData.days_together) : 'Carregando...'}
            </h3>
            <p className="text-lg opacity-90">
              juntos e apaixonados
            </p>
            <p className="text-sm mt-3 opacity-80">
              Desde 18 de maio de 2024
            </p>
            {relationshipData?.relationship?.anniversary_message && (
              <p className="text-sm mt-4 italic opacity-90">
                "{relationshipData.relationship.anniversary_message}"
              </p>
            )}
          </div>
        </section>

        {/* Navegação */}
        <section className="fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md mx-auto">
            <button 
              onClick={() => onNavigate('feed')}
              className="romantic-button flex items-center justify-center py-4 text-lg"
            >
              <Users className="w-6 h-6 mr-2" />
              Feed
            </button>
            <button 
              onClick={() => onNavigate('chat')}
              className="romantic-button flex items-center justify-center py-4 text-lg"
            >
              <Heart className="w-6 h-6 mr-2" />
              Chat
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;

