<#
bootstrap.ps1
USAGE:
  .\bootstrap.ps1    # Installs dev tools, sets up git hooks, and checks environment
#>

Write-Host "🔧 Bootstrapping MkDocs Dev Environment..." -ForegroundColor Cyan

# 🌱 Ensure venv is active
$venv = "$env:USERPROFILE\venv\Scripts\Activate.ps1"
if (-not $env:VIRTUAL_ENV -and (Test-Path $venv)) {
  Write-Host "⚡ Activating virtual environment..." -ForegroundColor Green
  & $venv
} else {
  Write-Host "🔍 Venv already active or missing." -ForegroundColor Yellow
}

# 📦 Check for required tools
$tools = @("mkdocs", "yamllint")
foreach ($tool in $tools) {
  if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Missing: $tool. Please install it." -ForegroundColor Red
  } else {
    Write-Host "✅ Found: $tool" -ForegroundColor Green
  }
}