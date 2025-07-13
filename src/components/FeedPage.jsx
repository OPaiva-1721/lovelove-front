import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, MessageCircle, Plus, Send } from 'lucide-react';

const FeedPage = ({ onNavigate }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch('http://localhost:5000/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Erro ao buscar posts:', err));
  };

  const handleLike = (postId) => {
    fetch(`http://localhost:5000/api/posts/${postId}/like`, {
      method: 'PUT',
    })
      .then(res => res.json())
      .then(() => fetchPosts())
      .catch(err => console.error('Erro ao curtir post:', err));
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: newPost,
        author: 'Casal'
      }),
    })
      .then(res => res.json())
      .then(() => {
        setNewPost('');
        setShowNewPost(false);
        fetchPosts();
      })
      .catch(err => console.error('Erro ao criar post:', err));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="romantic-theme min-h-screen">
      {/* Header */}
      <header className="romantic-header py-4 px-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center">
          <button 
            onClick={() => onNavigate('home')}
            className="romantic-button-secondary p-2 mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="romantic-title text-2xl flex-1">Feed</h1>
          <button 
            onClick={() => setShowNewPost(!showNewPost)}
            className="romantic-button p-2"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Novo Post */}
        {showNewPost && (
          <div className="romantic-post mb-6 fade-in-up">
            <h3 className="romantic-subtitle text-lg mb-4">Novo Post</h3>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="O que vocês estão fazendo? ❤️"
              className="romantic-input w-full h-24 resize-none mb-4"
            />
            <div className="flex gap-3">
              <button 
                onClick={handleCreatePost}
                className="romantic-button flex items-center"
                disabled={!newPost.trim()}
              >
                <Send className="w-4 h-4 mr-2" />
                Publicar
              </button>
              <button 
                onClick={() => setShowNewPost(false)}
                className="romantic-button-secondary"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Lista de Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.id} className="romantic-post fade-in-up">
              {/* Header do Post */}
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-romantic-accent to-romantic-pink rounded-full flex items-center justify-center mr-3">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="romantic-subtitle font-medium">{post.author}</h4>
                  <p className="text-sm opacity-70">{formatDate(post.created_date)}</p>
                </div>
              </div>

              {/* Conteúdo do Post */}
              <div className="mb-4">
                <p className="romantic-body text-base leading-relaxed">
                  {post.content}
                </p>
              </div>

              {/* Imagem do Post */}
              {post.image_filename && (
                <div className="mb-4">
                  <img 
                    src={`http://localhost:5000/static/uploads/${post.image_filename}`}
                    alt="Imagem do post"
                    className="w-full rounded-lg max-h-96 object-cover"
                  />
                </div>
              )}

              {/* Ações do Post */}
              <div className="flex items-center gap-6 pt-3 border-t border-romantic-secondary">
                <button 
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-2 text-romantic-text hover:text-red-500 transition-colors"
                >
                  <Heart className="w-5 h-5 romantic-heart" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-romantic-text hover:text-romantic-accent transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">Comentar</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 mx-auto mb-4 text-romantic-accent opacity-50" />
            <p className="romantic-subtitle text-lg mb-2">Nenhum post ainda</p>
            <p className="romantic-body opacity-70">
              Que tal criar o primeiro post do casal? ❤️
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default FeedPage;

