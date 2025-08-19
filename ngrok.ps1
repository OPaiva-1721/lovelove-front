Write-Host "🚀 Iniciando ngrok..." -ForegroundColor Green
Write-Host "💡 Certifique-se que a aplicacao esta rodando em http://localhost:5173" -ForegroundColor Yellow
Write-Host ""

$ngrokPath = "C:\Users\$env:USERNAME\AppData\Local\Microsoft\WinGet\Links\ngrok.exe"

if (-not (Test-Path $ngrokPath)) {
    $ngrokPath = "C:\Users\$env:USERNAME\AppData\Local\Microsoft\WinGet\Packages\Ngrok.Ngrok_Microsoft.Winget.Source_8wekyb3d8bbwe\ngrok.exe"
}

if (Test-Path $ngrokPath) {
    Write-Host "✅ Ngrok encontrado!" -ForegroundColor Green
    Write-Host "🌐 Iniciando tunel para porta 5173..." -ForegroundColor Cyan
    Write-Host ""
    
    & $ngrokPath http 5173
} else {
    Write-Host "❌ Ngrok nao encontrado em: $ngrokPath" -ForegroundColor Red
    Write-Host "💡 Tente instalar novamente: winget install ngrok.ngrok" -ForegroundColor Yellow
    Read-Host "Pressione Enter para sair"
}
