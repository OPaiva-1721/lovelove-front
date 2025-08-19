import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Users } from 'lucide-react';
import { buildApiUrl, getUploadUrl } from '../config/api';

const HomePage = ({ onNavigate }) => {
  const [relationshipData, setRelationshipData] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Busca dados do relacionamento
    fetch(buildApiUrl('/api/relationship'))
      .then(res => {
        if (!res.ok) {
          throw new Error(`Erro ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => setRelationshipData(data))
      .catch(err => {
        console.error('Erro ao buscar dados do relacionamento:', err);
        // Dados mock em caso de erro
        setRelationshipData({
          time_together_detailed: {
            years: 0,
            months: 8,
            days: 15,
            hours: 12,
            minutes: 30,
            seconds: 45
          }
        });
      });

    // Busca fotos em destaque
    fetch(buildApiUrl('/api/photos/featured'))
      .then(res => {
        if (!res.ok) {
          throw new Error(`Erro ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => setPhotos(data))
      .catch(err => {
        console.error('Erro ao buscar fotos:', err);
      });

    // Atualiza o tempo a cada segundo usando dados do backend
    const intervalId = setInterval(() => {
      fetch(buildApiUrl('/api/relationship'))
        .then(res => {
          if (!res.ok) {
            throw new Error(`Erro ${res.status}: ${res.statusText}`);
          }
          return res.json();
        })
        .then(data => setRelationshipData(data))
        .catch(err => {
          console.error('Erro ao atualizar dados do relacionamento:', err);
          // Não atualiza se der erro para não sobrescrever dados mock
        });
    }, 1000); // Atualiza a cada 1 segundo

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);

  // Função para formatar o tempo detalhado usando dados do backend
  const formatDetailedTime = (timeData) => {
    if (!timeData) return 'Carregando...';
    
    const { years, months, days, hours, minutes, seconds } = timeData;
    
    let result = '';
    
    if (years > 0) {
      result += `${years} ${years === 1 ? 'ano' : 'anos'}`;
    }
    
    if (months > 0) {
      if (result) result += ', ';
      result += `${months} ${months === 1 ? 'mês' : 'meses'}`;
    }
    
    if (days > 0) {
      if (result) result += ', ';
      result += `${days} ${days === 1 ? 'dia' : 'dias'}`;
    }
    
    if (hours > 0) {
      if (result) result += ', ';
      result += `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    }
    
    if (minutes > 0) {
      if (result) result += ', ';
      result += `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
    }
    
    if (seconds > 0) {
      if (result) result += ', ';
      result += `${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}`;
    }
    
    return result || '0 segundos';
  };

  return (
    <div className="romantic-theme min-h-screen">
      {/* Cabeçalho */}
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
            {photos.map((photo, index) => (
              <img
                key={index}
                src={getUploadUrl(photo.filename)}
                alt={`Momento especial ${index + 1}`}
                className="romantic-photo romantic-card"
              />
            ))}
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
              {relationshipData ? formatDetailedTime(relationshipData.time_together_detailed) : 'Carregando...'}
            </h3>

            <p className="text-lg opacity-90">juntos e apaixonados</p>
            <p className="text-sm mt-3 opacity-80">
              Desde 18/03/2024
            </p>
            {relationshipData?.relationship?.anniversary_message && (
              <p className="text-sm mt-4 italic opacity-90">
                {relationshipData.relationship.anniversary_message}
              </p>
            )}
          </div>
        </section>

        {/* Navegação */}
        <section className="fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md mx-auto">
            <button
              onClick={() => onNavigate('/feed')}
              className="romantic-button flex items-center justify-center py-4 text-lg"
            >
              <Users className="w-6 h-6 mr-2" />
              Feed
            </button>
            <button
              onClick={() => onNavigate('/chat')}
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
