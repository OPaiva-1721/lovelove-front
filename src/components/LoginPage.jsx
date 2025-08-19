import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildApiUrl } from '../config/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(buildApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Resposta completa do login:', data);

      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        // Salvar o user_id se estiver disponível na resposta
        if (data.user_id) {
          localStorage.setItem('user_id', data.user_id);
        } else if (data.user && data.user.id) {
          localStorage.setItem('user_id', data.user.id);
        }
        console.log('Login realizado com sucesso:', {
          token: data.access_token ? 'Token salvo' : 'Token não encontrado',
          userId: localStorage.getItem('user_id') || 'User ID não encontrado'
        });
        navigate('/');
      } else {
        setError(data.error || 'Credenciais inválidas');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="romantic-theme">
      <div className="romantic-card">
        <h2 className="romantic-title text-center">Login</h2>

        {error && <p className="error-message text-center">{error}</p>}

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
          onClick={handleLogin}
          className="romantic-button"
          disabled={loading}
        >
          {loading ? 'Carregando...' : 'Entrar'}
        </button>

        <p className="text-center">
          Não tem uma conta? <a href="/register" className="romantic-link">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
