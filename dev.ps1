# dev.ps1 - Full Dev Bootstrap Script for Windows PowerShell

$expectedVenv = "$env:USERPROFILE\venv"
$venvActivate = "$expectedVenv\Scripts\Activate.ps1"

Write-Host "`n[🧪] Checking if you're in the correct Python virtual environment..." -ForegroundColor Cyan

# Detect current Python prefix
$pythonPath = python -c "import sys; print(sys.prefix)" 2>$null

Write-Host "🔍 Expected venv: $expectedVenv" -ForegroundColor DarkGray
Write-Host "🔍 Current Python: $pythonPath" -ForegroundColor DarkGray

# Activate venv if needed
if ($pythonPath -ne $expectedVenv) {
    Write-Host "`n⚠️  Not in the correct venv. Attempting to activate..." -ForegroundColor Yellow

    if (Test-Path $venvActivate) {
        & $venvActivate
        # Recheck Python path
        $pythonPath = python -c "import sys; print(sys.prefix)" 2>$null

        if ($pythonPath -ne $expectedVenv) {
            Write-Host "❌ Failed to activate the correct environment." -ForegroundColor Red
            Write-Host "   You may need to manually run:" -ForegroundColor DarkYellow
            Write-Host "   $venvActivate" -ForegroundColor White
            exit 1
        }

        Write-Host "✅ Virtual environment activated successfully." -ForegroundColor Green
    }
    else {
        Write-Host "❌ Activation script not found at:" -ForegroundColor Red
        Write-Host "   $venvActivate" -ForegroundColor White
        exit 1
    }
}
else {
    Write-Host "✅ Already in the correct venv." -ForegroundColor Green
}

# Optional: Lint mkdocs.yml if it exists
if (Test-Path "./mkdocs.yml") {
    if (Get-Command yamllint -ErrorAction SilentlyContinue) {
        Write-Host "`n🧹 Linting mkdocs.yml..." -ForegroundColor Cyan
        yamllint ./mkdocs.yml
    }
    else {
        Write-Host "`n⚠️  yamllint not found — skipping YAML linting." -ForegroundColor Yellow
        Write-Host "💡 Run: pip install yamllint" -ForegroundColor DarkGray
    }
}
else {
    Write-Host "`n⚠️  mkdocs.yml not found in this directory." -ForegroundColor Yellow
    exit 1
}

# Start MkDocs
Write-Host "`n🚀 Starting MkDocs server at http://127.0.0.1:8000 ..." -ForegroundColor Cyan
mkdocs serve
