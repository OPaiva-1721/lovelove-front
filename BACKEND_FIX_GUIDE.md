# 🔧 Guia Completo - Correção do Backend

## 🚨 Problemas Identificados

1. **Erro 500** - Internal Server Error nos posts
2. **Erro 404** - Endpoint `/health` não existe
3. **Erro 422** - Campo `subject` obrigatório nas mensagens

## 📋 Checklist de Correções

### 1. Adicionar Endpoint de Health Check

Adicione ao seu arquivo principal do Flask (`main.py` ou `app.py`):

```python
@app.route('/health')
def health_check():
    """Endpoint para verificar saúde do backend"""
    try:
        # Testar conexão com banco
        db.session.execute('SELECT 1')
        return jsonify({
            "status": "healthy",
            "database": "connected",
            "timestamp": datetime.utcnow().isoformat()
        }), 200
    except Exception as e:
        return jsonify({
            "status": "unhealthy",
            "error": str(e),
            "timestamp": datetime.utcnow().isoformat()
        }), 500

@app.route('/')
def root():
    """Endpoint raiz"""
    return jsonify({
        "message": "Lovelove Backend API",
        "version": "1.0.0",
        "status": "running"
    }), 200
```

### 2. Corrigir Modelo de Mensagens

No seu modelo de mensagens, certifique-se de que o campo `subject` é obrigatório:

```python
class Message(db.Model):
    __tablename__ = 'messages'
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    subject = db.Column(db.String(255), nullable=False)  # ✅ Campo obrigatório
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    sender = db.relationship('User', foreign_keys=[sender_id])
    receiver = db.relationship('User', foreign_keys=[receiver_id])
```

### 3. Corrigir Endpoint de Mensagens

```python
@app.route('/api/messages', methods=['POST'])
@jwt_required()
def create_message():
    try:
        data = request.get_json()
        
        # Validar campos obrigatórios
        required_fields = ['content', 'subject', 'sender_id', 'receiver_id']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({"error": f"Campo '{field}' é obrigatório"}), 400
        
        # Criar mensagem
        new_message = Message(
            content=data['content'],
            subject=data['subject'],
            sender_id=data['sender_id'],
            receiver_id=data['receiver_id']
        )
        
        db.session.add(new_message)
        db.session.commit()
        
        return jsonify({
            "id": new_message.id,
            "content": new_message.content,
            "subject": new_message.subject,
            "sender_id": new_message.sender_id,
            "receiver_id": new_message.receiver_id,
            "timestamp": new_message.timestamp.isoformat()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
```

### 4. Corrigir Endpoint de Posts

```python
@app.route('/api/posts', methods=['GET'])
@jwt_required()
def get_posts():
    try:
        posts = Post.query.order_by(Post.created_date.desc()).all()
        
        posts_data = []
        for post in posts:
            post_data = {
                "id": post.id,
                "content": post.content,
                "author": post.author.username if post.author else "Usuário",
                "created_date": post.created_date.isoformat(),
                "likes": len(post.likes) if hasattr(post, 'likes') else 0,
                "comments": []
            }
            
            # Adicionar comentários se existirem
            if hasattr(post, 'comments'):
                for comment in post.comments:
                    post_data["comments"].append({
                        "id": comment.id,
                        "content": comment.content,
                        "author": comment.author.username if comment.author else "Usuário",
                        "created_date": comment.created_date.isoformat()
                    })
            
            posts_data.append(post_data)
        
        return jsonify(posts_data), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
```

### 5. Verificar Requirements.txt

Certifique-se de que seu `requirements.txt` contém:

```txt
Flask==2.3.3
Flask-SQLAlchemy==3.0.5
Flask-JWT-Extended==4.5.3
psycopg2-binary==2.9.7
python-dotenv==1.0.0
Flask-CORS==4.0.0
Werkzeug==2.3.7
```

### 6. Verificar Configuração do Banco

No seu arquivo de configuração:

```python
import os
from datetime import datetime, timedelta

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///app.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-secret-key'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
```

### 7. Script de Inicialização

Crie um script `init_db.py`:

```python
from app import app, db
from models import User, Post, Message

def init_database():
    with app.app_context():
        # Criar todas as tabelas
        db.create_all()
        
        # Verificar se existem usuários
        if User.query.count() == 0:
            # Criar usuário padrão
            default_user = User(
                username='admin',
                email='admin@lovelove.com',
                password_hash='admin123'  # Em produção, usar hash real
            )
            db.session.add(default_user)
            db.session.commit()
            print("✅ Usuário padrão criado")
        
        print("✅ Banco de dados inicializado com sucesso!")

if __name__ == '__main__':
    init_database()
```

### 8. Variáveis de Ambiente

Crie um arquivo `.env` no backend:

```env
FLASK_APP=main.py
FLASK_ENV=production
DATABASE_URL=postgresql://postgres:paiva123@localhost:5432/lovelove
JWT_SECRET_KEY=seu-jwt-secret-aqui
SECRET_KEY=seu-secret-key-aqui
```

### 9. Deploy no Render

1. **Configurar Build Command:**
```bash
pip install -r requirements.txt
```

2. **Configurar Start Command:**
```bash
python main.py
```

3. **Variáveis de Ambiente no Render:**
- `DATABASE_URL`: URL do seu PostgreSQL
- `JWT_SECRET_KEY`: Chave secreta para JWT
- `SECRET_KEY`: Chave secreta do Flask

### 10. Testes de Verificação

Após fazer as correções, teste:

```bash
# Testar health check
curl https://lovelove-back-1.onrender.com/health

# Testar endpoint raiz
curl https://lovelove-back-1.onrender.com/

# Testar posts (com token)
curl -H "Authorization: Bearer SEU_TOKEN" \
     https://lovelove-back-1.onrender.com/api/posts

# Testar mensagens (com token)
curl -X POST \
     -H "Authorization: Bearer SEU_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"content":"teste","subject":"teste","sender_id":1,"receiver_id":2}' \
     https://lovelove-back-1.onrender.com/api/messages
```

## 🚀 Ordem de Execução

1. **Adicionar endpoint `/health`**
2. **Corrigir modelo de mensagens**
3. **Atualizar endpoints**
4. **Verificar requirements.txt**
5. **Configurar variáveis de ambiente**
6. **Fazer deploy no Render**
7. **Testar endpoints**

## 📞 Próximos Passos

Após implementar essas correções:

1. Faça commit das mudanças
2. Push para o repositório
3. Deploy automático no Render
4. Teste os endpoints
5. Verifique se o frontend funciona

**Precisa de ajuda com alguma parte específica?** 🎯
