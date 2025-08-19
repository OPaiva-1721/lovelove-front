@echo off
echo 🚀 Iniciando ngrok...
echo 💡 Certifique-se que a aplicacao esta rodando em http://localhost:5173
echo.

set NGROK_PATH=C:\Users\%USERNAME%\AppData\Local\Microsoft\WinGet\Links\ngrok.exe

if not exist "%NGROK_PATH%" (
    echo ❌ Ngrok nao encontrado em: %NGROK_PATH%
    echo 💡 Tentando caminho alternativo...
    set NGROK_PATH=C:\Users\%USERNAME%\AppData\Local\Microsoft\WinGet\Packages\Ngrok.Ngrok_Microsoft.Winget.Source_8wekyb3d8bbwe\ngrok.exe
    if not exist "%NGROK_PATH%" (
        echo ❌ Ngrok nao encontrado!
        echo 💡 Tente instalar novamente: winget install ngrok.ngrok
        pause
        exit /b 1
    )
)

echo ✅ Ngrok encontrado em: %NGROK_PATH%
echo 🌐 Iniciando tunel para porta 5173...
echo.

"%NGROK_PATH%" http 5173

pause
