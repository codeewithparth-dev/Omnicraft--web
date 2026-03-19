# PowerShell script to run ngrok with project config
Write-Host "Starting ngrok in Asia Pacific region..." -ForegroundColor Cyan
ngrok http 5173 --region ap --host-header "localhost:5173" --request-header-add "ngrok-skip-browser-warning: true"
