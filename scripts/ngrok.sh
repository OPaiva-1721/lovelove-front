#!/bin/bash

# Script para usar ngrok com Docker
echo "🚀 Configurando ngrok para Lovelove Frontend..."

# Verificar se o Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Por favor, inicie o Docker primeiro."
    exit 1
fi

# Verificar se o arquivo .env existe
if [ ! -f .env ]; then
    echo "⚠️  Arquivo .env não encontrado. Criando a partir do exemplo..."
    cp env.example .env
    echo "📝 Por favor, edite o arquivo .env e adicione seu token do ngrok (opcional)"
fi

# Função para mostrar URLs do ngrok
show_ngrok_urls() {
    echo ""
    echo "🌐 URLs do ngrok:"
    echo "📊 Interface web (produção): http://localhost:4040"
    echo "📊 Interface web (desenvolvimento): http://localhost:4041"
    echo ""
    echo "⏳ Aguardando URLs públicas do ngrok..."
    echo "💡 Acesse as interfaces web acima para ver as URLs públicas"
}

# Verificar argumentos
case "$1" in
    "dev")
        echo "🛠️  Iniciando ambiente de desenvolvimento com ngrok..."
        docker-compose up -d frontend-dev ngrok-dev
        show_ngrok_urls
        ;;
    "prod")
        echo "🚀 Iniciando ambiente de produção com ngrok..."
        docker-compose up -d frontend ngrok
        show_ngrok_urls
        ;;
    "both")
        echo "🔄 Iniciando ambos os ambientes com ngrok..."
        docker-compose up -d
        show_ngrok_urls
        ;;
    "stop")
        echo "🛑 Parando todos os serviços..."
        docker-compose down
        ;;
    "logs")
        echo "📊 Mostrando logs do ngrok..."
        docker-compose logs ngrok
        ;;
    "logs-dev")
        echo "📊 Mostrando logs do ngrok (desenvolvimento)..."
        docker-compose logs ngrok-dev
        ;;
    *)
        echo "❌ Uso: $0 {dev|prod|both|stop|logs|logs-dev}"
        echo ""
        echo "Comandos disponíveis:"
        echo "  dev      - Inicia desenvolvimento com ngrok"
        echo "  prod     - Inicia produção com ngrok"
        echo "  both     - Inicia ambos os ambientes com ngrok"
        echo "  stop     - Para todos os serviços"
        echo "  logs     - Mostra logs do ngrok (produção)"
        echo "  logs-dev - Mostra logs do ngrok (desenvolvimento)"
        exit 1
        ;;
esac
