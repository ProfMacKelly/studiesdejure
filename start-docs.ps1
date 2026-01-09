Write-Host "`n[⚡] Starting MkDocs server with system-wide venv..."
& "$env:USERPROFILE\venv\Scripts\Activate.ps1"

mkdocs serve
