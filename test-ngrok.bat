@echo off
echo 🔍 Testando conectividade do ngrok...
echo.

echo 📊 Verificando se a aplicacao esta rodando...
curl -s http://localhost:5173 > nul
if %errorlevel% equ 0 (
    echo ✅ Aplicacao local funcionando
) else (
    echo ❌ Aplicacao local nao esta rodando
    echo 💡 Execute: pnpm run start:local
    pause
    exit /b 1
)

echo.
echo 📊 Verificando API do ngrok...
curl -s http://localhost:4040/api/tunnels > nul
if %errorlevel% equ 0 (
    echo ✅ API do ngrok funcionando
) else (
    echo ❌ API do ngrok nao esta funcionando
    echo 💡 Execute: pnpm run ngrok:local
    pause
    exit /b 1
)

echo.
echo 📊 Obtendo URL do ngrok...
for /f "tokens=*" %%i in ('curl -s http://localhost:4040/api/tunnels ^| findstr "public_url"') do (
    echo %%i
)

echo.
echo 🌐 Testando URL publica...
echo 💡 Tente acessar a URL acima no navegador
echo 💡 Se nao funcionar, verifique:
echo   1. Se a aplicacao esta rodando em http://localhost:5173
echo   2. Se o ngrok esta rodando (pnpm run ngrok:local)
echo   3. Se ha algum firewall bloqueando
echo.

pause
