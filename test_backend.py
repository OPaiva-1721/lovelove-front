#!/usr/bin/env python3
"""
Script de teste para verificar se o backend está funcionando
"""

import requests
import json
import sys
from datetime import datetime

# Configuração
BASE_URL = "https://lovelove-back-1.onrender.com"
TEST_TOKEN = "test_token"  # Substitua por um token válido

def test_health_check():
    """Testa o endpoint de health check"""
    print("🔍 Testando Health Check...")
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=10)
        if response.status_code == 200:
            print("✅ Health Check: OK")
            print(f"   Resposta: {response.json()}")
            return True
        else:
            print(f"❌ Health Check: Erro {response.status_code}")
            print(f"   Resposta: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Health Check: Erro de conexão - {e}")
        return False

def test_root_endpoint():
    """Testa o endpoint raiz"""
    print("\n🔍 Testando Endpoint Raiz...")
    try:
        response = requests.get(f"{BASE_URL}/", timeout=10)
        if response.status_code == 200:
            print("✅ Endpoint Raiz: OK")
            print(f"   Resposta: {response.json()}")
            return True
        else:
            print(f"❌ Endpoint Raiz: Erro {response.status_code}")
            print(f"   Resposta: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Endpoint Raiz: Erro de conexão - {e}")
        return False

def test_posts_endpoint():
    """Testa o endpoint de posts"""
    print("\n🔍 Testando Endpoint de Posts...")
    try:
        headers = {"Authorization": f"Bearer {TEST_TOKEN}"}
        response = requests.get(f"{BASE_URL}/api/posts", headers=headers, timeout=10)
        
        if response.status_code == 200:
            print("✅ Posts: OK")
            posts = response.json()
            print(f"   Posts encontrados: {len(posts)}")
            return True
        elif response.status_code == 401:
            print("⚠️ Posts: Token inválido (esperado)")
            return True
        else:
            print(f"❌ Posts: Erro {response.status_code}")
            print(f"   Resposta: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Posts: Erro de conexão - {e}")
        return False

def test_messages_endpoint():
    """Testa o endpoint de mensagens"""
    print("\n🔍 Testando Endpoint de Mensagens...")
    try:
        headers = {
            "Authorization": f"Bearer {TEST_TOKEN}",
            "Content-Type": "application/json"
        }
        
        data = {
            "content": "Teste de mensagem",
            "subject": "Teste",
            "sender_id": 1,
            "receiver_id": 2
        }
        
        response = requests.post(
            f"{BASE_URL}/api/messages", 
            headers=headers, 
            json=data, 
            timeout=10
        )
        
        if response.status_code == 201:
            print("✅ Mensagens: OK")
            print(f"   Mensagem criada: {response.json()}")
            return True
        elif response.status_code == 401:
            print("⚠️ Mensagens: Token inválido (esperado)")
            return True
        elif response.status_code == 422:
            print("⚠️ Mensagens: Erro de validação (esperado)")
            print(f"   Resposta: {response.text}")
            return True
        else:
            print(f"❌ Mensagens: Erro {response.status_code}")
            print(f"   Resposta: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Mensagens: Erro de conexão - {e}")
        return False

def test_auth_endpoint():
    """Testa o endpoint de autenticação"""
    print("\n🔍 Testando Endpoint de Autenticação...")
    try:
        data = {
            "email": "test@test.com",
            "password": "test123"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/auth/login", 
            json=data, 
            timeout=10
        )
        
        if response.status_code == 200:
            print("✅ Auth: OK")
            auth_data = response.json()
            if 'access_token' in auth_data:
                print("   Token gerado com sucesso")
                return auth_data['access_token']
            else:
                print("   Token não encontrado na resposta")
                return None
        elif response.status_code == 401:
            print("⚠️ Auth: Credenciais inválidas (esperado)")
            return None
        else:
            print(f"❌ Auth: Erro {response.status_code}")
            print(f"   Resposta: {response.text}")
            return None
    except Exception as e:
        print(f"❌ Auth: Erro de conexão - {e}")
        return None

def main():
    """Função principal"""
    print("🚀 Iniciando testes do backend...")
    print(f"📅 Data/Hora: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"🌐 URL: {BASE_URL}")
    print("=" * 50)
    
    # Testes básicos
    health_ok = test_health_check()
    root_ok = test_root_endpoint()
    
    # Teste de autenticação
    token = test_auth_endpoint()
    
    # Testes com autenticação
    posts_ok = test_posts_endpoint()
    messages_ok = test_messages_endpoint()
    
    # Resumo
    print("\n" + "=" * 50)
    print("📊 RESUMO DOS TESTES")
    print("=" * 50)
    
    tests = [
        ("Health Check", health_ok),
        ("Endpoint Raiz", root_ok),
        ("Autenticação", token is not None),
        ("Posts", posts_ok),
        ("Mensagens", messages_ok)
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, result in tests:
        status = "✅ PASSOU" if result else "❌ FALHOU"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\n📈 Resultado: {passed}/{total} testes passaram")
    
    if passed == total:
        print("🎉 Todos os testes passaram! Backend funcionando corretamente.")
        return 0
    elif passed >= 3:
        print("⚠️ Alguns testes falharam, mas o backend está parcialmente funcional.")
        return 1
    else:
        print("❌ Muitos testes falharam. Backend com problemas.")
        return 2

if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)
