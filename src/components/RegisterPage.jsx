import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildApiUrl } from '../config/api';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    setError(null);

    if (!username || !email || !password) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(buildApiUrl('/api/auth/register'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        // Salvar o user_id se estiver disponível na resposta
        if (data.user_id) {
          localStorage.setItem('user_id', data.user_id);
        } else if (data.user && data.user.id) {
          localStorage.setItem('user_id', data.user.id);
        }
        navigate('/feed');
      } else {
        setError(data.error || 'Erro ao registrar');
      }
    } catch (err) {
      setError('Erro ao registrar. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="romantic-theme">
      <div className="romantic-card">
        <h2 className="romantic-title text-center">Registrar</h2>

        {error && <p className="error-message text-center">{error}</p>}

        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="romantic-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="romantic-input"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="romantic-input"
        />
        <button
          onClick={handleRegister}
          className="romantic-button"
          disabled={loading}
        >
          {loading ? 'Carregando...' : 'Registrar'}
        </button>

        <p className="text-center">
          Já tem uma conta? <a href="/login" className="romantic-link">Faça login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
