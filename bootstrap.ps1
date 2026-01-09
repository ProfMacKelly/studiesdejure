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

# 🔌 Git hook install
$hookSrc = ".githooks\pre-commit"
$hookDest = ".git\hooks\pre-commit"
if (Test-Path $hookSrc) {
  Copy-Item $hookSrc $hookDest -Force
  if ($IsLinux -or $IsMacOS) {
    git update-index --chmod=+x $hookDest
  } else {
    Write-Host "⚠️ Skipping chmod on Windows (not needed)" -ForegroundColor Yellow
  }
  Write-Host "✅ Git pre-commit hook installed." -ForegroundColor Green
} else {
  Write-Host "❌ Hook not found at $hookSrc" -ForegroundColor Red
}

# 🧾 Check for .gitignore
if (-not (Select-String -Path ".gitignore" -Pattern "^\.vscode/settings\.json")) {
  Write-Host "⚠️ Warning: .vscode/settings.json not excluded in .gitignore" -ForegroundColor Yellow
}

# 🔄 Done
Write-Host "✅ Bootstrap complete." -ForegroundColor Cyan
