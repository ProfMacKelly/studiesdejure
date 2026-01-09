# dev.ps1 - Full Dev Script with Plugin Check + MkDocs Serve

$expectedVenv = "$env:USERPROFILE\venv"
$venvActivate = "$expectedVenv\Scripts\Activate.ps1"

Write-Host "`n[🧪] Checking Python virtual environment..." -ForegroundColor Cyan
$pythonPath = python -c "import sys; print(sys.prefix)" 2>$null

Write-Host "🔍 Expected venv: $expectedVenv" -ForegroundColor DarkGray
Write-Host "🔍 Current Python: $pythonPath" -ForegroundColor DarkGray

# Auto-activate if needed
if ($pythonPath -ne $expectedVenv) {
    Write-Host "`n⚠️  Not in correct venv. Attempting to activate..." -ForegroundColor Yellow

    if (Test-Path $venvActivate) {
        & $venvActivate
        $pythonPath = python -c "import sys; print(sys.prefix)" 2>$null

        if ($pythonPath -ne $expectedVenv) {
            Write-Host "❌ Failed to activate the environment." -ForegroundColor Red
            Write-Host "   Try manually: $venvActivate" -ForegroundColor DarkYellow
            exit 1
        }

        Write-Host "✅ Venv activated." -ForegroundColor Green
    }
    else {
        Write-Host "❌ Activation script not found at:" -ForegroundColor Red
        Write-Host "   $venvActivate" -ForegroundColor White
        exit 1
    }
}
else {
    Write-Host "✅ Already in correct venv." -ForegroundColor Green
}

# Plugin registration check
$requiredPlugins = @(
    "quizdown",
    "search",
    "literate-nav",
    "mkdocs-video",
    "autolinks"
)

Write-Host "`n🔎 Validating MkDocs plugin registration..." -ForegroundColor Cyan
$registeredPlugins = python -c "import pkg_resources; print([ep.name for ep in pkg_resources.iter_entry_points('mkdocs.plugins')])"

foreach ($plugin in $requiredPlugins) {
    if ($registeredPlugins -match $plugin) {
        Write-Host "✅ Plugin '$plugin' is registered." -ForegroundColor Green
    } else {
        Write-Host "❌ Plugin '$plugin' is MISSING!" -ForegroundColor Red
        Write-Host "   ➜ To install: pip install mkdocs-$plugin"
    }
}

# YAML lint (optional)
if (Test-Path "./mkdocs.yml") {
    if (Get-Command yamllint -ErrorAction SilentlyContinue) {
        Write-Host "`n🧹 Linting mkdocs.yml..." -ForegroundColor Cyan
        yamllint ./mkdocs.yml
    }
    else {
        Write-Host "`n⚠️  yamllint not found — skipping YAML linting." -ForegroundColor Yellow
    }
}
else {
    Write-Host "`n❌ mkdocs.yml not found." -ForegroundColor Red
    exit 1
}

# Start MkDocs server
Write-Host "`n🚀 Starting MkDocs server at http://127.0.0.1:8000 ..." -ForegroundColor Cyan
mkdocs serve
